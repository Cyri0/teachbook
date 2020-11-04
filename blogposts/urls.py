from django.urls import path
from . import views


urlpatterns = [
    path('addNewPost', views.addNewPost, name='addNewPost'),
    path('getUploadedFile', views.getUploadedFile, name="getUploadedFile")
]
