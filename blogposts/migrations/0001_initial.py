# Generated by Django 3.1.1 on 2020-10-17 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_title', models.CharField(max_length=30)),
                ('post_subject', models.IntegerField()),
                ('likes', models.IntegerField()),
                ('post_author', models.IntegerField()),
            ],
        ),
    ]
