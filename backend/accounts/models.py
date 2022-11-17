from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    nickname = models.CharField(null=True, max_length=30)
    profile = models.TextField()
    followings = models.ManyToManyField("self", symmetrical=False,related_name='followers')

