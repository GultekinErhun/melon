# backend/users/serializers.py
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import CustomUser
from rest_framework.validators import UniqueValidator

# backend/users/serializers.py
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8,  error_messages={
        'min_length': 'Şifre en az 8 karakter olmalıdır.'  # Özel hata mesajı
    })
    confirm_password = serializers.CharField(write_only=True)
    
    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="Bu kullanıcı adı zaten kullanılıyor."  # Hata mesajını özelleştirdik
            )
        ]
    )
    
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="Bu email zaten kayıtlı."
            )
        ]
    )
    

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'confirm_password')


    def validate(self, data):
        print("validate metodu çağrıldı:", data) 
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Şifreler eşleşmiyor."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # confirm_password kaydedilmez
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Şifre hashlenir
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = CustomUser.objects.get(email=data['email'])
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Bu email ile bir kullanıcı bulunamadı.")
        
        if not user.check_password(data['password']):
            raise serializers.ValidationError("Şifre yanlış.")
        
        return user

    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
