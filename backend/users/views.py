
# backend/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.contrib.auth import authenticate, login


class RegisterView(APIView):
    def post(self, request):
        # Gelen veriyi terminale yazdırıyoruz
        print("Frontend'den gelen veri:", json.dumps(request.data, indent=4))

        # Serializer ile doğrulama ve kayıt işlemi
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Kayıt başarılı!"}, status=status.HTTP_201_CREATED)
        
        print("Hata Detayları:", serializer.errors)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView

class ProfileView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({"username": request.user.username, "email": request.user.email}, status=200)
        else:
            return Response({"error": "Kullanıcı oturum açmamış."}, status=401)


from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()  # Kullanıcı modelini alın

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Email ile kullanıcıyı bul ve doğrula
        try:
            user = User.objects.get(email=email)  # Email'e göre kullanıcıyı alın
        except User.DoesNotExist:
            return Response({"error": "Geçersiz email veya şifre."}, status=status.HTTP_401_UNAUTHORIZED)

        # Şifreyi doğrula
        if not user.check_password(password):
            return Response({"error": "Geçersiz email veya şifre."}, status=status.HTTP_401_UNAUTHORIZED)

        # Kullanıcıyı oturum aç
        login(request, user)
        return Response({"message": "Giriş başarılı!"}, status=status.HTTP_200_OK)

