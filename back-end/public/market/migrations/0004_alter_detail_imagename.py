# Generated by Django 4.2.13 on 2024-06-25 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0003_alter_detail_descriptions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detail',
            name='imageName',
            field=models.CharField(max_length=100),
        ),
    ]
