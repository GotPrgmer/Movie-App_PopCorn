from django.contrib import admin

# Register your models here.
from .models import Review
# Register your models here.
@admin.register(Review)
class MovieAdmin(admin.ModelAdmin):
    pass