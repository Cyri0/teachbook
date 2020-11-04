from django.shortcuts import render
from teachbook import views
from django.contrib.auth.models import User
from subjects.models import SchoolSubject
from blogposts.models import BlogPost


# Create your views here.
def uploadProfilePics(request):
    
    if request.method == 'POST':
        print(request.POST)
        file_object = request.FILES['new_profile_pics']
        print(type(file_object))

        request.user.profile.image = file_object
        request.user.profile.save()
    
    return views.profile_view(request)

def openUserProfile(request, user_id):
    print(user_id)

    user = User.objects.filter(id = user_id)[0]
    print(user.username)
    subjects = SchoolSubject.objects.order_by('id')
    subjects = list(subjects)

    user_posts = BlogPost.objects.filter(post_author = user.id)

    data = {
        'seen_user':user,
        'subject_list':subjects,
        'user_posts':user_posts
    }

    return render(request, 'main/profile/user_profile.html', data)
