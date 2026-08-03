from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import UserRole

class IsAdminRole(BasePermission):
    """Allows access only to Admin users."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin_user)


class IsSellerRole(BasePermission):
    """Allows access to Sellers and Admins."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_seller_user)


class IsCustomerRole(BasePermission):
    """Allows access to Customers."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_customer_user)


class IsOwnerOrAdmin(BasePermission):
    """Custom permission to only allow owners of an object or admins to view/edit it."""
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.is_admin_user:
            return True
        if hasattr(obj, 'user'):
            return obj.user == request.user
        if hasattr(obj, 'seller'):
            return obj.seller == request.user
        return False
