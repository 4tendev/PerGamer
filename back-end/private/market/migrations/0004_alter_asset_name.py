# Generated by Django 4.2.13 on 2024-06-21 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0003_alter_product_tradeableat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asset',
            name='name',
            field=models.CharField(max_length=5, unique=True),
        ),
    ]