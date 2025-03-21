from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *
import json

@api_view(['GET'])
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
def create_user(request):
    data = request.data
    serializer = CustomUserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.create(username=request.data['username'], password=request.data['password'], email=request.data['email'],location=request.data['location'])
        token = Token.objects.create(user=user)
        print("User created successfully",serializer.data)
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
def user_question_attempt(request):
    user = User.objects.get(username=request.data["username"])
    questions = question.objects.get(description=request.data["id"])
    if request.data['marks'] == "True":
        questions.status = True
        user.category.add(question)
    else:
        question.status = False
        user.category.add(question)
    questions.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def user_word_attempt(request):
    user = User.objects.get(username=request.data["username"])
    word = most_popular_words.objects.get(word=request.data["word"])
    print(word)
    if request.data['marks'] == "True":
        word.status = True
        user.most_popular_words.add(word)
    else:
        word.status = False
        user.most_popular_words.add(word)
    word.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def a(request):
    user = User.objects.get(username=request.data["username"])
    print(user.most_popular_words.all()[0].status)
    return Response(status=status.HTTP_200_OK)