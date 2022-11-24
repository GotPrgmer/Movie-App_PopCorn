from django.urls import path
from . import views


app_name = 'accountsinfo'

urlpatterns = [
    path('<str:username>/', views.userinfo),
    path('written/<str:username>/', views.personarticle),
    # path('changeuserinfo/<str:', views.changemyinfo),
    path('scores/<str:username>/', views.mygenrescore),
    path('follow/<str:myname>/<int:user_pk>/', views.followclick),
    path('following/<str:username>/', views.followingusers),
    path('follower/<str:username>/', views.followerusers),
]
