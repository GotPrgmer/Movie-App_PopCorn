from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('like/<int:review_id>/',views.onereviewlike),
    path('onepersonlike/<str:username>/', views.onepersonlike),
    path('clicklike/<int:user_id>/<int:review_id>/', views.reviewclicklike),

]