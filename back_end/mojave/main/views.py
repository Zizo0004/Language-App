from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *
import json
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User


@api_view(['GET'])
@permission_classes([AllowAny])
def get_most_words(request):
    get_words = most_popular_words.objects.all()
    serializer = MostPopularWordsSerializer(get_words, many=True)
    print(serializer.data)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
def get_questions(request):
    get_category = question.objects.all()
    serializer = QuestionSerializer(get_category, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    data = request.data
    serializer = CustomUserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.create(username=request.data['username'], password=request.data['password'], email=request.data['email'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"message":"User created successfully","token":token.key},status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    data = request.data
    serializer = CustomUserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.get(username=request.data['username'])
        token = Token.objects.get(user=user)
        return Response({"message":"User logged in successfully","token":token.key},status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_data(request):
    token = request.headers.get('Authorization')
    user = User.objects.get(token=token)
    user_questions = user.category.all()
    print(user_questions)


@api_view(['POST'])
@permission_classes([AllowAny])
def attempt_question(request):
    attempt_type = request.data["model"] # either question or most_popular_words
    if attempt_type == "question":
        question = question.objects.get(id=request.data["id"])
        question.status = True
        question.save()
        return Response("message: question attempted successfully",status=status.HTTP_200_OK)
    if attempt_type == "most_popular_words":
        word = most_popular_words.objects.get(id=request.data["id"])
        word.status = True
        word.save()
        return Response("message: word attempted successfully",status=status.HTTP_200_OK)
    else:
        return Response("message: invalid attempt type",status=status.HTTP_400_BAD_REQUEST)