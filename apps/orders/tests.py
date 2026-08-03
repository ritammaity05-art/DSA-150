from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.products.models import Category, Product
from apps.accounts.models import Address
from apps.cart.models import Cart, CartItem
from .models import Order, OrderStatus

User = get_user_model()

class OrderModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='orderuser', email='orderuser@example.com', password='Password123!')
        self.address = Address.objects.create(
            user=self.user, recipient_name='Order User', phone_number='9876543210',
            street_address='12 Wall St', city='New York', state='NY', postal_code='10005'
        )

    def test_order_creation(self):
        order = Order.objects.create(
            user=self.user,
            shipping_address=self.address,
            subtotal=100.00,
            tax_amount=10.00,
            shipping_fee=15.00,
            grand_total=125.00
        )
        self.assertTrue(order.order_number.startswith('SFP-'))
        self.assertEqual(order.order_status, OrderStatus.PENDING)

class OrderAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='api_order', email='api_order@example.com', password='Password123!')
        self.client.force_authenticate(user=self.user)
        self.address = Address.objects.create(
            user=self.user, recipient_name='API User', phone_number='12345',
            street_address='100 Broadway', city='New York', state='NY', postal_code='10001'
        )
        self.category = Category.objects.create(name='Gadgets')
        self.product = Product.objects.create(
            seller=self.user,
            category=self.category,
            title='Smart Watch',
            price=200.00,
            sku='SW-01',
            stock_quantity=10
        )
        self.cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=1)

    def test_create_order_from_cart_api(self):
        response = self.client.post('/api/v1/orders/history/', {
            'shipping_address_id': self.address.id,
            'payment_method': 'COD'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('order_number', response.data)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock_quantity, 9)
