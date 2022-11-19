# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('like/<int:review_id>/',views.onereviewlike),
    path('onepersonlike/<str:username>/', views.onepersonlike),
    path('clicklike/<int:user_id>/<int:review_id>/', views.clicklike),
    # path('', views.article_list),
    # path('<int:article_pk>/', views.article_detail),
    # # 필수 작성
#     path('schema/', SpectacularAPIView.as_view(), name='schema'),
#     # # optional UI
#     path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]