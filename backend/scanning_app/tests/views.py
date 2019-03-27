import datetime
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from ..models import AppUser, Equipment, RentalInfo

CLIENT_USERNAME = 'juras'
CLIENT_PASSWORD = 'pass'
USER_DATA = {
    'username': CLIENT_USERNAME,
    'password': CLIENT_PASSWORD,
    'email': 'JurekOwsiak@email.com',
    'first_name': 'Jurek',
    'last_name': 'Owsiak',
    'phone': '+48732005003',
    'address': 'Cokolwiek'
}


class ClientSignUpTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_valid_client_data_passed_saved_201_returned(self):
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('signup'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AppUser.objects.count(), 1)
        client = AppUser.objects.get()
        self.assertTrue(client.is_client())
        self.assertFalse(client.is_admin())
        self.assertFalse(client.is_super_admin())

    def test_no_username_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['username']
        response = self.apiClient \
            .post(reverse('signup'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_password_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['password']
        response = self.apiClient \
            .post(reverse('signup'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_email_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['email']
        response = self.apiClient \
            .post(reverse('signup'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_phone_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['phone']
        response = self.apiClient \
            .post(reverse('signup'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AdminCreationViewTests(TestCase):
    def setUp(self):
        AppUser.objects.create_user(username="admin", password="admin",
                                    phone=USER_DATA['phone'],
                                    type="Sa")
        self.apiClient = APIClient()
        credentials = {'username': "admin",
                       'password': "admin"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    def test_valid_client_data_passed_saved_201_returned(self):
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        admin = AppUser.objects.get(id=response.data['id'])
        self.assertFalse(admin.is_client())
        self.assertTrue(admin.is_admin())
        self.assertFalse(admin.is_super_admin())

    def test_no_username_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['username']
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_password_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['password']
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_email_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['email']
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_phone_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['phone']
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_token_401_returned(self):
        data = USER_DATA
        self.apiClient.credentials()
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_user_403_returned(self):
        AppUser.objects.create_user(username="username", password="pass",
                                    phone=USER_DATA['phone'])
        credentials = {'username': "username",
                       'password': "pass"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_client_admin_403_returned(self):
        AppUser.objects.create_user(username="username", password="pass",
                                    phone=USER_DATA['phone'], type="Ra")
        credentials = {'username': "username",
                       'password': "pass"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class SuperAdminCreationViewTests(TestCase):
    def setUp(self):
        AppUser.objects.create_user(username="admin", password="admin",
                                    phone=USER_DATA['phone'],
                                    type="Sa")
        self.apiClient = APIClient()
        credentials = {'username': "admin",
                       'password': "admin"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    def test_valid_client_data_passed_saved_201_returned(self):
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        admin = AppUser.objects.get(id=response.data['id'])
        self.assertFalse(admin.is_client())
        self.assertFalse(admin.is_admin())
        self.assertTrue(admin.is_super_admin())

    def test_no_username_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['username']
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_password_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['password']
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_email_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['email']
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_phone_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['phone']
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_token_401_returned(self):
        data = USER_DATA
        self.apiClient.credentials()
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_user_403_returned(self):
        AppUser.objects.create_user(username="username", password="pass",
                                    phone=USER_DATA['phone'])
        credentials = {'username': "username",
                       'password': "pass"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_user_403_returned(self):
        AppUser.objects.create_user(username="username", password="pass",
                                    phone=USER_DATA['phone'], type="Ra")
        credentials = {'username': "username",
                       'password': "pass"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('super-admin-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ClientViewsTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_valid_client_data_passed_token_returned_and_saved(self):
        data = USER_DATA
        response = self.apiClient \
            .post(reverse('appuser-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('access' in response.data)
        self.assertEqual(AppUser.objects.count(), 1)

    def test_invalid_client_data_passed_bad_request_returned(self):
        data = USER_DATA.copy()
        del data['password']
        res = self.apiClient.post(reverse('appuser-list'), data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(AppUser.objects.exists())
        self.assertFalse('access' in res.data)


class TokenTests(TestCase):

    def setUp(self):
        self.apiClient = APIClient()
        AppUser.objects.create_user(**USER_DATA)

    def test_valid_user_data_passed_token_returned(self):
        data = {
            "username": CLIENT_USERNAME,
            "password": CLIENT_PASSWORD
        }
        res = self.apiClient.post(reverse('login'), data, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue('refresh' in res.data)
        self.assertTrue('access' in res.data)

    def test_invalid_user_data_passed_bad_request_returned(self):
        data = {
            "username": "boniek",
            "password": "pass"
        }
        res = self.apiClient.post(reverse('login'), data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class RentalInfoViewsTests(TestCase):
    def setUp(self):
        self.client = AppUser.objects.create_user(**USER_DATA)
        self.equipment = Equipment.objects.create(
            name='Electric Guitar',
            description='Playable XD',
            available=True,
            type='Gui',
            max_rent_time=datetime.timedelta(days=2)
        )

        self.apiClient = APIClient()
        token_data = {'username': 'juras', 'password': 'pass'}
        token = self.apiClient \
            .post(reverse('login'), token_data, format='json') \
            .data['access']
        self.apiClient \
            .credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    def rent_equipment(self):
        rental_info_data = {
            'expected_return': '2020-01-01',
            'equipment_data': self.equipment.id,
            'client_data': self.client.id
        }
        return self.apiClient \
            .post(reverse('rentalinfo-list'), rental_info_data, format='json')

    def rent_equipment_and_check_response(self):
        self.assertEqual(self.equipment.available, True)
        response = self.rent_equipment()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Equipment.objects.get().available, False)

    def test_cant_rent_rented_equipment(self):
        self.equipment.available = False
        self.equipment.save()
        response = self.rent_equipment()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_equipments_becomes_unavailable_when_rented(self):
        self.rent_equipment_and_check_response()

    def test_equipment_becomes_available_when_actual_return_date_set(self):
        self.rent_equipment_and_check_response()
        response = self.apiClient.patch(
            reverse('rentalinfo-detail', args=(RentalInfo.objects.get().id,)),
            {'actual_return': '2019-02-23'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Equipment.objects.get().available, True)
