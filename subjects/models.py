from django.db import models
from colorfield.fields import ColorField

# Create your models here.
class SchoolSubject(models.Model):
    subject_name = models.CharField(max_length=200)
    subject_color = ColorField(default='#184336')