from django.shortcuts import render
from .models import User
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view

from articles.serializers import  OtherArticleSerializer, MyArticleSerializer

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
@api_view(['GET'])
def mygenrescore(request, user_id):
  user = User.objects.get(pk=user_id)
  #score접근
  score = user.user_genre.filter(users=user.id)
  # print(score[1].genres.genre_name)
  #genre별 점수 호출
  scorebygenre = {}
  # genreName = score.genrename.filter(pk=score.genres)
  for e in score:
    scorebygenre[e.genres.genre_name] = e.score
  genre_check = ['모험','판타지','애니메이션','드라마','공포','액션','코미디','역사','서부','스릴러','범죄','다큐멘터리','SF','미스터리','음악','로맨스','가족','전쟁','TV 영화']
  for check in genre_check:
    scorebygenre[check] = scorebygenre.get(check,0)
  context = {
    'user':user_id,
    'score' : scorebygenre
  }
  print(context)
  return JsonResponse(context, safe=False)
  # score = Score.filter(users=user_pk)



