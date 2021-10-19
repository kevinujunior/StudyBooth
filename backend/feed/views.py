
from users.models import UserFollowing
from feed.serializers import CommentSerializer, LikeSerializer, PostSerializer, SectionSerializer
from users.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Post, Comment, Like, Section
from users.models import User
from django.db.models import Q
# Create your views here


class SectionViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    http_method_names = ['post','get']
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    
    
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    # queryset = Post.objects.all()
    
    def get_queryset(self):
        curruser = self.request.user
        following = UserFollowing.objects.filter(currUser = curruser)
        queryset = Post.objects.filter(
            Q(user__in= following.values_list('followingUser',flat = True)) | Q(user = curruser))
        queryset = queryset.order_by("-createdAt")
        return queryset
    
 

class CommentViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    # http_method_names = ['post','get']
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    

class LikeViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    # http_method_names = ['post','get']
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    

