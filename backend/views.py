from django.shortcuts import render

def home(request):
    return render(request, 'blog/index.html')
