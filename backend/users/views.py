
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


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Kullanıcı kimlik doğrulaması
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Oturum aç
            login(request, user)
            return Response({"message": "Giriş başarılı! Oturum açıldı."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Kullanıcı adı veya şifre hatalı."}, status=status.HTTP_401_UNAUTHORIZED)


