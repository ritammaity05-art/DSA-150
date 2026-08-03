from django.urls import path
from .views import (
    place_order_view,
    order_list_view,
    order_detail_view,
    order_track_view,
    download_invoice_view,
    create_return_request_view
)

app_name = 'orders'

urlpatterns = [
    path('place/', place_order_view, name='place_order'),
    path('', order_list_view, name='order_list'),
    path('<int:pk>/', order_detail_view, name='order_detail'),
    path('<int:pk>/track/', order_track_view, name='order_track'),
    path('<int:pk>/pdf/', download_invoice_view, name='download_invoice'),
    path('<int:pk>/return/', create_return_request_view, name='create_return_request'),
]
