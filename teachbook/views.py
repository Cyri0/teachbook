from django.http import HttpResponse
from django.shortcuts import render

def home_view(request):
    return render(request, 'main/landing.html')

def registration_view(request):
    return render(request, 'registration/reg.html')

def successful_registration_view(request):
    registrationData = {
        'name' : request.POST['name'],
        'email' : request.POST['email'],
        'password' : request.POST['password']
    }

    print (registrationData)

    return render (request, 'registration/success.html', registrationData)