from django.urls import path
from . import views


app_name = 'movies'

urlpatterns = [
    path('<int:user_id>/people', views.people, name='people'),
]
