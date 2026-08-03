from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from rest_framework.test import APIClient
from rest_framework import status
from apps.accounts.models import UserRole, Address
from apps.products.models import Category, Product
from .models import Cart, CartItem, Coupon

User = get_user_model()

class CartModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='cartuser', email='cartuser@example.com', password='Password123!')
        self.category = Category.objects.create(name='Test Category')
        self.product = Product.objects.create(
            seller=self.user,
            category=self.category,
            title='Test Item',
            price=100.00,
            sku='TST-01',
            stock_quantity=10
        )
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(cart=self.cart, product=self.product, quantity=2)

    def test_cart_totals(self):
        self.assertEqual(self.cart.subtotal, 200.00)
        self.assertEqual(self.cart.total_items, 2)
        # Tax = 10% of 200 = 20. Shipping free over $150 = 0. Grand total = 220
        self.assertEqual(self.cart.tax_amount, 20.00)
        self.assertEqual(self.cart.shipping_fee, 0.00)
        self.assertEqual(self.cart.grand_total, 220.00)

    def test_coupon_discount(self):
        now = timezone.now()
        coupon = Coupon.objects.create(
            code='SAVE10',
            discount_percentage=10.00,
            valid_from=now - timedelta(days=1),
            valid_to=now + timedelta(days=1),
            active=True
        )
        self.cart.coupon = coupon
        self.cart.save()
        self.assertEqual(self.cart.discount_amount, 20.00) # 10% of 200


class CartAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='api_cart', email='api_cart@example.com', password='Password123!')
        self.client.force_authenticate(user=self.user)
        self.category = Category.objects.create(name='Books')
        self.product = Product.objects.create(
            seller=self.user,
            category=self.category,
            title='Django Book',
            price=50.00,
            sku='BK-01',
            stock_quantity=5
        )

    def test_add_to_cart_api(self):
        response = self.client.post('/api/v1/cart/add/', {
            'product_id': self.product.id,
            'quantity': 2
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_items'], 2)
