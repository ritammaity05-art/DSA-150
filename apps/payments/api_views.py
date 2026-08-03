from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import PaymentTransaction, PaymentStatus
from .serializers import PaymentTransactionSerializer, InitiatePaymentSerializer
from .services import StripePaymentService, RazorpayPaymentService, CODPaymentService
from apps.orders.models import Order

class InitiatePaymentAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = InitiatePaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order_id = serializer.validated_data['order_id']
        method = serializer.validated_data['payment_method']

        order = get_object_or_404(Order, id=order_id, user=request.user)

        if method == 'STRIPE':
            res = StripePaymentService.create_payment_intent(order)
        elif method == 'RAZORPAY':
            res = RazorpayPaymentService.create_razorpay_order(order)
        else:
            res = CODPaymentService.process_cod(order)

        return Response(res, status=status.HTTP_200_OK if res.get('status') == 'success' else status.HTTP_400_BAD_REQUEST)


class PaymentHistoryAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.is_admin_user:
            transactions = PaymentTransaction.objects.all()
        else:
            transactions = PaymentTransaction.objects.filter(order__user=request.user)

        serializer = PaymentTransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
