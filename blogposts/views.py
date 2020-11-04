from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from .models import BlogPost
from teachbook.views import *
import json 

@require_POST
def addNewPost(request):
    print("MEGHÍVVA!")

    return redirect('home_view')

def sendLike(request):
    post_json = None 
    for x in request.POST.keys():
        post_json = x
    post_dict = json.loads(post_json)

    post = BlogPost.objects.filter(id = post_dict["post_id"])[0]

    likers_json = json.loads(post.likers)

    if request.user.id in likers_json["data"]:
        likers_json["data"].remove(request.user.id)
        print(likers_json["data"])        

        post.likers = json.dumps(likers_json)
        post.likes = post.likes - 1
    else:
        likers_json["data"].append(request.user.id)
        print(likers_json["data"])        

        post.likers = json.dumps(likers_json)
        post.likes = post.likes + 1

    post.save()

    return redirect("/")

def remove_post(request):
    key = None
    for x in request.POST.keys():
        key = x

    BlogPost.objects.filter(id = key).delete();
    return profile_view(request) 

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

def getUploadedFile(request):
    print("File:")
    print(request.FILES['file'])
    posts = BlogPost.objects.filter(post_author=request.user.id)
    posts = list(posts)
    post = posts[-1]
    post.file = request.FILES['file']
    post.save()
    return redirect("/")