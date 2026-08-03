import uuid
import logging
from django.conf import settings
from .models import PaymentTransaction, PaymentMethod, PaymentStatus

logger = logging.getLogger(__name__)

try:
    import stripe
    stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', '')
except ImportError:
    stripe = None

try:
    import razorpay
except ImportError:
    razorpay = None


class StripePaymentService:
    @staticmethod
    def create_payment_intent(order):
        amount_in_cents = int(float(order.grand_total) * 100)
        if stripe and getattr(settings, 'STRIPE_SECRET_KEY', '') and not settings.STRIPE_SECRET_KEY.startswith('sk_test_sample'):
            try:
                intent = stripe.PaymentIntent.create(
                    amount=amount_in_cents,
                    currency='usd',
                    metadata={'order_number': order.order_number, 'order_id': order.id}
                )
                txn = PaymentTransaction.objects.create(
                    order=order,
                    payment_method=PaymentMethod.STRIPE,
                    transaction_id=intent.id,
                    amount=order.grand_total,
                    status=PaymentStatus.PENDING,
                    raw_response={'client_secret': intent.client_secret}
                )
                return {'status': 'success', 'client_secret': intent.client_secret, 'transaction_id': intent.id}
            except Exception as e:
                logger.error(f"Stripe PaymentIntent Creation Error: {str(e)}")
                return {'status': 'error', 'message': str(e)}

        # Fallback Mock Mode for local sandbox testing
        txn_id = f"stripe_mock_{uuid.uuid4().hex[:12]}"
        PaymentTransaction.objects.create(
            order=order,
            payment_method=PaymentMethod.STRIPE,
            transaction_id=txn_id,
            amount=order.grand_total,
            status=PaymentStatus.COMPLETED,
            raw_response={'mock': True, 'mode': 'test_sandbox'}
        )
        order.payment_status = 'COMPLETED'
        order.order_status = 'PROCESSING'
        order.save()
        return {'status': 'success', 'mock': True, 'transaction_id': txn_id, 'client_secret': f"{txn_id}_secret"}


class RazorpayPaymentService:
    @staticmethod
    def create_razorpay_order(order):
        amount_in_paise = int(float(order.grand_total) * 100)
        key_id = getattr(settings, 'RAZORPAY_KEY_ID', '')
        key_secret = getattr(settings, 'RAZORPAY_KEY_SECRET', '')

        if razorpay and key_id and not key_id.startswith('rzp_test_sample'):
            try:
                client = razorpay.Client(auth=(key_id, key_secret))
                razorpay_order = client.order.create({
                    'amount': amount_in_paise,
                    'currency': 'INR',
                    'receipt': order.order_number,
                    'payment_capture': 1
                })
                PaymentTransaction.objects.create(
                    order=order,
                    payment_method=PaymentMethod.RAZORPAY,
                    transaction_id=razorpay_order['id'],
                    amount=order.grand_total,
                    status=PaymentStatus.PENDING,
                    raw_response=razorpay_order
                )
                return {'status': 'success', 'razorpay_order_id': razorpay_order['id'], 'key_id': key_id}
            except Exception as e:
                logger.error(f"Razorpay Order Creation Error: {str(e)}")
                return {'status': 'error', 'message': str(e)}

        # Fallback Mock Mode for local sandbox testing
        txn_id = f"rzp_mock_{uuid.uuid4().hex[:12]}"
        PaymentTransaction.objects.create(
            order=order,
            payment_method=PaymentMethod.RAZORPAY,
            transaction_id=txn_id,
            amount=order.grand_total,
            status=PaymentStatus.COMPLETED,
            raw_response={'mock': True, 'mode': 'test_sandbox'}
        )
        order.payment_status = 'COMPLETED'
        order.order_status = 'PROCESSING'
        order.save()
        return {'status': 'success', 'mock': True, 'transaction_id': txn_id, 'razorpay_order_id': txn_id}


class CODPaymentService:
    @staticmethod
    def process_cod(order):
        txn_id = f"cod_{uuid.uuid4().hex[:12]}"
        PaymentTransaction.objects.create(
            order=order,
            payment_method=PaymentMethod.COD,
            transaction_id=txn_id,
            amount=order.grand_total,
            status=PaymentStatus.PENDING,
            raw_response={'notes': 'Cash on Delivery selected'}
        )
        order.payment_status = 'PENDING'
        order.order_status = 'PROCESSING'
        order.save()
        return {'status': 'success', 'transaction_id': txn_id}
