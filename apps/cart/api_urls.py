from django.urls import path
from .api_views import CartAPIView, AddToCartAPIView, UpdateCartItemAPIView, ApplyCouponAPIView

urlpatterns = [
    path('', CartAPIView.as_view(), name='api_cart_detail'),
    path('add/', AddToCartAPIView.as_view(), name='api_cart_add'),
    path('item/<int:item_id>/', UpdateCartItemAPIView.as_view(), name='api_cart_item_update'),
    path('apply-coupon/', ApplyCouponAPIView.as_view(), name='api_cart_apply_coupon'),
]
