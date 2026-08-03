from rest_framework import viewsets, status, permissions, views
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.db import transaction

from .models import Order, OrderItem, ReturnRequest, OrderStatus, PaymentStatus
from .serializers import (
    OrderSerializer,
    CreateOrderSerializer,
    ReturnRequestSerializer,
    OrderStatusUpdateSerializer
)
from .invoice_generator import generate_order_invoice_pdf
from apps.cart.models import Cart
from apps.accounts.models import Address
from apps.accounts.permissions import IsOwnerOrAdmin, IsAdminRole, IsSellerRole
from apps.payments.services import CODPaymentService, StripePaymentService, RazorpayPaymentService

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin_user:
            return Order.objects.all().select_related('shipping_address', 'user').prefetch_related('items')
        elif user.is_seller_user:
            return Order.objects.filter(items__product__seller=user).distinct().select_related('shipping_address', 'user').prefetch_related('items')
        return Order.objects.filter(user=user).select_related('shipping_address', 'user').prefetch_related('items')

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        address_id = serializer.validated_data['shipping_address_id']
        payment_method = serializer.validated_data['payment_method']
        notes = serializer.validated_data.get('notes', '')

        shipping_address = get_object_or_404(Address, id=address_id, user=request.user)
        cart = Cart.objects.filter(user=request.user).first()

        if not cart or cart.items.count() == 0:
            return Response({'error': 'Cart is empty. Cannot place order.'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                shipping_address=shipping_address,
                payment_method=payment_method,
                subtotal=cart.subtotal,
                tax_amount=cart.tax_amount,
                shipping_fee=cart.shipping_fee,
                discount_amount=cart.discount_amount,
                grand_total=cart.grand_total,
                notes=notes
            )

            for cart_item in cart.items.all():
                if cart_item.product.stock_quantity < cart_item.quantity:
                    transaction.set_rollback(True)
                    return Response({'error': f"Product '{cart_item.product.title}' has insufficient stock."}, status=status.HTTP_400_BAD_REQUEST)

                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    product_name=cart_item.product.title,
                    product_sku=cart_item.product.sku,
                    price=cart_item.product.current_price,
                    quantity=cart_item.quantity
                )

                # Deduct inventory
                cart_item.product.stock_quantity -= cart_item.quantity
                cart_item.product.save()

            # Increment coupon count if used
            if cart.coupon:
                cart.coupon.times_used += 1
                cart.coupon.save()

            # Empty Cart
            cart.items.all().delete()
            cart.coupon = None
            cart.save()

            # Initiate payment handler logic
            if payment_method == 'STRIPE':
                pay_res = StripePaymentService.create_payment_intent(order)
            elif payment_method == 'RAZORPAY':
                pay_res = RazorpayPaymentService.create_razorpay_order(order)
            else:
                pay_res = CODPaymentService.process_cod(order)

        order_data = OrderSerializer(order).data
        order_data['payment_response'] = pay_res
        return Response(order_data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        order = self.get_object()
        if order.order_status in [OrderStatus.SHIPPED, OrderStatus.DELIVERED, OrderStatus.CANCELLED]:
            return Response({'error': f'Cannot cancel order with status {order.order_status}.'}, status=status.HTTP_400_BAD_REQUEST)

        order.order_status = OrderStatus.CANCELLED
        order.save()

        # Restore inventory stock
        for item in order.items.all():
            if item.product:
                item.product.stock_quantity += item.quantity
                item.product.save()

        return Response({'message': 'Order cancelled successfully.', 'order': OrderSerializer(order).data})


class ReturnRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ReturnRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        if self.request.user.is_admin_user:
            return ReturnRequest.objects.all()
        return ReturnRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DownloadInvoiceAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        if not request.user.is_admin_user and order.user != request.user:
            return Response({'error': 'Unauthorized access.'}, status=status.HTTP_403_FORBIDDEN)

        pdf_buffer = generate_order_invoice_pdf(order)
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Invoice_{order.order_number}.pdf"'
        return response
