from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.test import TestCase
import datetime

from scanning_app.models import AppUser, UnacceptedClient, Address, \
    BusinessInfo, Equipment, TypeOfEquipment


class AppUserTestCase(TestCase):
    def setUp(self):
        self.client = AppUser(first_name="Marcel",
                              last_name="Krakowiak",
                              email="marcel.k@onet.eu",
                              phone="793381442")

    def test_model_create_client(self):
        initial_number_of_clients = AppUser.objects.count()
        self.client.save()
        after_saving_number_of_clients = AppUser.objects.count()
        self.assertEqual(
            initial_number_of_clients + 1,
            after_saving_number_of_clients
        )

    def test_client_deleted_address_and_business_info_deleted(self):
        address = Address.objects.create(street="Ulica 12/13",
                                         zip_code="50-330",
                                         city="Wroclaw")
        business_info = BusinessInfo.objects.create(nip="725-18-01-126",
                                                    regon="472836141")
        client = AppUser.objects.create_user(username=USERNAME,
                                             password="pass",
                                             email="example@email.com",
                                             phone="+48732288410",
                                             address=address,
                                             business_data=business_info)
        client.delete()
        self.assertFalse(UnacceptedClient.objects.exists())
        self.assertFalse(Address.objects.exists())
        self.assertFalse(BusinessInfo.objects.exists())

    def test_email_duplicate_Integrity_Error_raised(self):
        AppUser.objects.create_user(username="username",
                                    email="example@email.com",
                                    password="pass",
                                    phone="+48732288410")
        try:
            AppUser.objects.create_user(username="username",
                                        email="example@email.com",
                                        password="pass",
                                        phone="+48732288410")
            self.fail('Duplicate email allowed')
        except IntegrityError:
            pass


USERNAME = "username"


class UnacceptedClientTests(TestCase):

    def test_unique_username_passed_obj_created(self):
        AppUser.objects.create_user(username=USERNAME,
                                    email="example@email.com",
                                    password="pass",
                                    phone="+48732288410")
        self.assertEqual(AppUser.objects.count(), 1)
        UnacceptedClient.objects.create(username="diff username",
                                        email="example2@email.com",
                                        password="other pass",
                                        phone="+48732450112")
        self.assertEqual(UnacceptedClient.objects.count(), 1)

    def test_username_in_appuser_passed_validation_error_raised(self):
        AppUser.objects.create_user(username=USERNAME,
                                    email="example@email.com",
                                    password="pass",
                                    phone="+48732288410")
        self.assertEqual(AppUser.objects.count(), 1)
        self.assertRaises(ValidationError, UnacceptedClient.objects.create,
                          username=USERNAME, email="example2@email.com",
                          password="other pass",
                          phone="+48732450112")
        self.assertEqual(UnacceptedClient.objects.count(), 0)

    def test_email_in_appuser_passed_validation_error_raised(self):
        AppUser.objects.create_user(username=USERNAME,
                                    email="example@email.com",
                                    password="pass",
                                    phone="+48732288410")
        self.assertEqual(AppUser.objects.count(), 1)
        self.assertRaises(ValidationError, UnacceptedClient.objects.create,
                          username="diff name", email="example@email.com",
                          password="other pass",
                          phone="+48732450112")
        self.assertEqual(UnacceptedClient.objects.count(), 0)

    def test_client_deleted_address_and_business_info_deleted(self):
        address = Address.objects.create(street="Ulica 12/13",
                                         zip_code="50-330",
                                         city="Wroclaw")
        business_info = BusinessInfo.objects.create(nip="725-18-01-126",
                                                    regon="472836141")
        client = UnacceptedClient.objects.create(username=USERNAME,
                                                 password="pass",
                                                 email="example@email.com",
                                                 phone="+48732288410",
                                                 address=address,
                                                 business_data=business_info)
        client.delete()
        self.assertFalse(UnacceptedClient.objects.exists())
        self.assertFalse(Address.objects.exists())
        self.assertFalse(BusinessInfo.objects.exists())

    def test_acceptation_doesnt_loose_address_and_business_info(self):
        address = Address.objects.create(street="Ulica 12/13",
                                         zip_code="50-330",
                                         city="Wroclaw")
        business_info = BusinessInfo.objects.create(nip="725-18-01-126",
                                                    regon="472836141")
        client = UnacceptedClient.objects.create(username=USERNAME,
                                                 password="pass",
                                                 email="example@email.com",
                                                 phone="+48732288410",
                                                 address=address,
                                                 business_data=business_info)
        accepted_client = client.accept()
        self.assertEqual(accepted_client.address.street, client.address.street)
        self.assertEqual(accepted_client.business_data.nip,
                         client.business_data.nip)


class AddressTests(TestCase):
    def test_valid_zip_code_passes(self):
        valid_zip_code = "50-330"
        Address.zip_code_validator(valid_zip_code)

    def test_invalid_zip_code_raises_validation_error(self):
        invalid_zip_code = "5-33"
        self.assertRaises(ValidationError,
                          Address.zip_code_validator,
                          invalid_zip_code)


class BusinessInfoTests(TestCase):
    def test_valid_nip_passes(self):
        valid_nip = "725-18-01-126"
        BusinessInfo.nip_validator(valid_nip)

    def test_invalid_nip_doesnt_pass(self):
        invalid_nip = "725-1-801-126"
        self.assertRaises(ValidationError,
                          BusinessInfo.nip_validator,
                          invalid_nip)

    def test_valid_regon_passes(self):
        valid_regon = "472836141"
        BusinessInfo.regon_validator(valid_regon)

    def test_invalid_regon_doesnt_pass(self):
        invalid_regon = "47283614"
        self.assertRaises(ValidationError,
                          BusinessInfo.regon_validator,
                          invalid_regon)


class TypeOfEquipmentTests(TestCase):
    def setUp(self):
        self.type = TypeOfEquipment(type_name="Mikro")
        self.type.save()
        self.equipment = Equipment(name="Mikrofon",
                                   description="Makes you louder",
                                   available=True,
                                   max_rent_time=datetime.timedelta(days=3),
                                   type=self.type)

    def test_equipment_exist_with_out_type(self):
        self.equipment.save()
        self.assertEqual(Equipment.objects.count(), 1)
        self.assertIsNotNone(Equipment.objects.get(name="Mikrofon").type)
        TypeOfEquipment.objects.all().delete()
        self.assertIsNone(Equipment.objects.get(name="Mikrofon").type)
