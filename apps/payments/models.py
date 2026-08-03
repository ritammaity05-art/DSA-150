from django.db import models
from django.utils.translation import gettext_lazy as _

class PaymentMethod(models.TextChoices):
    COD = 'COD', _('Cash on Delivery')
    STRIPE = 'STRIPE', _('Stripe')
    RAZORPAY = 'RAZORPAY', _('Razorpay')

class PaymentStatus(models.TextChoices):
    PENDING = 'PENDING', _('Pending')
    COMPLETED = 'COMPLETED', _('Completed')
    FAILED = 'FAILED', _('Failed')
    REFUNDED = 'REFUNDED', _('Refunded')

class PaymentTransaction(models.Model):
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='transactions')
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    transaction_id = models.CharField(max_length=150, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    raw_response = models.JSONField(blank=True, null=True, help_text="Webhook or API response payload")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.payment_method} - {self.transaction_id} ({self.status})"
