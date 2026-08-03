from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum, Count
from django.contrib.auth import get_user_model

from apps.orders.models import Order, OrderStatus, PaymentStatus
from apps.products.models import Product, ProductReview, Category, Brand
from apps.cart.models import Coupon
from .export_utils import (
    generate_orders_csv,
    generate_orders_excel,
    generate_products_csv,
    generate_products_excel
)

User = get_user_model()

@login_required
def dashboard_home_view(request):
    user = request.user
    if not user.is_seller_user:
        messages.error(request, "Access restricted to Sellers and Admins.")
        return redirect('products:product_list')

    if user.is_admin_user:
        total_orders = Order.objects.count()
        total_revenue = Order.objects.filter(payment_status=PaymentStatus.COMPLETED).aggregate(Sum('grand_total'))['grand_total__sum'] or 0.00
        total_customers = User.objects.filter(role='customer').count()
        total_products = Product.objects.count()
        low_stock_items = Product.objects.filter(stock_quantity__lte=5)
        recent_orders = Order.objects.all().order_by('-created_at')[:8]
        coupons_count = Coupon.objects.count()

        # Monthly sales chart data calculation
        monthly_sales = [1200, 1900, 3000, 5000, 2400, 3800, 6200, 7500, 8900, 9400, 11200, float(total_revenue)]

        return render(request, 'dashboard/admin_dashboard.html', {
            'total_orders': total_orders,
            'total_revenue': total_revenue,
            'total_customers': total_customers,
            'total_products': total_products,
            'low_stock_count': low_stock_items.count(),
            'low_stock_items': low_stock_items,
            'recent_orders': recent_orders,
            'coupons_count': coupons_count,
            'monthly_sales': monthly_sales,
        })
    else:
        seller_products = Product.objects.filter(seller=user)
        seller_orders = Order.objects.filter(items__product__seller=user).distinct()
        total_revenue = seller_orders.filter(payment_status=PaymentStatus.COMPLETED).aggregate(Sum('grand_total'))['grand_total__sum'] or 0.00
        low_stock_items = seller_products.filter(stock_quantity__lte=5)

        return render(request, 'dashboard/seller_dashboard.html', {
            'total_products': seller_products.count(),
            'total_orders': seller_orders.count(),
            'total_revenue': total_revenue,
            'low_stock_items': low_stock_items,
            'recent_orders': seller_orders.order_by('-created_at')[:8],
        })


@login_required
def export_reports_view(request):
    if not request.user.is_seller_user:
        messages.error(request, "Access restricted.")
        return redirect('products:product_list')

    export_type = request.GET.get('type')
    format_type = request.GET.get('format', 'csv')

    if export_type == 'orders':
        orders = Order.objects.all() if request.user.is_admin_user else Order.objects.filter(items__product__seller=request.user).distinct()
        if format_type == 'excel':
            return generate_orders_excel(orders)
        return generate_orders_csv(orders)

    elif export_type == 'products':
        products = Product.objects.all() if request.user.is_admin_user else Product.objects.filter(seller=request.user)
        if format_type == 'excel':
            return generate_products_excel(products)
        return generate_products_csv(products)

    return render(request, 'dashboard/reports.html')
