
# backend/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import json

class RegisterView(APIView):
    def post(self, request):
        # Gelen veriyi terminale yazdırıyoruz
        print("Frontend'den gelen veri:", json.dumps(request.data, indent=4))

        # Serializer ile doğrulama ve kayıt işlemi
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Kayıt başarılı!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            tokens = RefreshToken.for_user(user)
            return Response({
                "access": str(tokens.access_token),
                "refresh": str(tokens),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
