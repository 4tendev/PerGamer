# Generated by Django 4.2.13 on 2024-07-01 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0010_product_isunique_alter_product_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='assetID',
            field=models.CharField(default=123, max_length=50),
            preserve_default=False,
        ),
    ]
