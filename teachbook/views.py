from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from blogposts.models import BlogPost
import json 

def home_view(request):
    if(len(request.user.username) == 0):
        return render(request, 'main/landing.html')
    else:
        print('\n\n nt:' +str(request.user.id) + '\n\n')
        posts = BlogPost.objects.order_by('id')
        posts = reversed(list(posts))
        context = {'posts' : posts}
        
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
        print(username)
        print(email)

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
        # return render (request, 'main/main.html')
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
    data = {
        "picture": "/media/"+str(request.user.profile.image)
    }
    return render(request, 'main/menu/profile.html', data)

def settings_view(request):
    return render(request, 'main/menu/settings.html')

def testPostRequest(request):
    print("Eredmény:")
    post_json = None
     
    for x in request.POST.keys():
        post_json = x

    post_dict = json.loads(post_json) 
    print(post_dict)

    new_post = BlogPost(
        post_author = post_dict["user_id"],
        post_content = post_dict["content"],
        post_subject = post_dict["subject"],
        post_title = post_dict["title"],
        likes = 0
        )

    new_post.save()
    return redirect("/")