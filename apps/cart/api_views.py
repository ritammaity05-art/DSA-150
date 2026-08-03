from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Coupon
from .serializers import CartSerializer, CartItemSerializer, ApplyCouponSerializer
from apps.products.models import Product

def _get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        if not request.session.session_key:
            request.session.create()
        cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart

class CartAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cart = _get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToCartAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        cart = _get_or_create_cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        product = get_object_or_404(Product, id=product_id, is_active=True)
        if product.stock_quantity < quantity:
            return Response({'error': f'Only {product.stock_quantity} units available in stock.'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            new_qty = cart_item.quantity + quantity
            if product.stock_quantity < new_qty:
                return Response({'error': f'Cannot add more units than stock available ({product.stock_quantity}).'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity = new_qty
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class UpdateCartItemAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def patch(self, request, item_id):
        cart = _get_or_create_cart(request)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        quantity = request.data.get('quantity')

        if quantity is not None:
            quantity = int(quantity)
            if quantity <= 0:
                cart_item.delete()
            else:
                if cart_item.product.stock_quantity < quantity:
                    return Response({'error': f'Only {cart_item.product.stock_quantity} units available.'}, status=status.HTTP_400_BAD_REQUEST)
                cart_item.quantity = quantity
                cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        cart = _get_or_create_cart(request)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class ApplyCouponAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ApplyCouponSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['code']
        cart = _get_or_create_cart(request)

        try:
            coupon = Coupon.objects.get(code__iexact=code)
            is_valid, msg = coupon.is_valid(subtotal=cart.subtotal)
            if not is_valid:
                return Response({'error': msg}, status=status.HTTP_400_BAD_REQUEST)

            cart.coupon = coupon
            cart.save()
            return Response({
                'message': 'Coupon applied successfully!',
                'cart': CartSerializer(cart).data
            }, status=status.HTTP_200_OK)
        except Coupon.DoesNotExist:
            return Response({'error': 'Invalid coupon code.'}, status=status.HTTP_404_NOT_FOUND)
