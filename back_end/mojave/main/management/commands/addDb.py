from main.factories import *
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.stdout.write('hacking the mainframe...')
        user_data = UserFactory.create_batch(10)
        self.stdout.write('bypassing the firewall...')
        most_popular_words_data = MostPopularWordsFactory.create_batch(10)
        self.stdout.write('We are in!!!')
        question_data = QuestionFactory.create_batch(10)
        self.stdout.write('decoding the encoder')
        
        
