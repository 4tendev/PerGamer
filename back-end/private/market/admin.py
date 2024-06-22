from django.contrib import admin
from .models import Product ,Asset ,AssetValue,Transaction,Order

admin.site.register(Product)
admin.site.register(AssetValue)
admin.site.register(Asset)
admin.site.register(Transaction)
admin.site.register(Order)





# Register your models here.
