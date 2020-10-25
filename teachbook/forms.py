from django import forms
from profileHandler.models import Profile


class ImageForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('title', 'image')