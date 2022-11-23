from django.shortcuts import render
from .models import User
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404, get_list_or_404

from movies.models import Genre, Score
from articles.serializers import  OtherArticleSerializer, MyArticleSerializer
from .serializers import UserSerializer
from movies.serializers import ScoreSerializer
from rest_framework import status

# Create your views here.

#내가 어떤사람을 눌렀을 때 그 사람이 팔로잉한 사람
@api_view(['GET'])
def followingusers(request, username):
  #로그인한 사용자
  #(내가 누른 사람)
  person = get_object_or_404(User,username=username)
  like_users = person.followings.all()
  followingusers = []
  for e in like_users:
    followingusers.append(e.username)
  context = {
    'followingusers' : followingusers,
    }
  return JsonResponse(context)

#나를 팔로잉한 사람들
@api_view(['GET'])
def followerusers(request, username):
  #로그인한 사용자
  #(내가 누른 사람)
  person = get_object_or_404(User,username=username)
  like_users = person.followers.all()
  followerusers = []
  for e in like_users:
    followerusers.append(e.username)
  context = {
    'followerusers' : followerusers,
    }
  return JsonResponse(context)

#한 사람이 작성한 후기들
@api_view(['GET'])
def personarticle(request, username):
  User = get_user_model()
  me = request.user
  you = get_object_or_404(User,username=username)
  if me != you:
    serializer = OtherArticleSerializer(you)
  else:
    serializer = MyArticleSerializer(me)
  return Response(serializer.data)

#사용자 정보
@api_view(['GET'])
def userinfo(request,username):
  User = get_user_model()
  user = get_object_or_404(User,username=username)
  serializer = UserSerializer(user)
  return Response(serializer.data)

#사용자 정보수정
# @api_view(['PUT'])
# def changemyinfo(request):
#   user = get_object_or_404(User,pk=request.user.id)
#   genre_dic = dict(request.data)
#     for genre_item in genre_dic.items():
#         genre = Genre.objects.get(genre_name = genre_item[0])
#         score = Score(user.id,genre.id)
#         score.users = user
#         score.genres = genre
#         score.score = genre_item[1][0]
#         score.save()
#         context = {
#            'success':'성공',
#         }
#         return JsonResponse(context, safe=False)  


#장르별 점수
@api_view(['GET','POST','PUT'])
def mygenrescore(request,username):
  user = User.objects.get(username=username)
  #score접근
  #여러개의 score 레코드 나옴
  score = user.user_genre.filter(users=user.id)
  #score접근
  #여러개의 score 레코드 나옴
  if request.method == 'POST':
      genre_dic = dict(request.data)

      print( dict(request.data))
      for genre_item in genre_dic.items():
        score = Score()
        score.users = user
        genre = Genre.objects.get(genre_name = genre_item[0])
        score.genres = genre
        score.score = genre_item[1][0]
        score.save()
        context = {
           'success':'성공',
        }
        return JsonResponse(context, safe=False)
        # return Response(context, status=status.HTTP_201_CREATED)
      # print(serializer)
      # if serializer.is_valid(raise_exception=True):
      #     # serializer.save()
      #     serializer.save(movie=movie,user=user)
      #     return Response(serializer.data, status=status.HTTP_201_CREATED)
  elif request.method == 'PUT':
    genre_dic = dict(request.data)
    for genre_item in genre_dic.items():
        genre = Genre.objects.get(genre_name = genre_item[0])
        score = Score(user.id,genre.id)
        score.users = user
        score.genres = genre
        score.score = genre_item[1][0]
        score.save()
        context = {
           'success':'성공',
        }
        return JsonResponse(context, safe=False)    
  else:
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
      'user':user.id,
      'score' : scorebygenre
    }
    return JsonResponse(context, safe=False)

#내가 다른 사용자의 팔로우 버튼을 눌렀을 때
@api_view(['POST'])
def followclick(request, myname, user_pk):
  you = get_object_or_404(get_user_model(), pk=user_pk)
  me = get_object_or_404(get_user_model(), username=myname)
  if me != you:
      #언팔로우
      if me.followings.filter(pk=you.pk).exists():
          me.followings.remove(you)
          is_followed = False
      #팔로우
      else:
          me.followings.add(you)
          is_followed = True
      followings = []
      followers = []
      #나를 팔로우 하고있는 사람들
      myfollowers = me.followers.all()
      #내가 팔로우 하고있는 사람들
      myfollowings = me.followings.all()
      for i in myfollowers:
        followers.append(i.username)
        # print(i.username)
      for i in myfollowings:
        followings.append(i.username)
      # for e in users:
      #     likepeople.append(e.username)
      context = {
          'is_followed': is_followed,
          'followersCnt': len(myfollowers),
          'followingsCnt': len(myfollowings),
          'myfollowers' : followers,
          'myfollowings' : followings,
      }
      return JsonResponse(context)


