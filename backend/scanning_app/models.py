from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import ValidationError
from django.utils.translation import gettext_lazy as _
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

    def is_client(self):
        return self.type == "Cl"

    def is_admin(self):
        return self.type == "Ra"

    def is_super_admin(self):
        return self.type == "Sa"

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class UnacceptedClient(models.Model):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    password = models.CharField(_('password'), max_length=128)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), blank=True)
    phone = PhoneNumberField()
    address = models.CharField(null=True, max_length=255)
    business_data = models.CharField(null=True, max_length=255)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        # filter app users for same username
        app_user_same_username = AppUser.objects \
            .filter(username__exact=self.username)
        # if one exists, username is not unique
        if app_user_same_username.exists():
            raise ValidationError({
                "username": ["Not a unique username"]
            })
        super(UnacceptedClient, self)\
            .save(force_insert, force_update, using, update_fields)


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
