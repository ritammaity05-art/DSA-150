from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Cart, CartItem, Coupon
from apps.products.models import Product
from apps.accounts.models import Address

def _get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        if not request.session.session_key:
            request.session.create()
        cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart

def cart_detail_view(request):
    cart = _get_or_create_cart(request)
    return render(request, 'cart/cart.html', {'cart': cart})

def cart_add_view(request, product_id):
    product = get_object_or_404(Product, id=product_id, is_active=True)
    cart = _get_or_create_cart(request)
    quantity = int(request.POST.get('quantity', 1))

    if product.stock_quantity < quantity:
        messages.error(request, f"Sorry, only {product.stock_quantity} units available.")
        return redirect(request.META.get('HTTP_REFERER', 'products:product_list'))

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        new_qty = cart_item.quantity + quantity
        if product.stock_quantity < new_qty:
            messages.error(request, f"Cannot add more units than stock available ({product.stock_quantity}).")
            return redirect(request.META.get('HTTP_REFERER', 'products:product_list'))
        cart_item.quantity = new_qty
    else:
        cart_item.quantity = quantity
    cart_item.save()

    messages.success(request, f"Added {quantity} x '{product.title}' to your cart.")
    return redirect('cart:cart_detail')

def cart_update_view(request, item_id):
    cart = _get_or_create_cart(request)
    cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
    quantity = int(request.POST.get('quantity', 1))

    if quantity <= 0:
        cart_item.delete()
        messages.info(request, "Item removed from cart.")
    else:
        if cart_item.product.stock_quantity < quantity:
            messages.error(request, f"Only {cart_item.product.stock_quantity} units available.")
        else:
            cart_item.quantity = quantity
            cart_item.save()
            messages.success(request, "Cart updated.")

    return redirect('cart:cart_detail')

def cart_remove_view(request, item_id):
    cart = _get_or_create_cart(request)
    cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
    cart_item.delete()
    messages.info(request, "Item removed from cart.")
    return redirect('cart:cart_detail')

def apply_coupon_view(request):
    if request.method == 'POST':
        code = request.POST.get('code', '').strip()
        cart = _get_or_create_cart(request)
        try:
            coupon = Coupon.objects.get(code__iexact=code)
            is_valid, msg = coupon.is_valid(subtotal=cart.subtotal)
            if is_valid:
                cart.coupon = coupon
                cart.save()
                messages.success(request, f"Coupon '{coupon.code}' applied!")
            else:
                messages.error(request, msg)
        except Coupon.DoesNotExist:
            messages.error(request, "Invalid coupon code.")

    return redirect('cart:cart_detail')

@login_required
def checkout_view(request):
    cart = _get_or_create_cart(request)
    if cart.items.count() == 0:
        messages.warning(request, "Your cart is empty. Please add products before checkout.")
        return redirect('products:product_list')

    addresses = Address.objects.filter(user=request.user)
    return render(request, 'cart/checkout.html', {
        'cart': cart,
        'addresses': addresses,
    })
