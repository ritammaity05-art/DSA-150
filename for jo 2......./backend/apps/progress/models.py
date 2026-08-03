from django.db import models
from django.contrib.auth.models import User
from apps.problems.models import Problem

class UserProblemProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='user_progress')
    is_completed = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)
    is_bookmarked = models.BooleanField(default=False)
    notes = models.TextField(blank=True, default="")
    last_viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'problem')

    def __str__(self):
        return f"{self.user.username} - {self.problem.title}"
