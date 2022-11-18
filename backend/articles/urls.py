# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('like/<int:review_id>/',views.onereviewlike),
    path('onepersonlike/<int:user_id>/', views.onepersonlike),
    # path('', views.article_list),
    # path('<int:article_pk>/', views.article_detail),
    # path('comments/', views.comment_list),
    # path('comments/<int:comment_pk>/', views.comment_detail),
    # path('articles/<int:article_pk>/comments/', views.comment_create),
    # # 필수 작성
#     path('schema/', SpectacularAPIView.as_view(), name='schema'),
#     # # optional UI
#     path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]