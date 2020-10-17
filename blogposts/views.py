from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from .models import BlogPost
from .forms import PostTitleForm

# Create your views here.
@require_POST
def addNewPost(request):
    form = PostTitleForm(request.POST)
    # if form.is_valid():
        # new_todo = PostTitleForm(post_title=request.POST[''])
        # new_todo.save()
    print("MEGHÍVVA!")
    print(request.POST['post_title'])

    return redirect('main/main.html')