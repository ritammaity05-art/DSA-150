from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Topic, Problem
from .serializers import TopicSerializer, ProblemListSerializer, ProblemDetailSerializer

class TopicListView(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.AllowAny]

class ProblemListView(generics.ListAPIView):
    serializer_class = ProblemListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Problem.objects.select_related('topic').all()
        
        # Search filter
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(summary__icontains=search) |
                Q(topic__name__icontains=search)
            )

        # Topic filter
        topic = self.request.query_params.get('topic', None)
        if topic and topic.lower() != 'all':
            queryset = queryset.filter(topic__slug=topic)

        # Difficulty filter
        difficulty = self.request.query_params.get('difficulty', None)
        if difficulty and difficulty.lower() != 'all':
            queryset = queryset.filter(difficulty__iexact=difficulty)

        return queryset

class ProblemDetailView(generics.RetrieveAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemDetailSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]

class DailyProblemView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        daily = Problem.objects.filter(is_daily_problem=True).first()
        if not daily:
            daily = Problem.objects.first()
        if daily:
            serializer = ProblemDetailSerializer(daily)
            return Response(serializer.data)
        return Response({'message': 'No problems available yet'}, status=404)
