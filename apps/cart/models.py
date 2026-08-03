from django.db import models
from django.conf import settings
from django.utils import timezone
from apps.products.models import Product

class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, help_text="Percentage discount (e.g. 15 for 15%)")
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="Flat dollar discount")
    min_order_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    active = models.BooleanField(default=True)
    usage_limit = models.PositiveIntegerField(default=100)
    times_used = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.code} ({self.discount_percentage}% / ${self.discount_amount} off)"

    def is_valid(self, subtotal=0):
        now = timezone.now()
        if not self.active:
            return False, "Coupon is inactive."
        if now < self.valid_from or now > self.valid_to:
            return False, "Coupon is expired or not yet valid."
        if self.times_used >= self.usage_limit:
            return False, "Coupon usage limit reached."
        if subtotal < self.min_order_amount:
            return False, f"Minimum order subtotal of ${self.min_order_amount} required for this coupon."
        return True, "Coupon is valid."


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='carts')
    session_key = models.CharField(max_length=100, null=True, blank=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"Cart {self.id} for {self.user.username if self.user else self.session_key}"

    @property
    def subtotal(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    @property
    def discount_amount(self):
        if not self.coupon:
            return 0.00
        valid, _ = self.coupon.is_valid(self.subtotal)
        if not valid:
            return 0.00

        sub = float(self.subtotal)
        if self.coupon.discount_percentage > 0:
            return round(sub * (float(self.coupon.discount_percentage) / 100.0), 2)
        elif self.coupon.discount_amount > 0:
            return min(float(self.coupon.discount_amount), sub)
        return 0.00

    @property
    def tax_amount(self):
        sub = float(self.subtotal) - float(self.discount_amount)
        sub = max(sub, 0.0)
        tax_rate = getattr(settings, 'TAX_RATE_PERCENTAGE', 10.0)
        return round(sub * (tax_rate / 100.0), 2)

    @property
    def shipping_fee(self):
        sub = float(self.subtotal)
        if sub == 0:
            return 0.00
        threshold = getattr(settings, 'FREE_SHIPPING_THRESHOLD', 150.0)
        flat_fee = getattr(settings, 'SHIPPING_FEE_FLAT', 15.0)
        return 0.00 if sub >= threshold else flat_fee

    @property
    def grand_total(self):
        sub = float(self.subtotal)
        disc = float(self.discount_amount)
        tax = float(self.tax_amount)
        ship = float(self.shipping_fee)
        return round(max(sub - disc, 0.0) + tax + ship, 2)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'product')

    def __str__(self):
        return f"{self.quantity} x {self.product.title}"

    @property
    def total_price(self):
        return round(float(self.product.current_price) * self.quantity, 2)
