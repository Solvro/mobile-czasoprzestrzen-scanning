from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import ValidationError, RegexValidator
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

USER_TYPE = (
    ("Cl", "Client"),
    ("Ra", "Regular Administrator"),
    ("Sa", "Super Administrator"),
)


class Address(models.Model):
    zip_code_validator = RegexValidator(r'^\d{2}-\d{3}$',
                                        "Zip code doesn't comply")

    street = models.CharField(max_length=128)
    zip_code = models.CharField(max_length=6, validators=[zip_code_validator])
    city = models.CharField(max_length=32)


class BusinessInfo(models.Model):
    nip_validator = RegexValidator(
        r'^[0-9]{10}$',
        "Nip doesn't comply"
    )
    regon_validator = RegexValidator(
        r'^[0-9]{9}$',
        "Regon doesn't comply"
    )

    nip = models.CharField(max_length=13, validators=[nip_validator])
    regon = models.CharField(max_length=9, validators=[regon_validator])
    name = models.CharField(max_length=64)


class TypeOfEquipment(models.Model):
    type_name = models.CharField(max_length=255, unique=True)


class AppUser(AbstractUser):
    email = models.EmailField(_('email address'), null=False, unique=True)
    phone = PhoneNumberField()
    address = models.OneToOneField(Address, null=True,
                                   on_delete=models.SET_NULL)
    business_data = models.OneToOneField(BusinessInfo, null=True,
                                         on_delete=models.SET_NULL)
    type = models.CharField(max_length=2, choices=USER_TYPE, default="Cl")

    def delete(self, using=None, keep_parents=False):
        if self.address is not None:
            self.address.delete()
        if self.business_data is not None:
            self.business_data.delete()
        return super().delete(using, keep_parents)

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
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'
        ),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    password = models.CharField(_('password'), max_length=128)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), null=False, unique=True)
    phone = PhoneNumberField()
    address = models.OneToOneField(Address, null=True,
                                   on_delete=models.SET_NULL)
    business_data = models.OneToOneField(BusinessInfo, null=True,
                                         on_delete=models.SET_NULL)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        # filter app users for same username
        app_user_same_username = AppUser.objects \
            .filter(username__iexact=self.username)
        # if any exists, username is not unique
        if app_user_same_username.exists():
            raise ValidationError({
                "username": ["Not a unique username"]
            })

        # filter app users for same email
        app_user_same_email = AppUser.objects \
            .filter(email__iexact=self.email)
        # if any exists, email is not unique
        if app_user_same_email.exists():
            raise ValidationError({
                "email": ["Not a unique email"]
            })

        super(UnacceptedClient, self) \
            .save(force_insert, force_update, using, update_fields)

    def delete(self, using=None, keep_parents=False):
        if self.address is not None:
            self.address.delete()
        if self.business_data is not None:
            self.business_data.delete()
        return super().delete(using, keep_parents)

    def accept(self):
        address = self.address
        business_data = self.business_data
        self.delete()
        if address is not None:
            address.save()
        if business_data is not None:
            business_data.save()
        return AppUser.objects.create(
            username=self.username,
            password=self.password,
            first_name=self.first_name,
            last_name=self.last_name,
            email=self.email,
            phone=self.phone,
            address=address,
            business_data=business_data,
            type="Cl",
            is_active=True
        )


class Equipment(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=400)
    available = models.BooleanField(default=True)
    max_rent_time = models.IntegerField()
    photo_url = models.CharField(max_length=400, null=True)
    type = models.ForeignKey(TypeOfEquipment, on_delete=models.SET_NULL,
                             null=True)

    def __str__(self):
        return "{}".format(self.name)


class RentalInfo(models.Model):
    rental_date = models.DateField(auto_now=True)
    expected_return = models.DateField()
    actual_return = models.DateField(null=True)
    equipment_data = models.ForeignKey(Equipment, on_delete=models.SET_NULL,
                                       null=True)
    client_data = models.ForeignKey(AppUser, on_delete=models.SET_NULL,
                                    null=True)

    def __str__(self):
        return "{}".format(self.rental_date)
