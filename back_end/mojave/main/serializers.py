# converting json to py objject and other way 
from rest_framework import serializers
from .models import *
import io
from rest_framework.parsers import JSONParser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class MostPopularWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = most_popular_words
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = question
        fields = '__all__' 

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email", "location"]
    




        
