from django.db import models
from datetime import datetime

class Word(models.Model):
    word = models.CharField(max_length=200, default='')
    time =  models.DateTimeField(default=datetime.now())
    
    def __str__(self):
        return self.word
# Create your models here.
