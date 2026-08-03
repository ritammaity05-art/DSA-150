from django.contrib import admin
from .models import Order, OrderItem, ReturnRequest

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'product_sku', 'price', 'quantity', 'total_price')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'payment_method', 'payment_status', 'order_status', 'grand_total', 'created_at')
    list_filter = ('order_status', 'payment_status', 'payment_method', 'created_at')
    search_fields = ('order_number', 'user__email', 'user__username', 'tracking_number')
    inlines = [OrderItemInline]
    actions = ['mark_as_processing', 'mark_as_shipped', 'mark_as_delivered', 'mark_as_cancelled']

    def mark_as_processing(self, request, queryset):
        queryset.update(order_status='PROCESSING')
    mark_as_processing.short_description = "Mark selected orders as Processing"

    def mark_as_shipped(self, request, queryset):
        queryset.update(order_status='SHIPPED')
    mark_as_shipped.short_description = "Mark selected orders as Shipped"

    def mark_as_delivered(self, request, queryset):
        queryset.update(order_status='DELIVERED', payment_status='COMPLETED')
    mark_as_delivered.short_description = "Mark selected orders as Delivered & Completed"

    def mark_as_cancelled(self, request, queryset):
        queryset.update(order_status='CANCELLED')
    mark_as_cancelled.short_description = "Mark selected orders as Cancelled"

@admin.register(ReturnRequest)
class ReturnRequestAdmin(admin.ModelAdmin):
    list_display = ('order', 'user', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order__order_number', 'user__email', 'reason')
