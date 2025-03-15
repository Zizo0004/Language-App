from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import YourModel

# Frontend needs: User data, most popular words, category
"""
@api_view(['GET'])
def get_user(request)

@api_view(['GET'])
def get_most_words(request):

@api_view(['GET'])
def get_category(request):

@api_view(['POST'])
def creat
"""