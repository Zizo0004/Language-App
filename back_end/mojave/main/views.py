from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
# Frontend needs: User data, most popular words, category

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
