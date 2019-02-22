from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class ClientViewsTests(TestCase):
    def setUp(self):
        self.apiClient = APIClient()

    def test_create_client_obtain_token(self):
        user_data = {
            'username': 'juras',
            'password': 'pass',
            'email': 'JurekOwsiak@email.com',
            'first_name': 'Jurek',
            'last_name': 'Owsiak',
            'phone': '+48732005003',
            'address': 'Cokolwiek'
        }
        response = self.apiClient\
            .post(reverse('client-list'), user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        print(response.data)
        self.assertTrue('access' in response.data)


class RentalInfoViewsTests(TestCase):
    def test_cant_rent_rented_equipment(self):
        pass

    def test_equipments_becomes_unavailable_when_rented(self):
        pass

    def test_equipment_becomes_available_when_actual_return_date_set(self):
        pass
