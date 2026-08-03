from django.urls import path
from .api_views import InitiatePaymentAPIView, PaymentHistoryAPIView

urlpatterns = [
    path('initiate/', InitiatePaymentAPIView.as_view(), name='api_payment_initiate'),
    path('history/', PaymentHistoryAPIView.as_view(), name='api_payment_history'),
]
