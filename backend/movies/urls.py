from django.urls import path
from . import views


app_name = 'movies'

urlpatterns = [
    path('total_movie/', views.total),
    path('like/<int:user_id>/', views.watchlist),
    path('manylikemovie/<int:movie_id>/', views.chosenmovie),
    path('reviews/<int:movie_id>/', views.moviereviews),
    

]
