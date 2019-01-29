from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

TYPE = (
    ("Mic", "Microphone"),
    ("Gui", "Guitar"),
    ("Spe", "Speakers"),

)


class Client(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField()
    phone = PhoneNumberField()
    address = models.CharField(null=True, max_length=255)
    business_data = models.CharField(null=True, max_length=255)

    def __str__(self):
        return "{}".format(self.first_name)


class Equipment(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=400)
    status = models.BooleanField()
    type = models.CharField(choices=TYPE, max_length=64)
    max_rent_time = models.DurationField()

    def __str__(self):
        return "{}".format(self.name)


class RentalInfo(models.Model):
    rental_date = models.DateField(auto_now=True)
    expected_return = models.DateField()
    actual_return = models.DateField(null=True)
    equipment_data_id = models.ForeignKey(Equipment, on_delete=models.DO_NOTHING)
    client_data_id = models.ForeignKey(Client, on_delete=models.DO_NOTHING)

    def __str__(self):
        return "{}".format(self.rental_date)
