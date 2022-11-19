from django.urls import path
from . import views


app_name = 'movies'

urlpatterns = [
    path('total_movie/', views.total),
    path('like/<str:user_name>/', views.watchlist),
    path('manylikemovie/<int:movie_id>/', views.chosenmovie),
    path('reviews/<int:movie_id>/', views.moviereviews),
    path('reviews/editordelete/<int:review_id>/', views.moviereviewsedit),
]
