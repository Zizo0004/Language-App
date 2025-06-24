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
import csv
from main import models
from django.core.files.base import ContentFile
from elevenlabs import ElevenLabs 

from dotenv import load_dotenv
import environ
load_dotenv()
api = os.getenv("ELEVENLABS_API")



database = pd.read_csv('C:/Users/Ziyad/Desktop/Backend/Language-App/back_end/mojave/main/database.csv')
words = models.most_popular_words.objects.all()
first_word = database.iloc[0]




client = ElevenLabs(
    api_key=api, 
)

output = client.text_to_speech.convert(
    voice_id="UgBBYS2sOqTuMpoF3BR0",
    output_format="mp3_44100_128",
    text="قَلِيل",
    model_id="eleven_multilingual_v2",
)

for i in range(len(words)):
audio = io.BytesIO()

for audio_chunk in output:
    if audio_chunk:
        audio.write(audio_chunk)

models.most_popular_words.objects.create(
    word="قَلِيل",
    translation="little",
    answer="A",
    status=True,
    other="قَلِيل",
    audio=ContentFile(audio.getvalue(), name="my_audio.mp3"),
)

print(models.most_popular_words.objects.all())
