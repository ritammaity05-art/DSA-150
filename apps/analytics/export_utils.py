import csv
import io
import openpyxl
from django.http import HttpResponse

def generate_orders_csv(orders):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="TinTunStore_Orders_Report.csv"'

    writer = csv.writer(response)
    writer.writerow(['Order Number', 'Customer Email', 'Payment Method', 'Payment Status', 'Order Status', 'Subtotal', 'Tax', 'Shipping', 'Discount', 'Grand Total', 'Created Date'])

    for order in orders:
        writer.writerow([
            order.order_number,
            order.user.email,
            order.payment_method,
            order.payment_status,
            order.order_status,
            order.subtotal,
            order.tax_amount,
            order.shipping_fee,
            order.discount_amount,
            order.grand_total,
            order.created_at.strftime('%Y-%m-%d %H:%M:%S')
        ])

    return response


def generate_orders_excel(orders):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Orders Report"

    headers = ['Order Number', 'Customer Email', 'Payment Method', 'Payment Status', 'Order Status', 'Subtotal ($)', 'Tax ($)', 'Shipping ($)', 'Discount ($)', 'Grand Total ($)', 'Created Date']
    ws.append(headers)

    for order in orders:
        ws.append([
            order.order_number,
            order.user.email,
            order.payment_method,
            order.payment_status,
            order.order_status,
            float(order.subtotal),
            float(order.tax_amount),
            float(order.shipping_fee),
            float(order.discount_amount),
            float(order.grand_total),
            order.created_at.strftime('%Y-%m-%d %H:%M:%S')
        ])

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="ShopFlow_Orders_Report.xlsx"'
    wb.save(response)
    return response


def generate_products_csv(products):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ShopFlow_Products_Inventory.csv"'

    writer = csv.writer(response)
    writer.writerow(['SKU', 'Title', 'Category', 'Brand', 'Price', 'Discount Price', 'Stock Quantity', 'Status', 'Created Date'])

    for p in products:
        writer.writerow([
            p.sku,
            p.title,
            p.category.name if p.category else 'N/A',
            p.brand.name if p.brand else 'N/A',
            p.price,
            p.discount_price or 0.00,
            p.stock_quantity,
            'Active' if p.is_active else 'Inactive',
            p.created_at.strftime('%Y-%m-%d')
        ])

    return response


def generate_products_excel(products):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Products Inventory"

    headers = ['SKU', 'Title', 'Category', 'Brand', 'Price ($)', 'Discount Price ($)', 'Stock Quantity', 'Status', 'Created Date']
    ws.append(headers)

    for p in products:
        ws.append([
            p.sku,
            p.title,
            p.category.name if p.category else 'N/A',
            p.brand.name if p.brand else 'N/A',
            float(p.price),
            float(p.discount_price or 0.00),
            p.stock_quantity,
            'Active' if p.is_active else 'Inactive',
            p.created_at.strftime('%Y-%m-%d')
        ])

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="ShopFlow_Products_Inventory.xlsx"'
    wb.save(response)
    return response
