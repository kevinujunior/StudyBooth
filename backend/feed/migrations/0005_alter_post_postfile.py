# Generated by Django 3.2.8 on 2021-10-24 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feed', '0004_alter_post_postsection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='postFile',
            field=models.FileField(blank=True, null=True, upload_to='postFile'),
        ),
    ]