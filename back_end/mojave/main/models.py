from django.db import models

# models for:

# User
# Most popular words
# Category

# The relationship between user and 'most popular words' and 'category' is many to many
class User(models.Model):
    username = models.CharField(max_length=25,primary_key=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=255) # allow if they allow
    profile = models.CharField(max_length=50)

    def __str__(self):
        return self.username
    
class most_popular_words(models.Model):
    word = models.CharField(max_length=50,primary_key=True)
    translation = models.CharField(max_length=50)
    status = models.CharField(max_length=20) # completed, not completed, viewed, not viewed
    grammar = models.CharField(max_length=50) # verbs, nouns, adjectives, adverbs etc...
    audio = 

class category(models.Model):
    name = models.CharField(max_length=50,primary_key=True)
    description = models.JSONField()
    translated_description = models.JSONField()


    def __str__(self):
        return self.word

