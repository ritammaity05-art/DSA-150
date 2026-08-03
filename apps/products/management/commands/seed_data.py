import os
import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.files.base import ContentFile
from django.conf import settings

from apps.accounts.models import UserRole, Address
from apps.products.models import Category, SubCategory, Brand, Tag, Product, ProductImage, ProductReview
from apps.cart.models import Coupon
from apps.orders.models import Order, OrderItem, OrderStatus, PaymentStatus

User = get_user_model()

def generate_product_svg(title, category_name, color_theme='#2563eb', secondary_color='#1d4ed8'):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color_theme}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="{secondary_color}" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{color_theme}"/>
      <stop offset="100%" stop-color="{secondary_color}"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="600" height="400" fill="url(#bgGrad)"/>
  <circle cx="500" cy="80" r="140" fill="{color_theme}" opacity="0.08"/>
  <circle cx="80" cy="320" r="160" fill="{secondary_color}" opacity="0.08"/>

  <!-- Center Product Illustration Container -->
  <g transform="translate(150, 60)" filter="url(#shadow)">
    <rect width="300" height="200" rx="24" fill="url(#cardGrad)"/>
    <path d="M 0 40 Q 150 0 300 40 L 300 200 L 0 200 Z" fill="#ffffff" opacity="0.1"/>
    
    <!-- Dynamic Icon visual based on category -->
    <circle cx="150" cy="100" r="45" fill="#ffffff" opacity="0.95"/>
    <text x="150" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="bold" fill="{color_theme}" text-anchor="middle">★</text>
  </g>

  <!-- Product Tag & Title overlay -->
  <rect x="40" y="280" width="520" height="90" rx="16" fill="#ffffff" opacity="0.95" filter="url(#shadow)"/>
  <text x="60" y="312" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="bold" fill="{color_theme}" letter-spacing="1">{category_name.upper()}</text>
  <text x="60" y="342" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0f172a">{title[:32]}</text>
</svg>"""
    return svg.encode('utf-8')


class Command(BaseCommand):
    help = 'Seeds initial users, categories, brands, rich product catalog with SVG images, coupons, and orders.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Starting Tin Tun Store database seeding...'))

        # Ensure Media Directory Exists
        media_products_dir = os.path.join(settings.MEDIA_ROOT, 'products')
        os.makedirs(media_products_dir, exist_ok=True)

        # 1. Create Superuser / Admin
        admin_user, _ = User.objects.get_or_create(
            email='admin@shopflowpro.com',
            defaults={
                'username': 'admin',
                'first_name': 'TinTun',
                'last_name': 'Admin',
                'role': UserRole.ADMIN,
                'is_staff': True,
                'is_superuser': True,
                'is_email_verified': True,
            }
        )
        admin_user.set_password('AdminPass123!')
        admin_user.save()

        # 2. Create Seller
        seller_user, _ = User.objects.get_or_create(
            email='seller@shopflowpro.com',
            defaults={
                'username': 'techseller',
                'first_name': 'Apex',
                'last_name': 'Store',
                'role': UserRole.SELLER,
                'is_email_verified': True,
            }
        )
        seller_user.set_password('SellerPass123!')
        seller_user.save()

        # 3. Create Customer
        customer_user, _ = User.objects.get_or_create(
            email='customer@shopflowpro.com',
            defaults={
                'username': 'johndoe',
                'first_name': 'John',
                'last_name': 'Doe',
                'role': UserRole.CUSTOMER,
                'is_email_verified': True,
            }
        )
        customer_user.set_password('CustomerPass123!')
        customer_user.save()

        # Customer Address
        cust_address, _ = Address.objects.get_or_create(
            user=customer_user,
            is_default=True,
            defaults={
                'title': 'Home',
                'recipient_name': 'John Doe',
                'phone_number': '+1 555 019 2831',
                'street_address': '742 Evergreen Terrace',
                'city': 'Springfield',
                'state': 'OR',
                'postal_code': '97477',
                'country': 'United States',
            }
        )

        # 4. Categories & Subcategories
        cat_electronics, _ = Category.objects.get_or_create(name='Electronics', defaults={'description': 'Smartphones, Laptops, Audio & Smart Devices'})
        cat_shoes, _ = Category.objects.get_or_create(name='Shoes & Apparel', defaults={'description': 'Nike, Adidas, Puma Sneakers & Sports Shoes'})
        cat_gaming, _ = Category.objects.get_or_create(name='Gaming & Consoles', defaults={'description': 'PS5 Consoles, Game Discs, Switch & Peripherals'})

        sub_audio, _ = SubCategory.objects.get_or_create(category=cat_electronics, name='Headphones & Audio')
        sub_laptops, _ = SubCategory.objects.get_or_create(category=cat_electronics, name='Laptops & Computers')
        sub_phones, _ = SubCategory.objects.get_or_create(category=cat_electronics, name='Smartphones & Tablets')

        sub_sneakers, _ = SubCategory.objects.get_or_create(category=cat_shoes, name='Sneakers')
        sub_running, _ = SubCategory.objects.get_or_create(category=cat_shoes, name='Running Shoes')

        sub_consoles, _ = SubCategory.objects.get_or_create(category=cat_gaming, name='Consoles & Hardware')
        sub_games, _ = SubCategory.objects.get_or_create(category=cat_gaming, name='Video Game Copies')

        # 5. Brands
        brand_apple, _ = Brand.objects.get_or_create(name='Apple')
        brand_samsung, _ = Brand.objects.get_or_create(name='Samsung')
        brand_sony, _ = Brand.objects.get_or_create(name='Sony')
        brand_nike, _ = Brand.objects.get_or_create(name='Nike')
        brand_adidas, _ = Brand.objects.get_or_create(name='Adidas')
        brand_puma, _ = Brand.objects.get_or_create(name='Puma')
        brand_logitech, _ = Brand.objects.get_or_create(name='Logitech')
        brand_nintendo, _ = Brand.objects.get_or_create(name='Nintendo')

        # 6. Tags
        tag_wireless, _ = Tag.objects.get_or_create(name='Wireless')
        tag_gaming, _ = Tag.objects.get_or_create(name='Gaming')
        tag_sale, _ = Tag.objects.get_or_create(name='Sale')
        tag_premium, _ = Tag.objects.get_or_create(name='Premium')

        # 7. Comprehensive Products List
        products_catalog = [
            # SHOES (Nike, Adidas, Puma)
            {
                'title': 'Nike Air Jordan 1 Retro High OG',
                'category': cat_shoes,
                'subcategory': sub_sneakers,
                'brand': brand_nike,
                'price': 180.00,
                'discount_price': 159.99,
                'sku': 'NIKE-AJ1-RED',
                'stock_quantity': 50,
                'is_featured': True,
                'description': 'Iconic high-top sneakers crafted with premium leather in classic Chicago red, white, and black colorway.',
                'color_theme': '#dc2626',
                'secondary_color': '#991b1b',
                'tags': [tag_premium, tag_sale]
            },
            {
                'title': 'Nike Air Max 270 React',
                'category': cat_shoes,
                'subcategory': sub_sneakers,
                'brand': brand_nike,
                'price': 150.00,
                'discount_price': 119.99,
                'sku': 'NKE-AM270-WHT',
                'stock_quantity': 80,
                'is_featured': True,
                'description': 'Lightweight Nike React technology paired with Max Air unit for ultimate springy cushioning and style.',
                'color_theme': '#2563eb',
                'secondary_color': '#1d4ed8',
                'tags': [tag_sale]
            },
            {
                'title': 'Adidas Ultraboost 1.0 Running Shoes',
                'category': cat_shoes,
                'subcategory': sub_running,
                'brand': brand_adidas,
                'price': 190.00,
                'discount_price': 149.99,
                'sku': 'ADI-UB10-BLK',
                'stock_quantity': 65,
                'is_featured': True,
                'description': 'Engineered Primeknit upper with full-length Boost midsole for maximum energy return on every stride.',
                'color_theme': '#0f172a',
                'secondary_color': '#334155',
                'tags': [tag_premium, tag_sale]
            },
            {
                'title': 'Adidas NMD_R1 V2 Sneaker',
                'category': cat_shoes,
                'subcategory': sub_sneakers,
                'brand': brand_adidas,
                'price': 150.00,
                'discount_price': 119.99,
                'sku': 'ADI-NMDR1-WHT',
                'stock_quantity': 40,
                'is_featured': False,
                'description': 'Futuristic streetwear sneakers featuring distinctive midsole plugs and breathable sock-like fit.',
                'color_theme': '#0284c7',
                'secondary_color': '#0369a1',
                'tags': [tag_sale]
            },
            {
                'title': 'Puma RS-X3 Puzzle Retro Sneakers',
                'category': cat_shoes,
                'subcategory': sub_sneakers,
                'brand': brand_puma,
                'price': 120.00,
                'discount_price': 89.99,
                'sku': 'PUM-RSX3-MULTI',
                'stock_quantity': 35,
                'is_featured': False,
                'description': 'Bold retro bulky design with multi-color mesh and suede overlays powered by Puma Running System cushioning.',
                'color_theme': '#d97706',
                'secondary_color': '#b45309',
                'tags': [tag_sale]
            },

            # GAMING (PS5, Games, Switch)
            {
                'title': 'PlayStation 5 Console (Slim Digital Edition)',
                'category': cat_gaming,
                'subcategory': sub_consoles,
                'brand': brand_sony,
                'price': 449.99,
                'discount_price': None,
                'sku': 'SONY-PS5-SLIM',
                'stock_quantity': 15,
                'is_featured': True,
                'description': 'Experience lightning-fast loading with an ultra-high-speed SSD, ray tracing, 4K 120Hz gaming, and DualSense feedback.',
                'color_theme': '#2563eb',
                'secondary_color': '#1e40af',
                'tags': [tag_gaming, tag_premium]
            },
            {
                'title': 'Marvel\'s Spider-Man 2 PS5 Game Copy Disc',
                'category': cat_gaming,
                'subcategory': sub_games,
                'brand': brand_sony,
                'price': 69.99,
                'discount_price': 59.99,
                'sku': 'PS5-GAME-SPIDERMAN2',
                'stock_quantity': 100,
                'is_featured': True,
                'description': 'Swing, jump, and utilize the new Web Wings to travel across Marvel\'s New York, switching between Peter Parker & Miles Morales.',
                'color_theme': '#ef4444',
                'secondary_color': '#b91c1c',
                'tags': [tag_gaming, tag_sale]
            },
            {
                'title': 'EA Sports FC 24 PS5 Game Copy Disc',
                'category': cat_gaming,
                'subcategory': sub_games,
                'brand': brand_sony,
                'price': 69.99,
                'discount_price': 39.99,
                'sku': 'PS5-GAME-EAFC24',
                'stock_quantity': 90,
                'is_featured': True,
                'description': 'The world\'s game featuring 19,000+ licensed players, HyperMotionV technology, and revamped Ultimate Team.',
                'color_theme': '#10b981',
                'secondary_color': '#047857',
                'tags': [tag_gaming, tag_sale]
            },
            {
                'title': 'Nintendo Switch OLED Model (White)',
                'category': cat_gaming,
                'subcategory': sub_consoles,
                'brand': brand_nintendo,
                'price': 349.99,
                'discount_price': 319.99,
                'sku': 'NIN-SWITCH-OLED',
                'stock_quantity': 25,
                'is_featured': True,
                'description': 'Vibrant 7-inch OLED screen, wide adjustable stand, wired LAN dock, and 64GB internal storage.',
                'color_theme': '#e11d48',
                'secondary_color': '#be123c',
                'tags': [tag_gaming, tag_sale]
            },
            {
                'title': 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse',
                'category': cat_gaming,
                'subcategory': sub_consoles,
                'brand': brand_logitech,
                'price': 159.99,
                'discount_price': 139.99,
                'sku': 'LOGI-GPROX-WHT',
                'stock_quantity': 30,
                'is_featured': False,
                'description': '60-gram ultra-lightweight esports gaming mouse with HERO 2 sensor, LIGHTSPEED wireless, and 95-hour battery life.',
                'color_theme': '#475569',
                'secondary_color': '#1e293b',
                'tags': [tag_wireless, tag_gaming]
            },

            # ELECTRONICS & SMARTPHONES
            {
                'title': 'Sony WH-1000XM5 Wireless Headphones',
                'category': cat_electronics,
                'subcategory': sub_audio,
                'brand': brand_sony,
                'price': 399.99,
                'discount_price': 349.99,
                'sku': 'SONY-WH1000XM5-BLK',
                'stock_quantity': 45,
                'is_featured': True,
                'description': 'Industry-leading noise canceling headphones with two processors and 8 microphones for unprecedented sound quality.',
                'color_theme': '#3b82f6',
                'secondary_color': '#1d4ed8',
                'tags': [tag_wireless, tag_premium, tag_sale]
            },
            {
                'title': 'MacBook Pro 16-inch M3 Max',
                'category': cat_electronics,
                'subcategory': sub_laptops,
                'brand': brand_apple,
                'price': 2499.00,
                'discount_price': 2399.00,
                'sku': 'APP-MBP16-M3',
                'stock_quantity': 12,
                'is_featured': True,
                'description': 'Blazing fast M3 Max chip with 36GB unified memory, Liquid Retina XDR display, and up to 22 hours battery life.',
                'color_theme': '#64748b',
                'secondary_color': '#334155',
                'tags': [tag_premium]
            },
            {
                'title': 'iPhone 15 Pro Max 256GB Titanium',
                'category': cat_electronics,
                'subcategory': sub_phones,
                'brand': brand_apple,
                'price': 1199.00,
                'discount_price': 1149.00,
                'sku': 'APP-IPH15PM-256',
                'stock_quantity': 20,
                'is_featured': True,
                'description': 'Forged in aerospace-grade titanium, A17 Pro chip, customizable Action button, and 5x Telephoto camera.',
                'color_theme': '#8b5cf6',
                'secondary_color': '#6d28d9',
                'tags': [tag_premium, tag_sale]
            },
            {
                'title': 'Samsung Galaxy S24 Ultra 512GB',
                'category': cat_electronics,
                'subcategory': sub_phones,
                'brand': brand_samsung,
                'price': 1299.00,
                'discount_price': 1199.00,
                'sku': 'SAM-S24U-512',
                'stock_quantity': 18,
                'is_featured': True,
                'description': 'Galaxy AI integration, Snapdragon 8 Gen 3 for Galaxy, built-in S Pen, and 200MP camera with ProVisual engine.',
                'color_theme': '#06b6d4',
                'secondary_color': '#0891b2',
                'tags': [tag_premium, tag_sale]
            }
        ]

        created_products = []
        for p_info in products_catalog:
            tags = p_info.pop('tags')
            color_theme = p_info.pop('color_theme', '#2563eb')
            secondary_color = p_info.pop('secondary_color', '#1d4ed8')

            p, created = Product.objects.get_or_create(
                sku=p_info['sku'],
                defaults={**p_info, 'seller': seller_user}
            )
            p.tags.set(tags)
            created_products.append(p)

            # Generate SVG Product Image
            svg_bytes = generate_product_svg(p.title, p.category.name, color_theme, secondary_color)
            filename = f"{p.sku.lower()}.svg"

            img_obj, img_created = ProductImage.objects.get_or_create(
                product=p,
                is_primary=True,
                defaults={'alt_text': p.title}
            )
            img_obj.image.save(filename, ContentFile(svg_bytes), save=True)

        # 8. Coupons
        now = timezone.now()
        Coupon.objects.get_or_create(
            code='WELCOME10',
            defaults={
                'discount_percentage': 10.00,
                'min_order_amount': 50.00,
                'valid_from': now - timedelta(days=10),
                'valid_to': now + timedelta(days=90),
                'active': True
            }
        )

        Coupon.objects.get_or_create(
            code='FLAT50',
            defaults={
                'discount_amount': 50.00,
                'min_order_amount': 200.00,
                'valid_from': now - timedelta(days=5),
                'valid_to': now + timedelta(days=60),
                'active': True
            }
        )

        # 9. Seed Sample Orders
        if created_products and not Order.objects.filter(user=customer_user).exists():
            sample_product = created_products[0]
            order = Order.objects.create(
                user=customer_user,
                shipping_address=cust_address,
                payment_method='COD',
                payment_status=PaymentStatus.COMPLETED,
                order_status=OrderStatus.DELIVERED,
                subtotal=sample_product.current_price,
                tax_amount=round(float(sample_product.current_price) * 0.1, 2),
                shipping_fee=0.00,
                discount_amount=0.00,
                grand_total=round(float(sample_product.current_price) * 1.1, 2),
                tracking_number='TRK-9876543210'
            )
            OrderItem.objects.create(
                order=order,
                product=sample_product,
                product_name=sample_product.title,
                product_sku=sample_product.sku,
                price=sample_product.current_price,
                quantity=1
            )

            # Sample Review
            ProductReview.objects.get_or_create(
                product=sample_product,
                user=customer_user,
                defaults={
                    'rating': 5,
                    'comment': 'Awesome sneakers! Super comfortable and high quality leather.'
                }
            )

        self.stdout.write(self.style.SUCCESS('Tin Tun Store database successfully seeded with Nike, Adidas, Puma, PS5 Games, Consoles, Smartphones, and generated product SVG visuals!'))
        self.stdout.write(self.style.WARNING('Default Credentials:'))
        self.stdout.write(' - Admin: admin@shopflowpro.com / AdminPass123!')
        self.stdout.write(' - Seller: seller@shopflowpro.com / SellerPass123!')
        self.stdout.write(' - Customer: customer@shopflowpro.com / CustomerPass123!')
