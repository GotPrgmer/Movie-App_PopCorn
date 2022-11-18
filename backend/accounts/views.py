from django.shortcuts import render
from .models import User
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import  OtherArticleSerializer, MyArticleSerializer

# Create your views here.

#내가 어떤사람을 눌렀을 때 그 사람이 팔로잉한 사람
def follow(request, user_pk):
  #로그인한 사용자
  #(내가 누른 사람)
  person = User.objects.get(pk=user_pk)
  like_users = person.followers.all()
  context = {
    'like_users' : like_users,
    }
  return JsonResponse(context)

#유저정보
#인증된 사용자만 들어오게함
@api_view(['GET'])
def personarticle(request, user_id):
  User = get_user_model()
  me = request.user
  you = User.objects.get(pk=user_id)
  if me != you:
    serializer = OtherArticleSerializer(you)
  else:
    serializer = MyArticleSerializer(me)
  return Response(serializer.data)

#장르별 점수
# def mygenrescore(request, user_pk):
#   # user = User.objects.get(pk=user_pk)
#   mygenreIntances = Score.filter(users=user_pk)
#   for mygenres in mygenreIntances:
#     mygenres.genre_name
#             mygenreIntances.genres


