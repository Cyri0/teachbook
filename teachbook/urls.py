"""teachbook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name='teachbook'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home-view'),
    path('registration', views.registration_view, name='registration-view'),
    path('logged_in', views.successful_registration_view, name='successful_registration_view'),
    path('login', views.login_view, name='login-view'),
    path('regularLogin', views.regularLogin, name='regularLogin'),
    path ('profile', views.profile_view, name='profileView'),
    path ('messages', views.messages_view, name='messagesView'),
    path ('logout', views.logout_view, name='logoutView'),
    path ('', include('blogposts.urls')),
    path('testPostRequest', views.testPostRequest, name='testPostRequest'),
    path('remove_post', views.remove_post, name='remove_post'),
    path('refreshSubject', views.refreshSubject, name='refreshSubject'),
    path('uploadProfilePics', views.uploadProfilePics, name='uploadProfilePics'),
    path('openUserProfile/<int:user_id>', views.openUserProfile, name='openUserProfile'),
    path('msg/<int:msg_id>', views.msg_view, name='msg'),
    path('send_msg/<int:user_id>', views.send_msg_view, name='send_msg'),
    path('send_this_msg/<int:user_id>', views.send_this_msg, name='send_this_msg'),
    path('sendLike', views.sendLike, name='sendLike')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)