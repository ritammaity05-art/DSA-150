from rest_framework import serializers
from .models import UserProblemProgress
from apps.problems.serializers import ProblemListSerializer

class UserProblemProgressSerializer(serializers.ModelSerializer):
    problem = ProblemListSerializer(read_only=True)
    problem_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = UserProblemProgress
        fields = ['id', 'problem', 'problem_id', 'is_completed', 'is_favorite', 'is_bookmarked', 'notes', 'last_viewed_at']
