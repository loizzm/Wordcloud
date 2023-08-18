from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
    path('wordcloud/', views.salvar_banco),
    path('cloud/', views.send_nuvem)
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)