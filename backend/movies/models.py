from django.db import models
from django.conf import settings


# Create your models here.
class Genre(models.Model):
    genre_name = models.CharField(max_length=20)


class Movie(models.Model):
    movietitle = models.CharField(max_length=100)
    actors = models.TextField()
    director = models.CharField(max_length=20)
    rate = models.FloatField()
    released_data = models.DateField(auto_now=False, auto_now_add=False)
    overview = models.TextField()
    posterpath = models.TextField()
    genres = models.ManyToManyField( Genre , related_name='genre')



class Genrescore(models.Model):
    users = models.ManyToManyField( settings.AUTH_USER_MODEL , related_name='genrescore')
    score = models.IntegerField()
