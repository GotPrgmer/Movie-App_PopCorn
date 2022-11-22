from django.contrib import admin

# Register your models here.
from .models import Movie, Score, Genre
# Register your models here.
@admin.register(Movie,Genre,Score)
class MovieAdmin(admin.ModelAdmin):
    pass