from django.shortcuts import render
from users.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import User
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer