from django.urls import path
from .views import (
    product_list_view,
    product_detail_view,
    add_review_view,
    toggle_wishlist_view
)

app_name = 'products'

urlpatterns = [
    path('', product_list_view, name='product_list'),
    path('product/<slug:slug>/', product_detail_view, name='product_detail'),
    path('product/<int:product_id>/review/', add_review_view, name='add_review'),
    path('product/<int:product_id>/wishlist/', toggle_wishlist_view, name='toggle_wishlist'),
]
