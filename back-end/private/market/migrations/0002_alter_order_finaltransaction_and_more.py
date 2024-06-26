# Generated by Django 4.2.13 on 2024-06-20 22:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='finalTransaction',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='finalizedOrder', to='market.transaction'),
        ),
        migrations.AlterField(
            model_name='order',
            name='initialTransaction',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='initiatedOrder', to='market.transaction'),
        ),
    ]
