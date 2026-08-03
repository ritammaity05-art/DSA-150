from rest_framework import serializers
from .models import Cart, CartItem, Coupon
from apps.products.serializers import ProductListSerializer

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('id', 'code', 'discount_percentage', 'discount_amount', 'min_order_amount', 'valid_from', 'valid_to', 'active')


class ApplyCouponSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_id', 'quantity', 'total_price')


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    coupon = CouponSerializer(read_only=True)
    subtotal = serializers.ReadOnlyField()
    total_items = serializers.ReadOnlyField()
    discount_amount = serializers.ReadOnlyField()
    tax_amount = serializers.ReadOnlyField()
    shipping_fee = serializers.ReadOnlyField()
    grand_total = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = (
            'id', 'user', 'session_key', 'items', 'coupon', 'subtotal',
            'total_items', 'discount_amount', 'tax_amount', 'shipping_fee',
            'grand_total', 'updated_at'
        )
