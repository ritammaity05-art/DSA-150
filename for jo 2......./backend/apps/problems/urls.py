from django.urls import path
from .views import TopicListView, ProblemListView, ProblemDetailView, DailyProblemView

urlpatterns = [
    path('topics/', TopicListView.as_view(), name='topic_list'),
    path('daily/', DailyProblemView.as_view(), name='daily_problem'),
    path('', ProblemListView.as_view(), name='problem_list'),
    path('<slug:slug>/', ProblemDetailView.as_view(), name='problem_detail'),
]
