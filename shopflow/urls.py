from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    # Admin Interface
    path('admin/', admin.site.urls),

    # OpenAPI 3 Schema & Swagger UI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # REST API Endpoints
    path('api/v1/accounts/', include('apps.accounts.api_urls')),
    path('api/v1/products/', include('apps.products.api_urls')),
    path('api/v1/cart/', include('apps.cart.api_urls')),
    path('api/v1/orders/', include('apps.orders.api_urls')),
    path('api/v1/payments/', include('apps.payments.api_urls')),
    path('api/v1/analytics/', include('apps.analytics.api_urls')),

    # Web HTML Views
    path('', include('apps.products.urls')),  # Home catalog
    path('accounts/', include('apps.accounts.urls')),
    path('cart/', include('apps.cart.urls')),
    path('orders/', include('apps.orders.urls')),
    path('dashboard/', include('apps.analytics.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
