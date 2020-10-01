from django.http import HttpResponse
from django.shortcuts import render

def home_view(request):
    return render(request, 'main/home.html')

def registration_view(request):
    return render(request, 'registration/reg.html')