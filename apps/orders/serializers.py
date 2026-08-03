from rest_framework import serializers
from .models import Order, OrderItem, ReturnRequest, OrderStatus, PaymentStatus
from apps.accounts.serializers import AddressSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'product_sku', 'price', 'quantity', 'total_price')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = AddressSerializer(read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 'order_number', 'user', 'user_email', 'shipping_address',
            'payment_method', 'payment_status', 'order_status',
            'subtotal', 'tax_amount', 'shipping_fee', 'discount_amount',
            'grand_total', 'tracking_number', 'notes', 'items',
            'created_at', 'updated_at'
        )


class CreateOrderSerializer(serializers.Serializer):
    shipping_address_id = serializers.IntegerField(required=True)
    payment_method = serializers.ChoiceField(choices=['COD', 'STRIPE', 'RAZORPAY'], default='COD')
    notes = serializers.CharField(required=False, allow_blank=True)


class ReturnRequestSerializer(serializers.ModelSerializer):
    order_number = serializers.CharField(source='order.order_number', read_only=True)

    class Meta:
        model = ReturnRequest
        fields = ('id', 'order', 'order_number', 'user', 'reason', 'status', 'admin_comment', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'status', 'admin_comment', 'created_at', 'updated_at')


class OrderStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_status', 'payment_status', 'tracking_number')
