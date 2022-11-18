from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Movie
from .serializers import MovieSerializer, WatchSerializer
from django.contrib.auth import get_user_model


# Create your views here.
@api_view(['GET'])
def total(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def watchlist(request,user_id):
    User = get_user_model()
    print(User)
    user = User.objects.get(pk=user_id)
    print(user.nickname)
    serializer = WatchSerializer(user)
    return Response(serializer.data)
