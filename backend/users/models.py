# backend/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Email benzersiz ve zorunlu.
    username = models.CharField(max_length=150, unique=True)
