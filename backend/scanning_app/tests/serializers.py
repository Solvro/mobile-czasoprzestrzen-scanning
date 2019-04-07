import datetime
from django.test import TestCase

from scanning_app.models import Equipment, AppUser, RentalInfo, \
    UnacceptedClient, TypeOfEquipment
from scanning_app.serializers import RentalInfoSerializer, \
    EquipmentSerializer, SignUpUnacceptedClientSerializer, ClientSerializer



CLIENT_USERNAME = "username"
CLIENT_PASSWORD = "pass"
CLIENT_FIRST_NAME = "first"
CLIENT_LAST_NAME = "last"
CLIENT_EMAIL = "mail@mail.com"
CLIENT_PHONE = "+48723124589"
CLIENT_ADDRESS = "Adress"
CLIENT_BUSINESS_INFO = "Bussiness info"
CLIENT_DATA = {
    "username": CLIENT_USERNAME,
    "password": CLIENT_PASSWORD,
    "first_name": CLIENT_FIRST_NAME,
    "last_name": CLIENT_LAST_NAME,
    "email": CLIENT_EMAIL,
    "phone": CLIENT_PHONE
}
TYPE_NAME = "Microphone"

EQUIPMENT_NAME = "Name"
EQUIPMENT_DESCRIPTION = "description"
EQUIPMENT_TYPE = {
    "type_name": TYPE_NAME
}
EQUIPMENT_MAX_RENT_TIME = datetime.timedelta(days=3)
EQUIPMENT_DATA = {
    "name": EQUIPMENT_NAME,
    "description": EQUIPMENT_DESCRIPTION,
    "max_rent_time": EQUIPMENT_MAX_RENT_TIME
}


class SignUpClientSerializerTests(TestCase):

    def create_and_check_basic_client(self, client_data):
        ser = SignUpUnacceptedClientSerializer(data=client_data)
        self.assertTrue(ser.is_valid())
        ser.save()
        self.assertEqual(UnacceptedClient.objects.count(), 1)
        saved = UnacceptedClient.objects.get()
        self.assertEqual(saved.username, CLIENT_USERNAME)
        self.assertIsNotNone(saved.password)
        self.assertEqual(saved.first_name, CLIENT_FIRST_NAME)
        self.assertEqual(saved.last_name, CLIENT_LAST_NAME)
        self.assertEqual(saved.email, CLIENT_EMAIL)
        self.assertEqual(saved.phone, CLIENT_PHONE)
        return saved

    def test_proper_full_client_data_passed_is_valid(self):
        data = CLIENT_DATA.copy()
        data['address'] = CLIENT_ADDRESS
        data['business_data'] = CLIENT_BUSINESS_INFO
        saved = self.create_and_check_basic_client(data)
        self.assertEqual(saved.address, CLIENT_ADDRESS)
        self.assertEqual(saved.business_data, CLIENT_BUSINESS_INFO)

    def test_proper_partial_client_data_passed_is_valid(self):
        data = CLIENT_DATA
        self.create_and_check_basic_client(data)

    def test_client_data_without_password_passed_is_invalid(self):
        data = CLIENT_DATA.copy()
        del data['password']
        ser = SignUpUnacceptedClientSerializer(data=data)

        self.assertFalse(ser.is_valid())

    def test_client_data_without_username_passed_is_invalid(self):
        data = CLIENT_DATA.copy()
        del data['username']
        ser = SignUpUnacceptedClientSerializer(data=data)

        self.assertFalse(ser.is_valid())


class ClientSerializerTests(TestCase):

    def test_client_obj_passed_proper_dict_returned(self):
        client = AppUser.objects.create(**CLIENT_DATA)
        ser = ClientSerializer(client)
        expected_data = CLIENT_DATA.copy()
        del expected_data['password']
        expected_data['id'] = client.id
        expected_data['address'] = None
        expected_data['business_data'] = None

        self.assertDictEqual(ser.data, expected_data)


class EquipmentSerializerTests(TestCase):

    def handle_serializer_with_proper_data(self, data):
        ser = EquipmentSerializer(data=data)
        self.assertTrue(ser.is_valid())
        ser.save()
        self.assertEqual(Equipment.objects.count(), 1)
        saved = Equipment.objects.get()
        self.assertEqual(saved.name, EQUIPMENT_NAME)
        self.assertEqual(saved.description, EQUIPMENT_DESCRIPTION)
        self.assertIsNotNone(saved.type)
        self.assertEqual(saved.max_rent_time, EQUIPMENT_MAX_RENT_TIME)
        return saved

    def test_proper_full_equipment_data_passed_is_valid(self):
        type = TypeOfEquipment.objects.create(**EQUIPMENT_TYPE)
        data = EQUIPMENT_DATA.copy()
        data['available'] = True
        data['type'] = type.id
        saved = self.handle_serializer_with_proper_data(data)
        self.assertEqual(saved.available, True)

    def test_proper_partial_equipment_data_passed_is_valid(self):
        type = TypeOfEquipment.objects.create(**EQUIPMENT_TYPE)
        data = EQUIPMENT_DATA
        data['type'] = type.id
        saved = self.handle_serializer_with_proper_data(data)
        self.assertEqual(saved.available, False)

    def test_incorrect_equipment_passed_data_is_not_valid(self):
        data = EQUIPMENT_DATA.copy()
        del data['name']
        ser = EquipmentSerializer(data=data)

        self.assertFalse(ser.is_valid())

    def test_equipment_obj_passed_proper_dict_returned(self):
        equipment = Equipment.objects.create(**EQUIPMENT_DATA)
        ser = EquipmentSerializer(equipment)
        expected_data = EQUIPMENT_DATA.copy()
        expected_data['id'] = 1
        expected_data['available'] = False
        expected_data['type'] = None
        expected_data['max_rent_time'] = '3 00:00:00'

        self.assertDictEqual(ser.data, expected_data)


def create_equip_client_and_return_rental_info_data(testcase):
    testcase.type = TypeOfEquipment.objects.create(type_name=TYPE_NAME)
    testcase.equip = Equipment.objects \
        .create(name="Equip", description="yes",
                type=testcase.type, available=True,
                max_rent_time=datetime.timedelta(days=20, hours=5))
    testcase.client = AppUser.objects.create(username="username",
                                             password="pass")
    testcase.rental_info_data = {
        "expected_return": "2018-10-13",
        'equipment_data': testcase.equip.id,
        'client_data': testcase.client.id
    }


def create_rental_info(testcase):
    data = testcase.rental_info_data.copy()
    data['equipment_data'] = testcase.equip
    data['client_data'] = testcase.client

    return RentalInfo.objects.create(**data)


class RentalInfoSerializerTests(TestCase):

    def setUp(self):
        create_equip_client_and_return_rental_info_data(self)

    def set_equip_unavailable(self):
        self.equip.available = False
        self.equip.save()

    def check_serializer_valid_and_save(self, ser):
        self.assertTrue(ser.is_valid())
        ser.save()

    def test_info_data_with_actual_return_equip_stays_available(self):
        data = self.rental_info_data.copy()
        data['actual_return'] = "2018-10-13"
        ser = RentalInfoSerializer(data=data)

        self.check_serializer_valid_and_save(ser)
        self.assertTrue(Equipment.objects.get().available)

    def test_info_data_without_actual_return_equip_becomes_unavailable(self):
        data = self.rental_info_data
        ser = RentalInfoSerializer(data=data)

        self.check_serializer_valid_and_save(ser)
        self.assertFalse(Equipment.objects.get().available)

    def test_info_without_actual_return_updated_with_actual_return_equip_becomes_available(
            self):
        self.set_equip_unavailable()
        rental_info = create_rental_info(self)
        data = {"actual_return": "2018-10-13"}
        ser = RentalInfoSerializer(rental_info, data=data, partial=True)

        self.check_serializer_valid_and_save(ser)
        self.assertTrue(Equipment.objects.get().available)

    def test_info_with_actual_return_updated_with_actual_return_nothing_in_equip_changes(
            self):
        rental_info = create_rental_info(self)
        rental_info.actual_return = datetime.date(year=2018, month=10, day=12)
        rental_info.save()
        self.set_equip_unavailable()
        data = {"actual_return": "2018-10-13"}
        ser = RentalInfoSerializer(rental_info, data=data, partial=True)

        self.check_serializer_valid_and_save(ser)
        self.assertFalse(Equipment.objects.get().available)

    def test_info_updated_without_actual_return_nothing_in_equip_changes(self):
        rental_info = create_rental_info(self)
        self.set_equip_unavailable()
        data = {"expected_return": "2018-10-15"}
        ser = RentalInfoSerializer(rental_info, data=data, partial=True)

        self.check_serializer_valid_and_save(ser)
        self.assertFalse(Equipment.objects.get().available)


class RentalInfoGetSerializerTests(TestCase):

    def setUp(self):
        create_equip_client_and_return_rental_info_data(self)

    def test_rental_info_obj_passed_proper_dict_returned(self):
        rental_info = create_rental_info(self)
        ser = RentalInfoSerializer(rental_info)
        expected_data = self.rental_info_data.copy()
        expected_data['id'] = RentalInfo.objects.get().id
        expected_data['actual_return'] = None

        self.assertDictEqual(ser.data, expected_data)
