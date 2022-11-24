from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.db.models import Q
from django.shortcuts import render

from articles.serializers import ReviewSerializer
from articles.models import Review

from .serializers import MovieSerializer, WatchSerializer, OneMovieChosenSerializer, SpecificMovieReviewSerializer
from .models import Movie





# Create your views here.
@api_view(['GET'])
def total(request):
    movies = Movie.objects.all().order_by('-released_date')[:10]
    # movies = random.sample(movies, 10)
    serializer = MovieSerializer(movies,many=True)
    return Response(serializer.data)

#전체영화를 개봉순, 평점순으로
@api_view(['GET'])    
def nowplaying(request):
    movies = Movie.objects.all().order_by('-rate')[:10]
    # movies = random.sample(movies, 10)
    serializer = MovieSerializer(movies,many=True)
    return Response(serializer.data)

#전체영화를 장르별 평점순, 개봉일자 순으로
@api_view(['GET'])    
def moviebygenre(request,genre_id):
    movies = Movie.objects.filter(genres= genre_id).order_by('-rate','-released_date')[:5]
    # movies = random.sample(movies, 10)
    serializer = MovieSerializer(movies,many=True)
    return Response(serializer.data)

# 개별 영화 정보
@api_view(['GET'])
def moviedetail(request, movie_id):
    movie = get_object_or_404(Movie,pk=movie_id)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


#한글 검색 안됨
@api_view(['GET'])
def searchmovie(request, keyword):
    movie = Movie.objects.all().filter(Q(movietitle__contains=keyword)|Q(original_title_contains=keyword))[:10]
    # movies = random.sample(movies, 10)
    serializer = MovieSerializer(movie,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def watchlist(request,username):
    User = get_user_model()
    # print(User)
    user = User.objects.get(username=username)
    # print(user.nickname)
    serializer = WatchSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def chosenmovie(request,movie_id):
    movie = Movie.objects.get(pk=movie_id)
    serializer = OneMovieChosenSerializer(movie)
    return Response(serializer.data)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def moviereviews(request,movie_id):
    movie = get_object_or_404(Movie,pk=movie_id)
    User = get_user_model()
    user = request.user
    # print(request.data)
    if request.method == 'GET':
        #한영화에 해당되는 모든 리뷰들 다 보여주기
        reviews = Review.objects.filter(movie_id=movie_id).order_by('-updated_at')
        # reviews = Review.objects.()
        username_list = []
        for i in reviews:
            user = User.objects.get(pk=i.user_id)
            likeusers = []
            for j in i.like_users.all():
                print(j.id)
                likeusers.append(j.id)

            review_info = {
                "id" : i.id,
                "review_title" : i.review_title,
                "review_content" : i.review_content,
                "created_at" : i.created_at,
                "updated_at" : i.updated_at,
                "user" : i.user_id,
                "username" : user.username,
                "movie" : i.movie_id,
                "like_users" :  likeusers

            }
            username_list.append(review_info)
        # serializer = SpecificMovieReviewSerializer(movie)
        # return Response(serializer.data)
        return JsonResponse(username_list,  safe=False)

    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        # print(serializer)
        if serializer.is_valid(raise_exception=True):
            # serializer.save()
            serializer.save(movie=movie,user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

#하나로 빼기
#후기 수정 및 삭제
@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def moviereviewsedit(request,review_id):
    review = get_object_or_404(Review, pk=review_id)
    if request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data)
        # print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def movieclicklike(request,user_id,movie_id):
    User = get_user_model()
    user = User.objects.get(pk=user_id)
    movie = Movie.objects.get(id=movie_id)

    if movie.userslike.filter(pk=user_id).exists():
        movie.userslike.remove(user)
        is_liked = False
    else:
        movie.userslike.add(user)
        is_liked = True
    users = movie.userslike.all()
    likepeople = []
    for e in users:
        likepeople.append(e.username)
    context = {
        'is_liked':is_liked,
        'likepeople': likepeople,
        'likecnt': movie.userslike.count()
    }
    return JsonResponse(context)

