from rest_framework import serializers
from django.db import transaction
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User


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
    
    

class UserSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = User
        fields = ['id', 'username', 'fullName', 'email',]
    

    
