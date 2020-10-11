from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login

def home_view(request):
    return render(request, 'main/landing.html')

def registration_view(request):
    data = {
        'isUsernameUsed':False,
        'lastUsername':'',
        'lastEmail':''
    }
    return render(request, 'registration/reg.html',data)

def regularLogin(request):

    user = authenticate(request, username=request.POST['name'], password=request.POST['password'])
    
    if user is not None:
        try:
            login(request, user)
            print("Sikeres login!")
            print("Bejelentkezett user neve:" + request.user.username)
            
            data = {
            'name':request.user.username
            }
            return render (request, 'main/main.html', data)

        except:
            print("Sikertelen login...")
            return render (request, 'login/login.html')
    else:
        print("Sikertelen autentikáció...")

def loginAfterRegistration(registrationData,request):
    user = authenticate(request, username=registrationData["name"], password=registrationData["password"])
    if user is not None:
        login(request, user)
        print("Sikeres login!")
        print("Bejelentkezett user neve:")
        username = None
        
        #if request.user.is_authenticated():
        username = request.user.username
        email = request.user.email
        print(username)
        print(email)
        
        return True
    else:
        print("Sikertelen login...")
        return False

def logout(request):
    logout(request)

def successful_registration_view(request):
    registrationData = {
        'name' : request.POST['name'],
        'email' : request.POST['email'],
        'password' : request.POST['password']
    }
      
    print (registrationData)

    if(registration_try(registrationData, request)):
        return render (request, 'main/main.html')
    else:
        print("Foglalt user name!")
        data = {
        'isUsernameUsed':True,
        'lastUsername':registrationData["name"],
        'lastEmail':registrationData["email"]
        } 
        return render (request, 'registration/reg.html', data)

def registration_try(registrationData, request):
    print("Regisztráció próba kezdődik...")
    user = User.objects.create_user(username=registrationData["name"], email=registrationData["email"], password=registrationData["password"])

    print("Adat beírva az adatbázisba.")

    return loginAfterRegistration(registrationData, request)

def login_view(request):
    return render(request, 'login/login.html')

def profile_view(request):
    return render(request, 'main/menu/profile.html')

def settings_view(request):
    return render(request, 'main/menu/settings.html')

def home_view(request):
    return render (request, 'main/main.html')