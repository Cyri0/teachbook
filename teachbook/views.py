from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from blogposts.models import BlogPost
from subjects.models import SchoolSubject
from messageSender.views import *
from blogposts.views import *
from profileHandler.views import *
from django.core.mail import send_mail

import json 



def home_view(request):
    if(len(request.user.username) == 0):
        return render(request, 'main/landing.html')
    else:
        posts = []

        for sub_id in request.user.profile.subjects.split("|"):        
            test = BlogPost.objects.filter(post_subject = sub_id)
            posts = posts + (list(test))

        users = User.objects.order_by('id')
        users = list(users)
        subjects = SchoolSubject.objects.order_by('id')
        subjects = list(subjects)
        context = {'posts' : posts, 'users':users, 'subjects':subjects}
        
        return render(request, 'main/main.html', context)



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
            print("Sikeres login!\nBejelentkezett user neve:" + request.user.username)
            return redirect('/')

        except:
            print("Sikertelen login...")
            message = {
            'error_msg':'Hibás felhasználónév vagy jelszó!'
            }
            return render (request, 'login/login.html', message)
    else:
        print("Sikertelen autentikáció...")
        message = {
            'error_msg':'Hibás felhasználónév vagy jelszó!'
        }
        return render (request, 'login/login.html', message)



def loginAfterRegistration(registrationData,request):

    user = authenticate(request, username=registrationData["name"], password=registrationData["password"])
    if user is not None:
        login(request, user)
        print("Sikeres login!\nBejelentkezett user neve:")
        username = None
        username = request.user.username
        email = request.user.email

        return True
    else:
        print("Sikertelen login...")
        return False



def logout_view(request):
    logout(request)
    return render(request, 'main/landing.html')



def successful_registration_view(request):
    registrationData = {
        'name' : request.POST['name'],
        'email' : request.POST['email'],
        'password' : request.POST['password']
    }

    if(registration_try(registrationData, request)):
        return redirect('/')
    else:
        print("Foglalt user name!")
        data = {
        'isUsernameUsed':True,
        'lastUsername':registrationData["name"],
        'lastEmail':registrationData["email"]
        } 
        return render (request, 'registration/reg.html', data)



def registration_try(registrationData, request):
    try:
        user = User.objects.create_user(username=registrationData["name"], email=registrationData["email"], password=registrationData["password"])
    except :
        return False

    return loginAfterRegistration(registrationData, request)



def login_view(request):
    return render(request, 'login/login.html')



def profile_view(request):

    posts = BlogPost.objects.filter(post_author=request.user.id)
    posts = reversed(list(posts))
    subjects = SchoolSubject.objects.order_by('id')
    subjects = list(subjects)

    data = {
        "picture": request.user.profile.image.url,
        "posts": posts,
        "subjects": subjects
    }
    return render(request, 'main/menu/profile.html', data)



def refreshSubject(request):
    key = None
    for x in request.POST.keys():
        key = x
        
    profile = request.user.profile
    profile.subjects = key
    profile.save()
    print(profile)

    return profile_view(request)