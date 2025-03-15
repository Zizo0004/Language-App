from django.db import models
# models for: # User # Most popular words # Category
# The relationship between user and 'most popular words' and 'category' is many to many

categories = [('business','business'),('culture','culture'),('food','food'),('hospital','hospital'),('banking','banking'),('job culture','job culture'),('conversation','conversation'),('questions','questions')]
mutiple_choice = [('A','A'),('B','B'),('C','C'),('D','D')]

class most_popular_words(models.Model):
    word = models.CharField(max_length=50,primary_key=True)
    translation = models.CharField(max_length=50)
    grammar = models.CharField(max_length=25) # verbs, nouns, adjectives, adverbs etc...
    mutiple_choice = models.CharField(max_length=2,choices=mutiple_choice)
    audio = models.BinaryField()

class question(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=255)
    translated_description = models.JSONField()
    category = models.CharField(max_length=50,choices=categories,default='other')
    mutiple_choice = models.CharField(max_length=50,choices=mutiple_choice)
    status = models.BooleanField(default=False)
    audio = models.BinaryField()

class User(models.Model):
    username = models.CharField(max_length=25,primary_key=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=255) # allow if they allow
    profile = models.CharField(max_length=50,default='john doe')
    most_popular_words = models.ManyToManyField(most_popular_words,blank=True)
    category = models.ManyToManyField(question,blank=True)

    def __str__(self):
        return self.username
    


