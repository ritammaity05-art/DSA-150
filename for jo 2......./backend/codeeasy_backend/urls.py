from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/problems/', include('apps.problems.urls')),
    path('api/progress/', include('apps.progress.urls')),
]
