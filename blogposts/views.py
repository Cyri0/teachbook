from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from .models import BlogPost

# Create your views here.
@require_POST
def addNewPost(request):
    # form = PostTitleForm(request.POST)
    print("MEGHÍVVA!")
    # print(request.POST['post_title'])
    # print(form)

    return redirect('home_view')