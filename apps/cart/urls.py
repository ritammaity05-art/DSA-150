from django.urls import path
from .views import (
    cart_detail_view,
    cart_add_view,
    cart_update_view,
    cart_remove_view,
    apply_coupon_view,
    checkout_view
)

app_name = 'cart'

urlpatterns = [
    path('', cart_detail_view, name='cart_detail'),
    path('add/<int:product_id>/', cart_add_view, name='cart_add'),
    path('update/<int:item_id>/', cart_update_view, name='cart_update'),
    path('remove/<int:item_id>/', cart_remove_view, name='cart_remove'),
    path('coupon/apply/', apply_coupon_view, name='apply_coupon'),
    path('checkout/', checkout_view, name='checkout'),
]
