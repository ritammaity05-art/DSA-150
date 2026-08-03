from django.contrib import admin
from .models import Coupon, Cart, CartItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ('total_price',)

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percentage', 'discount_amount', 'min_order_amount', 'valid_from', 'valid_to', 'active', 'times_used', 'usage_limit')
    list_filter = ('active', 'valid_from', 'valid_to')
    search_fields = ('code',)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_key', 'total_items', 'subtotal', 'grand_total', 'updated_at')
    inlines = [CartItemInline]
    search_fields = ('user__username', 'session_key')
