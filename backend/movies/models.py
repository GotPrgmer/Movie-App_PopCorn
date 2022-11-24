from django.db import models
from django.conf import settings


# Create your models here.
class Genre(models.Model):
    genre_name = models.CharField(max_length=20)


class Movie(models.Model):
    adult = models.BooleanField()
    movietitle = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100)
    actors = models.TextField()
    director = models.CharField(max_length=30)
    rate = models.FloatField()
    released_date = models.DateField(auto_now=False, auto_now_add=False)
    overview = models.TextField(blank=True)
    posterpath = models.TextField()
    backdrop = models.TextField()
    genres = models.ManyToManyField( Genre , related_name='genre')
    userslike = models.ManyToManyField( settings.AUTH_USER_MODEL , related_name='userlike')



class Score(models.Model):
    users = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_genre")
    genres = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name="genrename")
    score = models.IntegerField()
