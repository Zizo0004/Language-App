# Generated by Django 5.0.1 on 2025-03-21 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='most_popular_words',
            old_name='mutiple_choice',
            new_name='answer',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='mutiple_choice',
            new_name='answer',
        ),
        migrations.AddField(
            model_name='most_popular_words',
            name='status',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='location',
            field=models.CharField(default='earth', max_length=255),
        ),
    ]
