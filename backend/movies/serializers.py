from rest_framework import serializers
from .models import Movie
from accounts.models import User
from movies.models import Score

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

#특정영화 코멘트
#사용자가 좋아요한 영화들
class WatchSerializer(serializers.ModelSerializer):

  userlike = MovieListSerializer(many=True)
  
  class Meta:
    model = User
    fields = ('id','userlike')


#스코어점수 시리얼라이즈
class ScoreSerializer(serializers.ModelSerializer):
  class Meta:
    model = Score
    fields = '__all__'
    read_only = ('user','genre')