# Generated by Django 3.1.1 on 2020-10-28 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogposts', '0009_blogpost_likers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='likers',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='likers',
            field=models.TextField(blank=True),
        ),
    ]
