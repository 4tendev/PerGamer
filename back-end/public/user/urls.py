from django.urls import path
from . import views 
urlpatterns = [
    path('', views.auth , name = "authentication"),
    path('mobile/verify/', views.auth , name = "authentication"),
    path('email/verify/', views.auth , name = "authentication"),
]
