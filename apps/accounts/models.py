import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class UserRole(models.TextChoices):
    ADMIN = 'admin', _('Admin')
    SELLER = 'seller', _('Seller')
    CUSTOMER = 'customer', _('Customer')

class User(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CUSTOMER,
        help_text=_('Designates the role of the user within ShopFlow Pro.')
    )
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    email_verification_token = models.CharField(max_length=100, blank=True, null=True)
    reset_password_token = models.CharField(max_length=100, blank=True, null=True)
    reset_token_created_at = models.DateTimeField(blank=True, null=True)

    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    @property
    def is_admin_user(self):
        return self.role == UserRole.ADMIN or self.is_superuser

    @property
    def is_seller_user(self):
        return self.role == UserRole.SELLER or self.is_admin_user

    @property
    def is_customer_user(self):
        return self.role == UserRole.CUSTOMER

    def save(self, *args, **kwargs):
        if self.is_superuser and self.role != UserRole.ADMIN:
            self.role = UserRole.ADMIN
        super().save(*args, **kwargs)


class Address(models.Model):
    ADDRESS_TYPES = (
        ('SHIPPING', _('Shipping Address')),
        ('BILLING', _('Billing Address')),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    title = models.CharField(max_length=50, default='Home', help_text=_('e.g., Home, Office'))
    recipient_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='United States')
    address_type = models.CharField(max_length=20, choices=ADDRESS_TYPES, default='SHIPPING')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Address')
        verbose_name_plural = _('Addresses')
        ordering = ['-is_default', '-created_at']

    def __str__(self):
        return f"{self.recipient_name} - {self.street_address}, {self.city}"

    def save(self, *args, **kwargs):
        if self.is_default:
            # Clear default flag on all other addresses for this user & type
            Address.objects.filter(user=self.user, address_type=self.address_type).update(is_default=False)
        super().save(*args, **kwargs)
