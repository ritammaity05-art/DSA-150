from rest_framework import serializers
from .models import PaymentTransaction

class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = ('id', 'order', 'payment_method', 'transaction_id', 'amount', 'status', 'raw_response', 'created_at')
        read_only_fields = ('id', 'created_at')


class InitiatePaymentSerializer(serializers.Serializer):
    order_id = serializers.IntegerField(required=True)
    payment_method = serializers.ChoiceField(choices=['COD', 'STRIPE', 'RAZORPAY'], required=True)
