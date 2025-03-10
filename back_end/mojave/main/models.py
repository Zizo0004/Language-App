from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=255)
    def __str__(self):
        return self.username

