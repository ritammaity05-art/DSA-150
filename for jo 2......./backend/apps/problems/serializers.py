from rest_framework import serializers
from .models import Topic, Problem

class TopicSerializer(serializers.ModelSerializer):
    problem_count = serializers.IntegerField(source='problems.count', read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'name', 'slug', 'icon', 'description', 'order', 'problem_count']

class ProblemListSerializer(serializers.ModelSerializer):
    topic_name = serializers.CharField(source='topic.name', read_only=True)
    topic_slug = serializers.CharField(source='topic.slug', read_only=True)

    class Meta:
        model = Problem
        fields = [
            'id', 'id_number', 'title', 'slug', 'difficulty',
            'topic_name', 'topic_slug', 'estimated_time', 'summary', 'is_daily_problem'
        ]

class ProblemDetailSerializer(serializers.ModelSerializer):
    topic_name = serializers.CharField(source='topic.name', read_only=True)
    topic_slug = serializers.CharField(source='topic.slug', read_only=True)

    class Meta:
        model = Problem
        fields = '__all__'
