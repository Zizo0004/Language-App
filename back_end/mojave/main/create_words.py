"""
This script will create the single words database including the audio using elevenlabs api
Change accorindly

"""

import os,io
import django
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mojave.settings")
django.setup()
import pandas as pd
import csv,re
from main import models
from django.core.files.base import ContentFile
from elevenlabs import ElevenLabs 
from dotenv import load_dotenv
import environ
load_dotenv()
api = os.getenv("ELEVENLABS_API")



database = pd.read_csv('C:/Users/Ziyad/Desktop/Backend/Language-App/back_end/mojave/main/database.csv')
client = ElevenLabs(
    api_key=api, 
)

def remove_harakat(text):
    harakat_pattern = re.compile(r'[\u0610-\u061A\u064B-\u065F\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]')
    return harakat_pattern.sub('', text)


for i in range(len(database)):
    words = models.most_popular_words.objects.all().values_list('word',flat=True)
    current_word = database.iloc[i]
    removed_harakat = remove_harakat(current_word['Word'])
    word_exists = False
    
    for i in words:
        if remove_harakat(i) == removed_harakat:
            print(f"{current_word['Word']} already exists")
            word_exists = True
            break
    if word_exists == False:
            audio = io.BytesIO()
            output = client.text_to_speech.convert(
            voice_id="UgBBYS2sOqTuMpoF3BR0",
            output_format="mp3_44100_128",
            text=current_word['Word'],
            model_id="eleven_multilingual_v2", 
            )


            for audio_chunk in output:
                if audio_chunk:
                    audio.write(audio_chunk)
            print(f"{current_word['Word']} created", i)

            models.most_popular_words.objects.create(
                word=current_word['Word'],
                translation=current_word['Translation'],
                status=False,
                other=current_word['Other'],
                audio=ContentFile(audio.getvalue(), name=f"{current_word['Word']}.mp3"), 
            )


