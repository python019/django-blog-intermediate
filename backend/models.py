from django.db import models

class Category(models.Model):
    nomi = models.CharField(max_length=20)

    def __str__(self):
        return self.nomi


class Post(models.Model):
    nomi = models.CharField(max_length=20)
    rasm = models.ImageField(upload_to="rasmlar/")

    def __str__(self):
        return self.nomi
