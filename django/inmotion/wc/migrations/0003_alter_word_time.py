# Generated by Django 4.2.3 on 2023-08-14 01:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wc', '0002_word_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2023, 8, 14, 1, 53, 36, 717775), verbose_name='time'),
        ),
    ]