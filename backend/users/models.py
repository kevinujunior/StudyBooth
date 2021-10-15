from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    fullName = models.CharField(max_length=150)
    userPic =  models.ImageField(upload_to='images/', null=True)
    userPostCount = models.IntegerField(null = True,default=0)
    userQuestionCount = models.IntegerField(null = True,default=0)
    userAnswerCount = models.IntegerField(null=True,default=0)