from rest_framework import serializers
from .models import Category, SubCategory, Brand, Tag, Product, ProductImage, ProductReview, Wishlist

class SubCategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = SubCategory
        fields = ('id', 'category', 'category_name', 'name', 'slug', 'description', 'is_active')


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'image', 'is_active', 'subcategories')


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name', 'slug', 'logo', 'website', 'is_active')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'alt_text', 'is_primary')


class ProductReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = ProductReview
        fields = ('id', 'product', 'user', 'user_name', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    primary_image = serializers.ReadOnlyField()
    current_price = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = (
            'id', 'title', 'slug', 'category', 'category_name', 'brand', 'brand_name',
            'price', 'discount_price', 'current_price', 'discount_percentage',
            'sku', 'stock_quantity', 'is_featured', 'is_active', 'primary_image',
            'average_rating', 'reviews_count', 'created_at'
        )


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    current_price = serializers.ReadOnlyField()
    discount_percentage = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = (
            'id', 'seller', 'seller_name', 'category', 'subcategory', 'brand', 'tags',
            'title', 'slug', 'description', 'price', 'discount_price', 'current_price',
            'discount_percentage', 'sku', 'stock_quantity', 'is_featured', 'is_active',
            'images', 'reviews', 'average_rating', 'reviews_count', 'created_at', 'updated_at'
        )


class WishlistSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Wishlist
        fields = ('id', 'user', 'product', 'product_id', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')
