from django.db import models

# Create your models here.
class BlogPost(models.Model):
    post_title = models.CharField(max_length=30)
    post_subject = models.CharField(max_length=10)
    post_content = models.TextField(default="")
    likes = models.IntegerField()
    post_author = models.IntegerField()

    def __str__(self):
        return self.post_title