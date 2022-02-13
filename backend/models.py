from django.db import models

class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


    name = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=20, null=True, blank=True)
    image = models.ImageField(upload_to="rasmlar/", null=True, blank=True)


    def __str__(self):
        return self.name
