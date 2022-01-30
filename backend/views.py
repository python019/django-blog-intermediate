from multiprocessing import context
from django.shortcuts import render
from .models import Post

def home(request):
    posts = Post.objects.all()
    context = {
       "posts": posts
    }
    return render(request, 'index.html', context)


def about(request):
    return render(request, 'about.html')

