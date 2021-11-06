from django.shortcuts import render
from users.serializers import UserFollowingSerializer
from users.serializers import UserSerializer, UserFollowing
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import  User, UserFollowing
from django.db.models import Q
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get']
    # queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset = User.objects.all() 
        if self.request.query_params.get("user", None):
            user = self.request.query_params.get("user", None)
            if(len(user)>=2):
                queryset = queryset.filter( Q(username__istartswith= user )| Q(fullName__istartswith = user))
            else:
                return None
        return queryset
    
    
    

class UserFollowingViewSet(viewsets.ModelViewSet):

    serializer_class = UserFollowingSerializer
    queryset = UserFollowing.objects.all()
    
