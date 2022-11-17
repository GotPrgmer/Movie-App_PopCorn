from django.urls import path
from . import views


app_name = 'movies'

urlpatterns = [
    path('total_movie/', views.total)
]
