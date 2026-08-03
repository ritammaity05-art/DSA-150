from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.products.models import Category, Product
from apps.accounts.models import Address
from apps.orders.models import Order, OrderStatus, PaymentStatus
from .models import PaymentTransaction, PaymentMethod
from .services import CODPaymentService

User = get_user_model()

class PaymentTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='payuser', email='payuser@example.com', password='Password123!')
        self.address = Address.objects.create(
            user=self.user, recipient_name='Pay User', phone_number='12345',
            street_address='1 Main St', city='City', state='State', postal_code='10001'
        )
        self.order = Order.objects.create(
            user=self.user,
            shipping_address=self.address,
            payment_method='COD',
            subtotal=100.00,
            tax_amount=10.00,
            shipping_fee=15.00,
            grand_total=125.00
        )

    def test_cod_payment_service(self):
        res = CODPaymentService.process_cod(self.order)
        self.assertEqual(res['status'], 'success')
        self.order.refresh_from_db()
        self.assertEqual(self.order.order_status, OrderStatus.PROCESSING)
        self.assertEqual(PaymentTransaction.objects.filter(order=self.order).count(), 1)
