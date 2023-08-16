from rest_framework.decorators import api_view
from django.http import JsonResponse
from wordcloud import WordCloud
from .models import Word
from datetime import datetime, timedelta
from collections import Counter
import base64




# Create your views here.
@api_view(['GET'])
def salvar_banco(request):
    requisicao= Word(word=request.GET.get('valor'),time=datetime.now())
    requisicao.save()
    return JsonResponse({'salvo' : True})

def convert2lowecase(list):
    output=[]
    for obj in list:
        output.append(obj.word.lower())
    return output

def gerar_imagem(word_freq):
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate_from_frequencies(word_freq) 
    wordcloud.to_file('wordcloud.png')
    with open("wordcloud.png", "rb") as f:
        encoded_image = base64.b64encode(f.read())
    return (encoded_image.decode("utf-8"))
    


def gerar_nuvem():
    dois_minutos=datetime.now() - timedelta(minutes=15)
    objects = Word.objects.filter(time__gte=dois_minutos)
    objetos_lower_case=convert2lowecase(objects)
    word_freq=Counter(objetos_lower_case)
    print(word_freq)
    return (gerar_imagem(word_freq))

@api_view(['GET'])
def send_nuvem(request):
    return JsonResponse({'image' : gerar_nuvem()})