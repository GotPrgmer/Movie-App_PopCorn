from rest_framework import serializers
from .models import Movie
from accounts.models import User
from movies.models import Score
from accounts.serializers import UserSerializer
from articles.serializers import ReviewSerializer


#영화 리스트
class MovieListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movie
    fields = ('id','movietitle','posterpath')

#영화 디테일
class MovieSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movie
    fields = '__all__'
    read_only_fields = ('userslike','genres')


#특정영화 코멘트들
class SpecificMovieReviewSerializer(serializers.ModelSerializer):

  movie_reviews = ReviewSerializer(many=True, read_only=True)

  class Meta:
    model = Movie
    fields = ('id','movie_reviews')







#사용자가 좋아요한 영화들
class WatchSerializer(serializers.ModelSerializer):

  userlike = MovieListSerializer(many=True)
  
  class Meta:
    model = User
    fields = ('id','userlike')

#한 영화에 좋아요한 사람들
class OneMovieChosenSerializer(serializers.ModelSerializer):

  userslike = UserSerializer(many=True)
  
  class Meta:
    model = Movie
    fields = ('id','userslike')
    read_only_fields = ('userslike',)


#스코어점수 시리얼라이즈
class ScoreSerializer(serializers.ModelSerializer):
  class Meta:
    model = Score
    fields = '__all__'
    read_only = ('user','genre')