from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import Message

import json 

def messages_view(request):
    incoming = Message.objects.filter(receiver = request.user)
    outgoing = Message.objects.filter(sender = request.user)

    data = {
        'incoming':incoming,
        'outgoing':outgoing
    }

    return render(request, 'main/message/messages.html', data)

def msg_view(request, msg_id):

    msg = Message.objects.filter(id = msg_id)[0]
    data = {
        "msg":msg
    }

    return render(request, 'main/message/msg.html', data)


def send_msg_view(request, user_id):

    target = User.objects.filter(id = user_id)[0]

    data = {
        "target": target
    }
    return render(request, 'main/message/send_msg.html', data)


def send_this_msg(request, user_id):
    key = None
    for x in request.POST.keys():
        key = x
    
    data = json.loads(key)

    my_msg = Message()
    my_msg.title = data["title"]
    my_msg.sender = request.user
    my_msg.receiver = User.objects.filter(id = user_id)[0]
    my_msg.msg = data["content"]
    my_msg.save()

    return messages_view(request)