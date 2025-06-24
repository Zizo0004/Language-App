
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

database = pd.read_csv('C:/Users/Ziyad/Desktop/Backend/Language-App/back_end/mojave/main/database.csv')
words = models.most_popular_words.objects.all()
first_word = database.iloc[0]



from elevenlabs import ElevenLabs 

client = ElevenLabs(
    api_key="sk_c6e5ea7c08229803980cfb0281dfc231ae1030f61bf58aab", 
)

output = client.text_to_speech.convert(
    voice_id="UgBBYS2sOqTuMpoF3BR0",
    output_format="mp3_44100_128",
    text="قَلِيل",
    model_id="eleven_multilingual_v2",
)
current_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(current_dir, "my_audio.mp3")

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



"""try:
    with open('C:/Users/Ziyad/Downloads/output_filename.mp3', "wb") as f:
        for audio_chunk in output:
            if audio_chunk: 
                f.write(audio_chunk) 
    
    print(f"Audio successfully saved")

except Exception as e:
    print(f"An error occurred while saving the audio: {e}")"""
