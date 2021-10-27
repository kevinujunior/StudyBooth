from rest_framework import serializers
from django.db import transaction
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import  User, UserFollowing

# from .serializers import UserSerializer


#custom serializer for rest_auth 
# full_name is added field
class CustomRegisterSerializer(RegisterSerializer):
    
    fullName = serializers.CharField(max_length=30)
    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.fullName = self.data.get('fullName')
        user.save()
        return user
    
  

class UserFollowingSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFollowing
        fields = ["id", "currUser","followingUser",]  
        
class FollowingSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFollowing
        fields = ["id", "followingUser",]




class FollowerSerializer(serializers.ModelSerializer): 
    followerUser = serializers.SerializerMethodField()
    class Meta:
        model = UserFollowing
        fields = ["id", "followerUser",]
    
    def get_followerUser(self,obj):
        return obj.currUser.id


class UserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    # userPic = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'fullName', 'userPic','email','following','followers']
        
    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowerSerializer(obj.followers.all(), many=True).data
        
    # def get_userPic(self,obj):
    #     request = self.context.get("request")
    #     return request.build_absolute_uri(obj.userPic.url)
    

class CommentUserSerializer(serializers.ModelSerializer):
    # userPic = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'userPic']
        
    # def get_userPic(self,obj):
    #     request = self.context.get("request")
    #     return request.build_absolute_uri(obj.userPic.url)
        
    
