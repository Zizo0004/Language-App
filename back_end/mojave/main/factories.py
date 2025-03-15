from factory.django import DjangoModelFactory
from .models import *
import factory
from faker import Faker 
from faker.providers import BaseProvider

# Test data. modular and easily reusable

class QuestionProvider(BaseProvider):
    def category(self):
        return self.random_element(['business','culture','food','hospital','banking','job culture','conversation','questions'])
    def audio(self):
        filename = self.random_element(['audio1.mp3','audio2.mp3','audio3.mp3','audio4.mp4'])  
        return filename.encode('utf-8')  
    
faker = Faker()
faker.add_provider(QuestionProvider)

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
    username = factory.Faker('user_name')
    email =  factory.Faker('email')
    password = factory.Faker('password')
    location = factory.Faker('country')

class QuestionFactory(DjangoModelFactory):
    class Meta:
        model = question

    description = factory.LazyAttribute(lambda _: faker.sentence() + '?')    
    translated_description = factory.Faker('sentence')
    mutiple_choice = factory.Faker('random_element',elements=('A','B','C','D'))
    audio = factory.LazyAttribute(lambda _: faker.audio())
    category = factory.LazyAttribute(lambda _: faker.category())

class MostPopularWordsFactory(DjangoModelFactory):
    class Meta:
        model = most_popular_words
    word = factory.Faker('word')
    translation = factory.Faker('word')
    grammar = factory.Faker('word')
    mutiple_choice = factory.Faker('random_element',elements=('A','B','C','D'))
    audio = factory.LazyAttribute(lambda _: faker.audio())
