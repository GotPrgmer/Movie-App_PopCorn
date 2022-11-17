from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomUserSerializer(RegisterSerializer):
    # 기본 설정 필드: username, password, email
    # 추가 설정 필드: profile_image

    # profile_image = serializers.ImageField(use_url=True)
    nickname = serializers.CharField(max_length=30)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['nickname'] = self.validated_data.get('nickname', '')

        return data


