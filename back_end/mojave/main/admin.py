from django.contrib import admin
# Register your models here.
from .models import *
#admin.site.register(User)
admin.site.register(question)
admin.site.register(most_popular_words)

