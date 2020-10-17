from django import forms

class PostTitleForm(forms.Form):
    title = forms.CharField(max_length=30,
    widget = forms.TextInput(
        attrs={
            'type' : 'text',
            'id' : 'post_title',
            'placeholder' : 'Add meg a címet!',
            'name' : 'post_title'
        }
    ))