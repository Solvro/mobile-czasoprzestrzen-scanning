# Generated by Django 2.1.5 on 2019-01-28 17:40

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('email', models.EmailField(max_length=254)),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128)),
                ('address', models.CharField(max_length=255, null=True)),
                ('business_data', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=400)),
                ('status', models.BooleanField()),
                ('type', models.CharField(choices=[('Mic', 'Microphone'), ('Gui', 'Guitar'), ('Spe', 'Speakers')], max_length=64)),
                ('max_rent_time', models.DurationField()),
            ],
        ),
        migrations.CreateModel(
            name='RentalInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rental_date', models.DateField(auto_now=True)),
                ('expected_return', models.DateField()),
                ('actual_return', models.DateField(null=True)),
                ('client_data_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='scanning_app.Client')),
                ('equipment_data_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='scanning_app.Equipment')),
            ],
        ),
    ]