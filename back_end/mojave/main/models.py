from django.db import models
from django.contrib.auth.models import User
# models for: # User # Most popular words # Category
# The relationship between user and 'most popular words' and 'category' is many to many

categories = [('business','business'),('culture','culture'),('food','food'),('hospital','hospital'),('banking','banking'),('job culture','job culture'),('conversation','conversation'),('questions','questions')]
answer = [('A','A'),('B','B'),('C','C'),('D','D')]

class most_popular_words(models.Model):
    word = models.CharField(max_length=50,primary_key=True)
    translation = models.CharField(max_length=50)
    answer = models.CharField(max_length=2,choices=answer)
    status = models.BooleanField(default=False)
    other = models.CharField(max_length=100,default='')
    audio = models.FileField(upload_to='word_audio/',blank=True,null=True)

class question(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=255)
    translated_description = models.JSONField()
    category = models.CharField(max_length=50,choices=categories,default='other')
    answer = models.CharField(max_length=50,choices=answer)
    status = models.BooleanField(default=False)
    audio = models.FileField(upload_to='question_audio/',blank=True,null=True)

class User(models.Model):
    username = models.CharField(max_length=25,primary_key=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=255,default='earth') # allow if they allow
    profile = models.CharField(max_length=50,default='john doe')
    most_popular_words = models.ManyToManyField(most_popular_words,blank=True)
    category = models.ManyToManyField(question,blank=True)

    def __str__(self):
        return self.username
    


