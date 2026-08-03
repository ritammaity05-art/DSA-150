from django.urls import path
from .views import dashboard_home_view, export_reports_view

app_name = 'analytics'

urlpatterns = [
    path('', dashboard_home_view, name='dashboard'),
    path('reports/', export_reports_view, name='reports'),
]
