# Generated by Django 4.2.13 on 2024-06-25 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='detail',
            name='descriptions',
            field=models.JSONField(default=[]),
        ),
    ]
