from django.db.models.fields import NullBooleanField
from rest_framework import serializers
from .models import Post, Section
from .models import Comment
from .models import Like
from users.models import User
from users.serializers import UserSerializer

class SectionSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Section
        fields = ['id', 'sectionName', 'sectionPic']
    

class PostSerializer(serializers.ModelSerializer):
    commentCount = serializers.SerializerMethodField(read_only=True)
    likeCount = serializers.SerializerMethodField(read_only= True)
    postSection = serializers.SerializerMethodField()
    comments  = serializers.SerializerMethodField()
    userFields = serializers.SerializerMethodField()

  
    class Meta:
        model = Post
        fields = ['id','postCaption', "postFile",  'likeCount', 'commentCount', 'user','userFields', 'postSection','createdAt','comments']
        
        
    def get_commentCount(self,obj):
        commentcount = Comment.objects.filter(post = obj)
        return len(commentcount)
    
    def get_likeCount(self,obj):
        likecount = Like.objects.filter(post = obj)
        return len(likecount)
    
    def get_postSection(self,obj):
        if(obj.postSection!=None):
            return SectionSerializer(obj.postSection).data
        else:
            return 
    
    def get_comments(self,obj):
        comments = Comment.objects.filter(post = obj)
        return CommentSerializer(comments, many =True).data
       
    def get_userFields(self,obj):
        userfield = obj.user
        return UserSerializer(userfield).data
    

class CommentSerializer(serializers.ModelSerializer):
    
    """don't delet this comment we might need it later"""
    # username = serializers.SerializerMethodField(read_only=True)
    commentatorUser = UserSerializer()
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
    
    
