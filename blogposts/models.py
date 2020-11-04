from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
    post_title = models.CharField(max_length=30)
    post_subject = models.CharField(max_length=10)
    post_content = models.TextField(default="")
    likes = models.IntegerField()
    post_author = models.IntegerField()
    file = models.FileField(blank=True)
    likers = models.TextField(blank=False, default='{ "data":[] }')

    def __str__(self):
        return self.post_title