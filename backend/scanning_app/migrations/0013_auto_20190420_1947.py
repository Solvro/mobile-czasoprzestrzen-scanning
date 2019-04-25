# Generated by Django 2.1.5 on 2019-04-20 19:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scanning_app', '0012_auto_20190420_1418'),
    ]

    operations = [
        migrations.AlterField(
            model_name='businessinfo',
            name='nip',
            field=models.CharField(max_length=13, validators=[django.core.validators.RegexValidator('^[0-9]{10}$', "Nip doesn't comply")]),
        ),
        migrations.AlterField(
            model_name='businessinfo',
            name='regon',
            field=models.CharField(max_length=9, validators=[django.core.validators.RegexValidator('^[0-9]{9}$', "Regon doesn't comply")]),
        ),
    ]
