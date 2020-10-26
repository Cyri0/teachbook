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