from django.db.models.fields import NullBooleanField
from users.serializers import CommentUserSerializer
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
   
    class Meta:
        model = Post
        fields = ['id','postCaption', "postFile",  'user','postSection','createdAt']
        
        
    
class PostListSerializer(serializers.ModelSerializer):
    commentCount = serializers.SerializerMethodField(read_only=True)
    likeCount = serializers.SerializerMethodField(read_only= True)
    # comments  = serializers.SerializerMethodField()
    userName =  serializers.SerializerMethodField()
    userPic = serializers.SerializerMethodField()
    sectionName = serializers.SerializerMethodField()

  
    class Meta:
        model = Post
        fields = ['id','postCaption', "postFile",  'likeCount', 'commentCount', 'user','userName','userPic','sectionName','createdAt']
        
        
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
    
    # def get_comments(self,obj):
    #     comments = Comment.objects.filter(post = obj)
    #     return CommentListSerializer(comments,many = True).data
    
    def get_userName(self,obj):
        user_username= obj.user.username
        return user_username
    
    def get_userPic(self,obj):
        request = self.context.get('request')
        photo_url = obj.user.userPic.url
        return request.build_absolute_uri(photo_url)
    
    
    def get_sectionName(self,obj):
        if(obj.postSection!=None):
            return obj.postSection.sectionName
        else:
            return 

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = ['id','post', 'commentatorUser','commentText', 'createdAt']
    

    


class CommentListSerializer(serializers.ModelSerializer):
    

    # userName =  serializers.SerializerMethodField(read_only = True)
    # userPic = serializers.SerializerMethodField(read_only = True)
    commentatorUser = CommentUserSerializer()
    
    class Meta:
        model = Comment
        fields = ['id','post', 'commentatorUser','commentText', 'createdAt',]
    
    
    # def get_userName(self,obj):
    #     user_username= obj.commentatorUser.username
    #     return user_username
    
    # def get_userPic(self,obj):
    #     request = self.context.get('request')
    #     photo_url = obj.commentatorUser.userPic.url
    #     return request.build_absolute_uri(photo_url)
    
    
    

class LikeSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Like
        fields = ['id', 'post','likeUser','likedAt']
    
    


class LikeListSerializer(serializers.ModelSerializer):
    
  
    
    userName =  serializers.SerializerMethodField()
    userPic = serializers.SerializerMethodField()
    class Meta:
        model = Like
        fields = ['id', 'post','likeUser','likedAt','userName','userPic']
    
    
    def get_userName(self,obj):
        user_username= obj.commentatorUser.username
        return user_username
    
    def get_userPic(self,obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.commentatorUser.userPic)