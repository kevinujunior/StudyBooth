# Generated by Django 3.2.8 on 2021-10-24 03:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feed', '0003_alter_post_postsection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='postSection',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='feed.section'),
        ),
    ]