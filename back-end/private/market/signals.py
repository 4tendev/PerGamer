
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Asset

@receiver(post_migrate)
def create_default_instances(sender, **kwargs):
    if sender.name == 'market':
        default_instances = [
            {'name': 'BTC'},
            {'name': 'USDT'},
            {'name': 'TOMAN'},
        ]
        for instance_data in default_instances:
            Asset.objects.get_or_create(**instance_data)