from multiprocessing import context
from django.shortcuts import render
from .models import *

def home(request):

    category = request.GET.get('category')
    
    if category == None:
        posts = Post.objects.all()
    else:
        posts = Post.objects.filter(category__name=category)


    categories = Category.objects.all()
    context = {
       "posts": posts,
       'categories': categories
    }
    return render(request, 'index.html', context)


def about(request):
    return render(request, 'about.html')

