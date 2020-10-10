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
    

    # IDE JÖN AZ AMIKOR BEÍRJUK AZ ADATBÁZISBA AZ ÚJ USER ADATAIT
    print (registrationData)

    return render (request, 'main/main.html', registrationData)

def login(request):
    return render (request, '')