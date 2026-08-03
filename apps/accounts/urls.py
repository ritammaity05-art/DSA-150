from django.urls import path
from .views import (
    user_login_view,
    user_register_view,
    user_logout_view,
    profile_view,
    change_password_view,
    address_create_view,
    address_delete_view
)

app_name = 'accounts'

urlpatterns = [
    path('login/', user_login_view, name='login'),
    path('register/', user_register_view, name='register'),
    path('logout/', user_logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('change-password/', change_password_view, name='change_password'),
    path('address/create/', address_create_view, name='address_create'),
    path('address/<int:pk>/delete/', address_delete_view, name='address_delete'),
]
