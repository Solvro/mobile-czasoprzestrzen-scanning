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

    def test_username_duplicate_400_returned(self):
        self.send_request_with_data_expect_status(status.HTTP_201_CREATED)
        self.send_request_with_data_expect_status(status.HTTP_400_BAD_REQUEST)


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

    def test_username_duplicate_400_returned(self):
        AppUser.objects.create_user(**USER_DATA)
        self.send_request_with_data_expect_status(status.HTTP_400_BAD_REQUEST)


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

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('unaccepted-client-list'))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
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


class AcceptUnacceptedClientViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    @classmethod
    def create_unaccepted_user(cls):
        return UnacceptedClient.objects.create(
            username="username",
            email="sample@email.com",
            password="pass",
            phone="+48793255012"
        )

    def test_once_accepted_client_moves_from_unaccepted_to_user_table(self):
        unaccepted = self.create_unaccepted_user()
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
        res = self.apiClient\
            .post(reverse('unaccepted-client-accept', args=(unaccepted.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], unaccepted.username)
        self.assertEqual(res.data['email'], unaccepted.email)
        self.assertNotIn('password', res.data)
        self.assertEqual(res.data['phone'], unaccepted.phone)
        self.assertFalse(UnacceptedClient.objects.exists())
        self.assertEqual(AppUser.objects.count(), 2)

    def test_no_token_401_returned(self):
        unaccepted = self.create_unaccepted_user()
        res = self.apiClient\
            .post(reverse('unaccepted-client-accept', args=(unaccepted.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        unaccepted = self.create_unaccepted_user()
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
        res = self.apiClient \
            .post(reverse('unaccepted-client-accept', args=(unaccepted.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_id_404_returned(self):
        unaccepted = self.create_unaccepted_user()
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
        res = self.apiClient \
            .post(reverse('unaccepted-client-accept', args=(unaccepted.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class UnacceptedClientDestroyViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    @classmethod
    def create_unaccepted_user(cls):
        return UnacceptedClient.objects.create(
            username="username",
            email="sample@email.com",
            password="pass",
            phone="+48793255012"
        )

    def test_valid_token_and_id_deleted(self):
        unaccepted = self.create_unaccepted_user()
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
        res = self.apiClient \
            .delete(reverse('unaccepted-client-detail', args=(unaccepted.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AppUser.objects.count(), 1)
        self.assertFalse(UnacceptedClient.objects.exists())

    def test_no_token_401_returned(self):
        unaccepted = self.create_unaccepted_user()
        res = self.apiClient \
            .delete(reverse('unaccepted-client-detail', args=(unaccepted.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        unaccepted = self.create_unaccepted_user()
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
        res = self.apiClient \
            .delete(reverse('unaccepted-client-detail', args=(unaccepted.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_id_404_returned(self):
        unaccepted = self.create_unaccepted_user()
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
        res = self.apiClient.delete(
            reverse('unaccepted-client-detail', args=(unaccepted.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


def create_client(username="client"):
    return AppUser.objects.create_user(
        username=username,
        password="pass",
        email="sample@email.com",
        phone="+48793255012"
    )


def create_admin(username="admin"):
    return AppUser.objects.create_user(
        username=username,
        password="pass",
        phone="+48793255012",
        type="Ra"
    )


def create_super_admin(username="root"):
    return AppUser.objects.create_user(
        username=username,
        password="pass",
        phone="+48793255012",
        type="Sa"
    )


def login_as_user(api_client, user):
    credentials = {'username': user.username,
                   'password': "pass"}
    token = api_client.post(reverse('login'), credentials, format='json')\
        .data['access']
    api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)


class ClientListViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('client-list'))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.get(reverse('client-list'))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_list_returned_only_clients(self):
        client = create_client()
        create_super_admin()
        token_user = create_admin()
        login_as_user(self.apiClient, token_user)
        res = self.apiClient.get(reverse('client-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['username'], client.username)

    def test_super_admin_token_list_returned_only_clients(self):
        client = create_client()
        create_admin()
        token_user = create_super_admin()
        login_as_user(self.apiClient, token_user)
        res = self.apiClient.get(reverse('client-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['username'], client.username)


class AdminListViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('admin-list'))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.get(reverse('admin-list'))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_list_returned_only_admins(self):
        create_client()
        create_super_admin()
        admin = create_admin()
        token_user = admin
        login_as_user(self.apiClient, token_user)
        res = self.apiClient.get(reverse('admin-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['username'], admin.username)

    def test_super_admin_token_list_returned_only_admins(self):
        create_client()
        admin = create_admin()
        token_user = create_super_admin()
        login_as_user(self.apiClient, token_user)
        res = self.apiClient.get(reverse('admin-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['username'], admin.username)


class SuperAdminListViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('super-admin-list'))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.get(reverse('super-admin-list'))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.get(reverse('super-admin-list'))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_super_admin_token_list_returned_only_super_admins(self):
        create_client()
        create_admin()
        super_admin = create_super_admin()
        token_user = super_admin
        login_as_user(self.apiClient, token_user)
        res = self.apiClient.get(reverse('super-admin-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['username'], super_admin.username)


class ClientRetrieveTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.client = create_client()

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('client-detail',
                                         args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_this_client_token_data_returned(self):
        login_as_user(self.apiClient, self.client)
        res = self.apiClient.get(reverse('client-detail',
                                         args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.client.username)
        self.assertNotIn('password', res.data)

    def test_another_client_token_403_returned(self):
        diff_client = create_client("diff")
        login_as_user(self.apiClient, diff_client)
        res = self.apiClient.get(reverse('client-detail',
                                         args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_data_returned(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.get(reverse('client-detail',
                                         args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.client.username)
        self.assertNotIn('password', res.data)

    def test_super_admin_token_data_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.get(reverse('client-detail',
                                         args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.client.username)
        self.assertNotIn('password', res.data)

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.get(reverse('client-detail',
                                         args=(self.client.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class AdminRetrieveTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.admin = create_admin()

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('admin-detail',
                                         args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.get(reverse('admin-detail',
                                         args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_this_admin_token_data_returned(self):
        login_as_user(self.apiClient, self.admin)
        res = self.apiClient.get(reverse('admin-detail',
                                         args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.admin.username)
        self.assertNotIn('password', res.data)

    def test_another_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin("diff"))
        res = self.apiClient.get(reverse('admin-detail',
                                         args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_super_admin_token_data_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.get(reverse('admin-detail',
                                         args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.admin.username)
        self.assertNotIn('password', res.data)

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.get(reverse('admin-detail',
                                         args=(self.admin.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class SuperAdminRetrieveTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.super_admin = create_super_admin()

    def test_no_token_401_returned(self):
        res = self.apiClient.get(reverse('super-admin-detail',
                                         args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.get(reverse('super-admin-detail',
                                         args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.get(reverse('super-admin-detail',
                                         args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_this_super_admin_token_data_returned(self):
        login_as_user(self.apiClient, self.super_admin)
        res = self.apiClient.get(reverse('super-admin-detail',
                                         args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.super_admin.username)
        self.assertNotIn('password', res.data)

    def test_another_super_admin_token_data_returned(self):
        login_as_user(self.apiClient, create_super_admin("diff"))
        res = self.apiClient.get(reverse('super-admin-detail',
                                         args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], self.super_admin.username)
        self.assertNotIn('password', res.data)

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, self.super_admin)
        res = self.apiClient.get(reverse('super-admin-detail',
                                         args=(self.super_admin.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class ClientUpdateTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.client = create_client()
        self.body = {'email': 'new@email.com'}

    def test_no_token_401_returned(self):
        res = self.apiClient.patch(
            reverse('client-detail', args=(self.client.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_this_client_token_model_updated(self):
        login_as_user(self.apiClient, self.client)
        res = self.apiClient.patch(
            reverse('client-detail', args=(self.client.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.client.id).email,
                         self.body['email'])

    def test_another_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client("diff"))
        res = self.apiClient.patch(
            reverse('client-detail', args=(self.client.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_model_updated(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.patch(
            reverse('client-detail', args=(self.client.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.client.id).email,
                         self.body['email'])

    def test_super_admin_token_model_updated(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.patch(
            reverse('client-detail', args=(self.client.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.client.id).email,
                         self.body['email'])

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.patch(
            reverse('client-detail', args=(self.client.id+1,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class AdminUpdateTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.admin = create_admin()
        self.body = {'email': 'new@email.com'}

    def test_no_token_401_returned(self):
        res = self.apiClient.patch(
            reverse('admin-detail', args=(self.admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.patch(
            reverse('admin-detail', args=(self.admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_this_admin_token_model_updated(self):
        login_as_user(self.apiClient, self.admin)
        res = self.apiClient.patch(
            reverse('admin-detail', args=(self.admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.admin.id).email,
                         self.body['email'])

    def test_another_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin("diff"))
        res = self.apiClient.patch(
            reverse('admin-detail', args=(self.admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_super_admin_token_model_updated(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.patch(
            reverse('admin-detail', args=(self.admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.admin.id).email,
                         self.body['email'])

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.patch(
            reverse('admin-detail', args=(self.admin.id+1,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class SuperAdminUpdateTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.super_admin = create_super_admin()
        self.body = {'email': 'new@email.com'}

    def test_no_token_401_returned(self):
        res = self.apiClient.patch(
            reverse('super-admin-detail', args=(self.super_admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.patch(
            reverse('super-admin-detail', args=(self.super_admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.patch(
            reverse('super-admin-detail', args=(self.super_admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_this_super_admin_token_model_updated(self):
        login_as_user(self.apiClient, self.super_admin)
        res = self.apiClient.patch(
            reverse('super-admin-detail', args=(self.super_admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.super_admin.id).email,
                         self.body['email'])

    def test_another_super_admin_token_model_updated(self):
        login_as_user(self.apiClient, create_super_admin("diff"))
        res = self.apiClient.patch(
            reverse('super-admin-detail', args=(self.super_admin.id,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(AppUser.objects.get(pk=self.super_admin.id).email,
                         self.body['email'])

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, self.super_admin)
        res = self.apiClient.patch(
            reverse('super-admin-detail', args=(self.super_admin.id+1,)),
            self.body,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class ClientDeleteTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.client = create_client()

    def test_no_token_401_returned(self):
        res = self.apiClient.delete(reverse('client-detail',
                                            args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_this_client_token_deleted(self):
        login_as_user(self.apiClient, self.client)
        res = self.apiClient.delete(reverse('client-detail',
                                            args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AppUser.objects.filter(type="Cl").exists())

    def test_other_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client("diff"))
        res = self.apiClient.delete(reverse('client-detail',
                                            args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_deleted(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.delete(reverse('client-detail',
                                            args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AppUser.objects.filter(type="Cl").exists())

    def test_super_admin_token_deleted(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.delete(reverse('client-detail',
                                            args=(self.client.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AppUser.objects.filter(type="Cl").exists())

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.delete(reverse('client-detail',
                                            args=(self.client.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class AdminDeleteTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.admin = create_admin()

    def test_no_token_401_returned(self):
        res = self.apiClient.delete(reverse('admin-detail',
                                            args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.delete(reverse('admin-detail',
                                            args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_this_admin_token_deleted(self):
        login_as_user(self.apiClient, self.admin)
        res = self.apiClient.delete(reverse('admin-detail',
                                            args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AppUser.objects.filter(type="Ra").exists())

    def test_other_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin("diff"))
        res = self.apiClient.delete(reverse('admin-detail',
                                            args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_super_admin_token_deleted(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.delete(reverse('admin-detail',
                                            args=(self.admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AppUser.objects.filter(type="Ra").exists())

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, create_super_admin())
        res = self.apiClient.delete(reverse('admin-detail',
                                            args=(self.admin.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class SuperAdminDeleteTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()
        self.super_admin = create_super_admin()

    def test_no_token_401_returned(self):
        res = self.apiClient.delete(reverse('super-admin-detail',
                                            args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_token_403_returned(self):
        login_as_user(self.apiClient, create_client())
        res = self.apiClient.delete(reverse('super-admin-detail',
                                            args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_token_403_returned(self):
        login_as_user(self.apiClient, create_admin())
        res = self.apiClient.delete(reverse('super-admin-detail',
                                            args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_this_super_admin_token_deleted(self):
        login_as_user(self.apiClient, self.super_admin)
        res = self.apiClient.delete(reverse('super-admin-detail',
                                            args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AppUser.objects.filter(type="Sa").exists())

    def test_other_super_admin_token_deleted(self):
        login_as_user(self.apiClient, create_super_admin("diff"))
        res = self.apiClient.delete(reverse('super-admin-detail',
                                            args=(self.super_admin.id,)))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AppUser.objects.filter(type="Sa").count(), 1)

    def test_invalid_id_404_returned(self):
        login_as_user(self.apiClient, self.super_admin)
        res = self.apiClient.delete(reverse('super-admin-detail',
                                            args=(self.super_admin.id+1,)))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


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


class ChangePasswordViewTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_correct_old_password_changed(self):
        user = create_client()
        login_as_user(self.apiClient, user)
        data = {'old_password': 'pass', 'new_password': 'new pass'}
        response = self.apiClient\
            .post(reverse('change-password'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            AppUser.objects.get(pk=user.id).check_password('new pass'))

    def test_no_old_password_400_returned(self):
        user = create_client()
        login_as_user(self.apiClient, user)
        data = {'new_password': 'new pass'}
        response = self.apiClient \
            .post(reverse('change-password'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_new_password_400_returned(self):
        user = create_client()
        login_as_user(self.apiClient, user)
        data = {'old_password': 'pass'}
        response = self.apiClient \
            .post(reverse('change-password'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_incorrect_old_password_401_returned(self):
        user = create_client()
        login_as_user(self.apiClient, user)
        data = {'old_password': 'wrong pass', 'new_password': 'new pass'}
        response = self.apiClient \
            .post(reverse('change-password'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
