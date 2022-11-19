from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    # path('<int:user_id>/people', views.people, name='people'),
    path('written/<str:username>/', views.personarticle),
    # path('scores/<int:user_id>/', views.myscore),
    path('scores/<str:username>/', views.mygenrescore),
]
