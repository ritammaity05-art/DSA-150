from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    CategoryViewSet,
    SubCategoryViewSet,
    BrandViewSet,
    TagViewSet,
    ProductViewSet,
    ProductReviewViewSet,
    WishlistViewSet
)

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('subcategories', SubCategoryViewSet, basename='subcategory')
router.register('brands', BrandViewSet, basename='brand')
router.register('tags', TagViewSet, basename='tag')
router.register('items', ProductViewSet, basename='product')
router.register('reviews', ProductReviewViewSet, basename='review')
router.register('wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
]
