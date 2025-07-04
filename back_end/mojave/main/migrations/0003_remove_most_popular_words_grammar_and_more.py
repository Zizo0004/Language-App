# Generated by Django 5.0.1 on 2025-06-20 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_rename_mutiple_choice_most_popular_words_answer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='most_popular_words',
            name='grammar',
        ),
        migrations.AddField(
            model_name='most_popular_words',
            name='other',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='most_popular_words',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='word_audio/'),
        ),
        migrations.AlterField(
            model_name='question',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='question_audio/'),
        ),
    ]
