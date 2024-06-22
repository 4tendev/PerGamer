from django.urls import path
from . import views 
urlpatterns = [
    path('products/', views.products , name = "products"),
    path('transactions/', views.transactions , name = "transactions"),
    path('orders/', views.orders , name = "orders"),
    path('orders/<int:orderID>/', views.order , name = "order"),
]
