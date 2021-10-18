
from feed.serializers import CommentSerializer, LikeSerializer, PostSerializer, SectionSerializer
from users.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Post, Comment, Like, Section
# Create your views here.


class SectionViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    http_method_names = ['post','get']
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    
    
class PostViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    # http_method_names = ['post','get','delete']
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # def get_queryset(self):
    #      queryset = Post.objects.filter(user=self.request.user)
    #      return queryset
    
 

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
    

