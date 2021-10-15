from rest_framework import serializers
from .models import Post, Section
from .models import Comment
from .models import Like
from users.models import User

    

class PostSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Post
        fields = '__all__'
    

class CommentSerializer(serializers.ModelSerializer):
    
    """don't delet this comment we might need it later"""
    # username = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['post', 'commentatorUser','commentText', 'createdAt',]
    
    # def get_username(self,obj):
    #     username = obj.commentatorUser.username
    #     return username
    


class LikeSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Like
        fields = '__all__'
    
    
class SectionSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Section
        fields = '__all__'
    