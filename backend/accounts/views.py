from django.shortcuts import render
from .models import User
from django.http import JsonResponse

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
  