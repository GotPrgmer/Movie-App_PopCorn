
# Create your views here.

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.shortcuts import render

from .serializers import ReviewLikeSerializer, UserLikeSerializer
from accounts.models import User
from .models import Review

@api_view(['GET'])
def onereviewlike(request,review_id):
    review = Review.objects.get(pk=review_id)
    serializer = ReviewLikeSerializer(review)
    return Response(serializer.data)


@api_view(['GET'])
def onepersonlike(request,username):
    user = User.objects.get(username=username)
    serializer = UserLikeSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def reviewclicklike(request,user_id,review_id):
    user = User.objects.get(pk=user_id)
    review = Review.objects.get(id=review_id)

    if review.like_users.filter(pk=user_id).exists():
        review.like_users.remove(user)
        is_liked = False
    else:
        review.like_users.add(user)
        is_liked = True
    users = review.like_users.all()
    likepeople = []
    for e in users:
        likepeople.append(e.username)

    context = {
        'is_liked':is_liked,
        'likepeople': likepeople,
        'likecnt': review.like_users.count()
    }
    return JsonResponse(context)



