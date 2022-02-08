from multiprocessing import context
from django.shortcuts import render
from .models import *

def home(request):
    posts = Post.objects.all()
    categories = Category.objects.all()
    context = {
       "posts": posts,
       'categories': categories
    }
    return render(request, 'index.html', context)


def about(request):
    return render(request, 'about.html')

