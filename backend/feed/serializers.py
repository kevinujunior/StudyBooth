from rest_framework import serializers
from .models import Post, Section
from .models import Comment
from .models import Like
from users.models import User

    

class PostSerializer(serializers.ModelSerializer):
    commentCount = serializers.SerializerMethodField(read_only=True)
    likeCount = serializers.SerializerMethodField(read_only= True)
    
  
    class Meta:
        model = Post
        fields = ['id','postCaption', "postFile", "postText", 'likeCount', 'commentCount', 'user', 'postSection']
        
    def get_commentCount(self,obj):
        commentcount = Comment.objects.filter(post = obj)
        return len(commentcount)
    
    def get_likeCount(self,obj):
        likecount = Like.objects.filter(post = obj)
        return len(likecount)
        
    

class CommentSerializer(serializers.ModelSerializer):
    
    """don't delet this comment we might need it later"""
    # username = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id','post', 'commentatorUser','commentText', 'createdAt',]
    
    # def get_username(self,obj):
    #     username = obj.commentatorUser.username
    #     return username
    


class LikeSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Like
        fields = ['id', 'post','likeUser','likedAt']
    
    
class SectionSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Section
        fields = ['id', 'sectionName', 'sectionPic']
    