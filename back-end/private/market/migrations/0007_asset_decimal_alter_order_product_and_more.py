# Generated by Django 4.2.13 on 2024-06-26 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_order_sellerdeliverat_alter_order_initiatorrecieved_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='decimal',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='order',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='market.product'),
        ),
        migrations.AlterField(
            model_name='order',
            name='sellerDeliverAt',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Processing'), (2, 'Done'), (3, 'Canceled')], default=1),
        ),
        migrations.AlterField(
            model_name='product',
            name='status',
            field=models.IntegerField(choices=[(1, 'Draft'), (2, 'In Sale'), (3, 'Processing'), (4, 'Sold')], default=1),
        ),
    ]