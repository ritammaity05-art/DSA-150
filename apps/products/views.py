from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Category, SubCategory, Brand, Tag, Product, ProductReview, Wishlist

def product_list_view(request):
    products = Product.objects.filter(is_active=True).select_related('category', 'brand').prefetch_related('images', 'reviews')
    categories = Category.objects.filter(is_active=True)
    brands = Brand.objects.filter(is_active=True)
    tags = Tag.objects.all()

    # Search query
    query = request.GET.get('q')
    if query:
        products = products.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(sku__icontains=query) |
            Q(brand__name__icontains=query) |
            Q(category__name__icontains=query)
        )

    # Category filter
    category_slug = request.GET.get('category')
    selected_category = None
    if category_slug:
        selected_category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=selected_category)

    # Brand filter
    brand_slug = request.GET.get('brand')
    if brand_slug:
        products = products.filter(brand__slug=brand_slug)

    # Price filter
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    if min_price:
        products = products.filter(price__gte=min_price)
    if max_price:
        products = products.filter(price__lte=max_price)

    # Sorting
    sort = request.GET.get('sort')
    if sort == 'price_low':
        products = products.order_by('price')
    elif sort == 'price_high':
        products = products.order_by('-price')
    elif sort == 'oldest':
        products = products.order_by('created_at')
    else:
        products = products.order_by('-created_at')

    # Pagination (12 products per page)
    paginator = Paginator(products, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'products/product_list.html', {
        'page_obj': page_obj,
        'categories': categories,
        'brands': brands,
        'tags': tags,
        'selected_category': selected_category,
        'query': query or '',
        'sort': sort or '',
    })


def product_detail_view(request, slug):
    product = get_object_or_404(Product, slug=slug, is_active=True)
    related_products = Product.objects.filter(category=product.category, is_active=True).exclude(id=product.id)[:4]
    user_in_wishlist = False
    if request.user.is_authenticated:
        user_in_wishlist = Wishlist.objects.filter(user=request.user, product=product).exists()

    return render(request, 'products/product_detail.html', {
        'product': product,
        'related_products': related_products,
        'user_in_wishlist': user_in_wishlist,
    })


@login_required
def add_review_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        rating = request.POST.get('rating')
        comment = request.POST.get('comment')
        if rating and comment:
            ProductReview.objects.update_or_create(
                product=product,
                user=request.user,
                defaults={'rating': int(rating), 'comment': comment}
            )
            messages.success(request, "Thank you! Your review has been saved.")
        else:
            messages.error(request, "Please fill in all review fields.")
    return redirect('products:product_detail', slug=product.slug)


@login_required
def toggle_wishlist_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
    if not created:
        wishlist_item.delete()
        messages.info(request, f"{product.title} removed from your wishlist.")
    else:
        messages.success(request, f"{product.title} added to your wishlist!")
    return redirect(request.META.get('HTTP_REFERER', 'products:product_list'))
