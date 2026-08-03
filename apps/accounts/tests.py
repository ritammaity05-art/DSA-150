from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import UserRole, Address

User = get_user_model()

class AccountModelTests(TestCase):
    def setUp(self):
        self.customer = User.objects.create_user(
            username='testcustomer',
            email='customer@example.com',
            password='Password123!',
            role=UserRole.CUSTOMER
        )

    def test_create_user_roles(self):
        self.assertEqual(self.customer.role, UserRole.CUSTOMER)
        self.assertTrue(self.customer.is_customer_user)
        self.assertFalse(self.customer.is_admin_user)

    def test_address_default_flag(self):
        addr1 = Address.objects.create(
            user=self.customer,
            recipient_name='John Doe',
            phone_number='1234567890',
            street_address='123 Main St',
            city='New York',
            state='NY',
            postal_code='10001',
            is_default=True
        )
        addr2 = Address.objects.create(
            user=self.customer,
            recipient_name='John Office',
            phone_number='1234567890',
            street_address='456 Tech Ave',
            city='New York',
            state='NY',
            postal_code='10002',
            is_default=True
        )
        addr1.refresh_from_db()
        self.assertFalse(addr1.is_default)
        self.assertTrue(addr2.is_default)


class AccountAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/v1/accounts/register/'
        self.token_url = '/api/v1/accounts/token/'

    def test_user_registration_api(self):
        payload = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'StrongPassword123!',
            'confirm_password': 'StrongPassword123!',
            'first_name': 'Jane',
            'last_name': 'Doe'
        }
        response = self.client.post(self.register_url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('verification_token', response.data)

    def test_user_jwt_login_api(self):
        User.objects.create_user(
            username='loginuser',
            email='loginuser@example.com',
            password='StrongPassword123!'
        )
        response = self.client.post(self.token_url, {
            'email': 'loginuser@example.com',
            'password': 'StrongPassword123!'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
