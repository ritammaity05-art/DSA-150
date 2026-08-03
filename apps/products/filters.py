import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    category = django_filters.CharFilter(field_name="category__slug")
    subcategory = django_filters.CharFilter(field_name="subcategory__slug")
    brand = django_filters.CharFilter(field_name="brand__slug")
    tag = django_filters.CharFilter(field_name="tags__slug")
    is_featured = django_filters.BooleanFilter(field_name="is_featured")
    in_stock = django_filters.BooleanFilter(method='filter_in_stock')
    has_discount = django_filters.BooleanFilter(method='filter_has_discount')

    class Meta:
        model = Product
        fields = ['category', 'subcategory', 'brand', 'tag', 'is_featured', 'min_price', 'max_price']

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock_quantity__gt=0)
        return queryset

    def filter_has_discount(self, queryset, name, value):
        if value:
            return queryset.filter(discount_price__isnull=False, discount_price__lt=django_filters.rest_framework.filters.F('price'))
        return queryset
