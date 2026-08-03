from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.problems.models import Problem, Topic
from .models import UserProblemProgress
from .serializers import UserProblemProgressSerializer

class ToggleProgressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, problem_id):
        try:
            problem = Problem.objects.get(id_number=problem_id)
        except Problem.DoesNotExist:
            return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

        progress, created = UserProblemProgress.objects.get_or_create(
            user=request.user,
            problem=problem
        )

        action = request.data.get('action') # 'completed', 'favorite', 'bookmark', 'view'
        if action == 'completed':
            progress.is_completed = not progress.is_completed
        elif action == 'favorite':
            progress.is_favorite = not progress.is_favorite
        elif action == 'bookmark':
            progress.is_bookmarked = not progress.is_bookmarked
        elif action == 'view':
            # Updates last_viewed_at automatically via auto_now=True
            pass
        
        progress.save()
        return Response(UserProblemProgressSerializer(progress).data)

class DashboardView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        total_problems = Problem.objects.count()
        easy_total = Problem.objects.filter(difficulty='Easy').count()
        medium_total = Problem.objects.filter(difficulty='Medium').count()
        hard_total = Problem.objects.filter(difficulty='Hard').count()

        if request.user.is_authenticated:
            user_progress = UserProblemProgress.objects.filter(user=request.user)
            completed_ids = list(user_progress.filter(is_completed=True).values_list('problem_id', flat=True))
            favorite_ids = list(user_progress.filter(is_favorite=True).values_list('problem_id', flat=True))
            bookmark_ids = list(user_progress.filter(is_bookmarked=True).values_list('problem_id', flat=True))
            
            recently_viewed = user_progress.order_by('-last_viewed_at')[:5]
            recent_data = UserProblemProgressSerializer(recently_viewed, many=True).data

            easy_completed = user_progress.filter(is_completed=True, problem__difficulty='Easy').count()
            medium_completed = user_progress.filter(is_completed=True, problem__difficulty='Medium').count()
            hard_completed = user_progress.filter(is_completed=True, problem__difficulty='Hard').count()
        else:
            completed_ids = []
            favorite_ids = []
            bookmark_ids = []
            recent_data = []
            easy_completed = medium_completed = hard_completed = 0

        return Response({
            'stats': {
                'total_problems': total_problems,
                'total_completed': len(completed_ids),
                'easy_total': easy_total,
                'easy_completed': easy_completed,
                'medium_total': medium_total,
                'medium_completed': medium_completed,
                'hard_total': hard_total,
                'hard_completed': hard_completed,
            },
            'completed_ids': completed_ids,
            'favorite_ids': favorite_ids,
            'bookmark_ids': bookmark_ids,
            'recently_viewed': recent_data
        })
