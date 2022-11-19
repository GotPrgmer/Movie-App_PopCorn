from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import MovieSerializer, WatchSerializer, OneMovieChosenSerializer, SpecificMovieReviewSerializer
from articles.serializers import ReviewSerializer
from .models import Movie
from articles.models import Review


# Create your views here.
@api_view(['GET'])
def total(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def watchlist(request,user_name):
    User = get_user_model()
    print(User)
    user = User.objects.get(user=user_name)
    print(user.nickname)
    serializer = WatchSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def chosenmovie(request,movie_id):
    movie = Movie.objects.get(pk=movie_id)
    serializer = OneMovieChosenSerializer(movie)
    return Response(serializer.data)

@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def moviereviews(request,movie_id):
    movie = get_object_or_404(Movie,pk=movie_id)
    # reviews = Review.objects.filter(movie=movie_id)
    user = request.user
    print(request.data)
    if request.method == 'GET':
        #한영화에 해당되는 모든 리뷰들 다 보여주기
        serializer = SpecificMovieReviewSerializer(movie)
        return Response(serializer.data)

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

#     article = get_object_or_404(Article, pk=article_pk)
#     serializer = CommentSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(article=article)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


