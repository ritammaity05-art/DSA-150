from django.urls import path
from .api_views import DashboardMetricsAPIView

urlpatterns = [
    path('metrics/', DashboardMetricsAPIView.as_view(), name='api_dashboard_metrics'),
]
