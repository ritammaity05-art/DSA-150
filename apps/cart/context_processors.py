from .models import Cart

def cart_context(request):
    if not request.session.session_key:
        request.session.create()
    session_key = request.session.session_key

    cart = None
    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
    else:
        cart = Cart.objects.filter(session_key=session_key).first()

    return {
        'cart_global': cart,
        'cart_total_items': cart.total_items if cart else 0,
        'cart_grand_total': cart.grand_total if cart else 0.00,
    }
