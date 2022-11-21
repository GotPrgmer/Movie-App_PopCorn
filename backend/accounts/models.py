from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.core.validators import MinValueValidator


# Create your models here.

class User(AbstractUser):
    nickname = models.CharField(max_length=30,null=True)
    profile_image = ProcessedImageField(

        blank=True,
        upload_to=f'profile_image/%Y/%m',
        processors=[ResizeToFill(300, 300)],
        format='JPEG',
        options={'quality': 70},
    )
    followings = models.ManyToManyField("self", symmetrical=False,related_name='followers')

