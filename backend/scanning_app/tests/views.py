import datetime
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from ..models import AppUser, Equipment, RentalInfo, UnacceptedClient

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


class AbstractAppUserCreationTests:
    @property
    def endpoint(self):
        raise NotImplementedError()

    @property
    def type(self):
        raise NotImplementedError()

    def setUp(self):
        self.apiClient = APIClient()

    def send_request_with_data_expect_status(self, status, data=USER_DATA):
        response = self.apiClient \
            .post(reverse(self.endpoint), data, format='json')
        self.assertEquals(response.status_code, status)
        return response

    def bad_request_with_data(self, data):
        self.send_request_with_data_expect_status(
            status.HTTP_400_BAD_REQUEST,
            data
        )

    def test_valid_client_data_passed_saved_201_returned(self):
        response = self.send_request_with_data_expect_status(
            status.HTTP_201_CREATED
        )
        user = AppUser.objects.get(id=response.data['id'])
        self.assertEqual(user.type, self.type)

    def test_no_username_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['username']
        self.bad_request_with_data(data)

    def test_no_password_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['password']
        self.bad_request_with_data(data)

    def test_no_email_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['email']
        self.bad_request_with_data(data)

    def test_no_phone_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['phone']
        self.bad_request_with_data(data)


class AbstractAdminsCreationTests(AbstractAppUserCreationTests):
    def setUp(self):
        super().setUp()
        self.create_user_set_token("Sa", "admin", "admin")

    def create_user_set_token(self, user_type, username="username",
                              password="pass"):
        AppUser.objects.create_user(username=username, password=password,
                                    phone=USER_DATA['phone'], type=user_type)
        credentials = {'username': username,
                       'password': password}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    def test_no_token_401_returned(self):
        self.apiClient.credentials()
        self.send_request_with_data_expect_status(status.HTTP_401_UNAUTHORIZED)

    def test_client_user_403_returned(self):
        self.create_user_set_token("Cl")
        self.send_request_with_data_expect_status(status.HTTP_403_FORBIDDEN)

    def test_admin_user_403_returned(self):
        self.create_user_set_token("Ra")
        self.send_request_with_data_expect_status(status.HTTP_403_FORBIDDEN)


class UnacceptedClientSignUpTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def send_request_with_data_expect_status(self, status, data=USER_DATA):
        response = self.apiClient \
            .post(reverse("signup"), data, format='json')
        self.assertEquals(response.status_code, status)
        return response

    def bad_request_with_data(self, data):
        self.send_request_with_data_expect_status(
            status.HTTP_400_BAD_REQUEST,
            data
        )

    def test_valid_client_data_passed_saved_201_returned(self):
        response = self.send_request_with_data_expect_status(
            status.HTTP_201_CREATED
        )
        UnacceptedClient.objects.get(id=response.data['id'])

    def test_no_username_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['username']
        self.bad_request_with_data(data)

    def test_no_password_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['password']
        self.bad_request_with_data(data)

    def test_no_email_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['email']
        self.bad_request_with_data(data)

    def test_no_phone_passed_400_returned(self):
        data = USER_DATA.copy()
        del data['phone']
        self.bad_request_with_data(data)


class AdminCreationViewTests(AbstractAdminsCreationTests, TestCase):
    endpoint = "admin-list"
    type = "Ra"


class SuperAdminCreationViewTests(AbstractAdminsCreationTests, TestCase):
    endpoint = "super-admin-list"
    type = "Sa"


class UnacceptedClientListViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_list_contains_all_and_only_unaccepted_users(self):
        UnacceptedClient.objects.create(
            username="username",
            email="sample@email.com",
            password="pass",
            phone="+48793255012"
        )
        AppUser.objects.create_user(
            username="admin",
            password="pass",
            phone="+48793255012",
            type="Ra"
        )
        credentials = {'username': "admin",
                       'password': "pass"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        res = self.apiClient.get(reverse('unaccepted-client-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['email'], 'sample@email.com')

    def test_list_no_token_401_returned(self):
        res = self.apiClient.get(reverse('unaccepted-client-list'))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_client_token_403_returned(self):
        AppUser.objects.create_user(
            username="client",
            password="pass",
            phone="+48793255012"
        )
        credentials = {'username': "client",
                       'password': "pass"}
        token = self.apiClient \
            .post(reverse('login'), credentials, format='json') \
            .data['access']
        self.apiClient.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        res = self.apiClient.get(reverse('unaccepted-client-list'))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class ClientViewsTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

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

    def test_valid_token_passes_verification(self):
        data = {
            "username": CLIENT_USERNAME,
            "password": CLIENT_PASSWORD
        }
        res = self.apiClient.post(reverse('login'), data, format='json')
        res = self.apiClient.post(reverse('token-verify'),
                                  {'token': res.data['access']},
                                  format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

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
