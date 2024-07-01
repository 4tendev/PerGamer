from django.urls import path
from . import views
urlpatterns = [
    path('', views.auth, name="authentication"),
    path('store/', views.store, name="store"),
    path('inventory/', views.inventory, name="inventory"),
    path('checkout/', views.checkout, name="checkout"),

]
