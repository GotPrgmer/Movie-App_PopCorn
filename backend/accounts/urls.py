from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    path('<str:username>/', views.userinfo),
    path('written/<str:username>/', views.personarticle),
    path('scores/<str:username>/', views.mygenrescore),
]
