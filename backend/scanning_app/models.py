from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

TYPE = (
    ("Mic", "Microphone"),
    ("Gui", "Guitar"),
    ("Spe", "Speakers"),

)

USER_TYPE = (
    ("Cl", "Client"),
    ("Ra", "Regular Administrator"),
    ("Sa", "Super Administrator"),
)


class AppUser(AbstractUser):
    phone = PhoneNumberField()
    address = models.CharField(null=True, max_length=255)
    business_data = models.CharField(null=True, max_length=255)
    type = models.CharField(max_length=2, choices=USER_TYPE, default="Cl")

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Equipment(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=400)
    available = models.BooleanField(default=False)
    type = models.CharField(choices=TYPE, max_length=64)
    max_rent_time = models.DurationField()

    def __str__(self):
        return "{}".format(self.name)


class RentalInfo(models.Model):
    rental_date = models.DateField(auto_now=True)
    expected_return = models.DateField()
    actual_return = models.DateField(null=True)
    equipment_data = models.ForeignKey(Equipment, on_delete=models.DO_NOTHING)
    client_data = models.ForeignKey(AppUser, on_delete=models.DO_NOTHING)

    def __str__(self):
        return "{}".format(self.rental_date)
