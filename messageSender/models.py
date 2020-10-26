from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Message(models.Model):
    title = models.CharField(max_length=50)
    sender = models.ForeignKey(User, related_name='user_sent_msgs', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='user_received_msgs', on_delete=models.CASCADE)
    msg = models.TextField()
    date = models.DateTimeField(auto_now=False, auto_now_add=True)
    
    def __str__(self):
        #date_text = self.date.stftime("%Y-%m-%d %H:%M:%S")
        date_text = "(" + str(self.date.strftime("%Y-%m-%d %H:%M:%S")) + ")"
        return self.sender.username + " -> " + self.receiver.username + " " + date_text