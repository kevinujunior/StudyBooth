from django.shortcuts import render
from users.serializers import UserFollowingSerializer
from users.serializers import UserSerializer, UserFollowing
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import  User, UserFollowing
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class UserFollowingViewSet(viewsets.ModelViewSet):

    serializer_class = UserFollowingSerializer
    queryset = UserFollowing.objects.all()
    
