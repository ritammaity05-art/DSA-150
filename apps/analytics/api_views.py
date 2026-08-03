from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.db.models import Sum, Count, F
from django.contrib.auth import get_user_model

from apps.orders.models import Order, OrderStatus, PaymentStatus
from apps.products.models import Product, ProductReview
from apps.cart.models import Coupon
from apps.accounts.permissions import IsSellerRole

User = get_user_model()

class DashboardMetricsAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated, IsSellerRole]

    def get(self, request):
        user = request.user
        if user.is_admin_user:
            total_orders = Order.objects.count()
            total_revenue = Order.objects.filter(payment_status=PaymentStatus.COMPLETED).aggregate(Sum('grand_total'))['grand_total__sum'] or 0.00
            total_customers = User.objects.filter(role='customer').count()
            total_products = Product.objects.count()
            low_stock_products = Product.objects.filter(stock_quantity__lte=5).count()
            active_coupons = Coupon.objects.filter(active=True).count()
            total_reviews = ProductReview.objects.count()

            # Status breakdown
            status_breakdown = Order.objects.values('order_status').annotate(count=Count('id'))
        else:
            seller_products = Product.objects.filter(seller=user)
            total_products = seller_products.count()
            low_stock_products = seller_products.filter(stock_quantity__lte=5).count()
            seller_orders = Order.objects.filter(items__product__seller=user).distinct()
            total_orders = seller_orders.count()
            total_revenue = seller_orders.filter(payment_status=PaymentStatus.COMPLETED).aggregate(Sum('grand_total'))['grand_total__sum'] or 0.00
            total_customers = seller_orders.values('user').distinct().count()
            active_coupons = 0
            total_reviews = ProductReview.objects.filter(product__seller=user).count()
            status_breakdown = seller_orders.values('order_status').annotate(count=Count('id'))

        return Response({
            'total_revenue': float(total_revenue),
            'total_orders': total_orders,
            'total_customers': total_customers,
            'total_products': total_products,
            'low_stock_products': low_stock_products,
            'active_coupons': active_coupons,
            'total_reviews': total_reviews,
            'status_breakdown': list(status_breakdown),
        }, status=status.HTTP_200_OK)
