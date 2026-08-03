from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, default="code")
    description = models.TextField(blank=True, default="")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Problem(models.Model):
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]

    id_number = models.IntegerField(unique=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='Easy')
    topic = models.ForeignKey(Topic, related_name='problems', on_delete=models.CASCADE)
    estimated_time = models.CharField(max_length=30, default="15 mins")
    
    # 1. Problem Summary
    summary = models.TextField(help_text="2-3 simple sentences explaining the problem.")
    
    # 2. Real Life Analogy
    analogy = models.TextField(help_text="Real life analogy story.")
    
    # 3. Easy Explanation (English)
    easy_explanation = models.TextField()
    
    # 4. Bengali Explanation (বাংলা)
    bengali_explanation = models.TextField()
    
    # 5. Intuition
    intuition = models.TextField(help_text="Why this approach works before syntax.")
    
    # 6. Progressive Hints
    hint1_tiny = models.TextField(default="")
    hint2_better = models.TextField(default="")
    hint3_almost = models.TextField(default="")
    
    # 7. Code Solutions
    code_python = models.TextField(default="")
    code_cpp = models.TextField(default="")
    code_java = models.TextField(default="")
    code_javascript = models.TextField(default="")
    
    # 8. Structured Line-by-Line Breakdown (JSON)
    # List of {"line": 1, "code": "...", "explanation": "..."}
    line_by_line = models.JSONField(default=list)
    
    # 9. Animated Visual Dry Run Steps (JSON)
    # List of {"step": 1, "title": "...", "desc": "...", "state": {...}}
    dry_run_steps = models.JSONField(default=list)
    
    # 10. Complexity Analysis
    time_complexity = models.CharField(max_length=50, default="O(n)")
    time_complexity_reason = models.TextField(default="")
    space_complexity = models.CharField(max_length=50, default="O(1)")
    space_complexity_reason = models.TextField(default="")
    
    # 11. Common Mistakes & Interactive Actions
    common_mistakes = models.JSONField(default=list) # List of {"title": "...", "desc": "..."}
    eli10_explanation = models.TextField(default="", help_text="Explain like I'm 10 version")
    extra_example = models.JSONField(default=dict, help_text="Another example with inputs and walkthrough")

    is_daily_problem = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id_number']

    def __str__(self):
        return f"#{self.id_number} {self.title}"
