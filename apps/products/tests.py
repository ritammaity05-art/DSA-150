from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.accounts.models import UserRole
from .models import Category, Brand, Product

User = get_user_model()

class ProductModelTests(TestCase):
    def setUp(self):
        self.seller = User.objects.create_user(
            username='seller',
            email='seller@example.com',
            password='Password123!',
            role=UserRole.SELLER
        )
        self.category = Category.objects.create(name='Electronics')
        self.brand = Brand.objects.create(name='TechCorp')
        self.product = Product.objects.create(
            seller=self.seller,
            category=self.category,
            brand=self.brand,
            title='Wireless Mouse',
            price=50.00,
            discount_price=40.00,
            sku='WM-001',
            stock_quantity=25
        )

    def test_product_price_calculations(self):
        self.assertEqual(self.product.current_price, 40.00)
        self.assertEqual(self.product.discount_percentage, 20.0)
        self.assertTrue(self.product.is_in_stock)

class ProductAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.seller = User.objects.create_user(
            username='seller_api',
            email='seller_api@example.com',
            password='Password123!',
            role=UserRole.SELLER
        )
        self.category = Category.objects.create(name='Audio')
        self.product = Product.objects.create(
            seller=self.seller,
            category=self.category,
            title='Noise Cancelling Headphones',
            price=199.99,
            sku='NCH-99',
            stock_quantity=10
        )

    def test_product_list_api(self):
        response = self.client.get('/api/v1/products/items/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data['count'], 1)

    def test_product_detail_api(self):
        response = self.client.get(f'/api/v1/products/items/{self.product.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Noise Cancelling Headphones')
