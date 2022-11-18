from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user','movie')
