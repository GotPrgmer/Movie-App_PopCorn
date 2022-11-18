from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import Review
from accounts.models import User
from accounts.serializers import  UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user','movie')
#한 리뷰에 좋아요한 사람들
class ReviewLikeSerializer(serializers.ModelSerializer):
    like_users = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ('id','like_users')
#내가 작성한 리뷰들
class MyArticleSerializer(serializers.ModelSerializer):
    user_reviews = ReviewSerializer(many=True, read_only=True)
    #무비정보도 있어야함
    # user_movies 
    class Meta:
        model = User
        fields = ('username','nickname','last_name','first_name','user_reviews')
#나 말고 다른사용자가 작성한 리뷰들
class OtherArticleSerializer(serializers.ModelSerializer):
    user_reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username','nickname','user_reviews')

#한 사용자가 좋아요한 리뷰들
class UserLikeSerializer(serializers.ModelSerializer):
    like_reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id','like_reviews')


