from django.urls import path
from .views import ToggleProgressView, DashboardView

urlpatterns = [
    path('toggle/<int:problem_id>/', ToggleProgressView.as_view(), name='toggle_progress'),
    path('dashboard/', DashboardView.as_view(), name='progress_dashboard'),
]
