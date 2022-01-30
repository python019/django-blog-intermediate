from django.db import models


class Post(models.Model):
    nomi = models.CharField(max_length=20)
    
    def __str__(self):
        return self.nomi
