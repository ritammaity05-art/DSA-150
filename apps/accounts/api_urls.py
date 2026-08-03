from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .api_views import (
    CustomTokenObtainPairView,
    RegisterAPIView,
    UserProfileAPIView,
    PasswordChangeAPIView,
    ForgotPasswordAPIView,
    ResetPasswordAPIView,
    VerifyEmailAPIView,
    AddressViewSet
)

router = DefaultRouter()
router.register('addresses', AddressViewSet, basename='address')

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='api_register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileAPIView.as_view(), name='api_profile'),
    path('change-password/', PasswordChangeAPIView.as_view(), name='api_change_password'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='api_forgot_password'),
    path('reset-password/', ResetPasswordAPIView.as_view(), name='api_reset_password'),
    path('verify-email/<str:token>/', VerifyEmailAPIView.as_view(), name='api_verify_email'),
    path('', include(router.urls)),
]
