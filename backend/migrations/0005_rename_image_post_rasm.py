# Generated by Django 3.2 on 2022-02-03 03:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_rename_rasm_post_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='image',
            new_name='rasm',
        ),
    ]
