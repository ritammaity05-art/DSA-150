from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse
from django.db import transaction

from .models import Order, OrderItem, ReturnRequest, OrderStatus, PaymentStatus
from .invoice_generator import generate_order_invoice_pdf
from apps.cart.models import Cart
from apps.accounts.models import Address
from apps.payments.services import CODPaymentService, StripePaymentService, RazorpayPaymentService

@login_required
def place_order_view(request):
    if request.method == 'POST':
        address_id = request.POST.get('shipping_address_id')
        payment_method = request.POST.get('payment_method', 'COD')
        notes = request.POST.get('notes', '')

        if not address_id:
            messages.error(request, "Please select or add a shipping address.")
            return redirect('cart:checkout')

        shipping_address = get_object_or_404(Address, id=address_id, user=request.user)
        cart = Cart.objects.filter(user=request.user).first()

        if not cart or cart.items.count() == 0:
            messages.error(request, "Your cart is empty.")
            return redirect('products:product_list')

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
                    messages.error(request, f"Product '{cart_item.product.title}' is out of stock.")
                    return redirect('cart:cart_detail')

                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    product_name=cart_item.product.title,
                    product_sku=cart_item.product.sku,
                    price=cart_item.product.current_price,
                    quantity=cart_item.quantity
                )

                cart_item.product.stock_quantity -= cart_item.quantity
                cart_item.product.save()

            if cart.coupon:
                cart.coupon.times_used += 1
                cart.coupon.save()

            cart.items.all().delete()
            cart.coupon = None
            cart.save()

            if payment_method == 'STRIPE':
                StripePaymentService.create_payment_intent(order)
            elif payment_method == 'RAZORPAY':
                RazorpayPaymentService.create_razorpay_order(order)
            else:
                CODPaymentService.process_cod(order)

        messages.success(request, f"Order #{order.order_number} placed successfully!")
        return redirect('orders:order_detail', pk=order.pk)

    return redirect('cart:checkout')


@login_required
def order_list_view(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'orders/order_list.html', {'orders': orders})


@login_required
def order_detail_view(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if not request.user.is_admin_user and order.user != request.user:
        messages.error(request, "Unauthorized access.")
        return redirect('orders:order_list')
    return render(request, 'orders/order_detail.html', {'order': order})


@login_required
def order_track_view(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if not request.user.is_admin_user and order.user != request.user:
        messages.error(request, "Unauthorized access.")
        return redirect('orders:order_list')
    return render(request, 'orders/order_track.html', {'order': order})


@login_required
def download_invoice_view(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if not request.user.is_admin_user and order.user != request.user:
        messages.error(request, "Unauthorized access.")
        return redirect('orders:order_list')

    pdf_buffer = generate_order_invoice_pdf(order)
    response = HttpResponse(pdf_buffer, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Invoice_{order.order_number}.pdf"'
    return response


@login_required
def create_return_request_view(request, pk):
    order = get_object_or_404(Order, pk=pk, user=request.user)
    if request.method == 'POST':
        reason = request.POST.get('reason', '').strip()
        if reason:
            ReturnRequest.objects.create(order=order, user=request.user, reason=reason)
            messages.success(request, "Return request submitted successfully.")
        else:
            messages.error(request, "Please provide a reason for the return.")
    return redirect('orders:order_detail', pk=order.pk)
