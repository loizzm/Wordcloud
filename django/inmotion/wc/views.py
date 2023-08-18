from rest_framework.decorators import api_view
from django.http import JsonResponse
from wordcloud import WordCloud
from .models import Word, ImageField
from datetime import datetime, timedelta
from collections import Counter
from .serializers import ImageSerializer
from tempfile import NamedTemporaryFile




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

def gerar_imagem(word_freq, request):
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate_from_frequencies(word_freq) 
    temp_file = NamedTemporaryFile(delete=False, suffix='.png')
    wordcloud.to_file(temp_file.name)
    temp_file.close()
    temp_file_path = temp_file.name
    #wordcloud.to_file('wordcloud.png')
    wordcloud_instance = ImageField()
    wordcloud_instance.image.save('wordcloud.png', open(temp_file_path, 'rb'))
    wordcloud_instance.save()
    serializer = ImageSerializer(data=ImageField.objects.last(), context={"request": request})
    print(serializer.get_image_url(ImageField.objects.last()))
    return (serializer.get_image_url(ImageField.objects.last()))

def time_query(time):
    time_minutos=datetime.now() - timedelta(minutes=time)
    objects = Word.objects.filter(time__gte=time_minutos)
    return objects

def gerar_nuvem(request):
    objects= time_query(15)
    objetos_lower_case=convert2lowecase(objects)
    word_freq=Counter(objetos_lower_case)
    print(word_freq)
    return (gerar_imagem(word_freq,request))

@api_view(['GET'])
def send_nuvem(request):
    objects= time_query(15)
    if (len(objects)!=0):
        gerar_nuvem(request)
        return JsonResponse({"image" : gerar_nuvem(request)})
    else:
         return JsonResponse({'status' : "negado"})