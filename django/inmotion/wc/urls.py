from django.urls import path
from . import views


urlpatterns =[
    path('wordcloud/', views.salvar_banco),
    path('cloud/', views.send_nuvem)
] 