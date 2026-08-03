from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import OrderViewSet, ReturnRequestViewSet, DownloadInvoiceAPIView

router = DefaultRouter()
router.register('history', OrderViewSet, basename='order')
router.register('returns', ReturnRequestViewSet, basename='return_request')

urlpatterns = [
    path('<int:order_id>/invoice/', DownloadInvoiceAPIView.as_view(), name='api_download_invoice'),
    path('', include(router.urls)),
]
