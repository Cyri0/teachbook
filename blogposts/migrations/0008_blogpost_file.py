# Generated by Django 3.1.1 on 2020-10-25 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogposts', '0007_blogpost_post_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='file',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]
