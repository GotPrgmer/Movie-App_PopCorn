from rest_framework import serializers
from .models import Movie
from accounts.models import User

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


#사용자가 좋아요한 영화들
class WatchSerializer(serializers.ModelSerializer):

  class UserSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = '__all__'
  user_set = UserSerializer(many=True)

  class Meta:
    model = Movie
    fields = '__all__'

