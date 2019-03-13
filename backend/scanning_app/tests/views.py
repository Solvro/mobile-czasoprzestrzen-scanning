import datetime
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from ..models import Client, Equipment, RentalInfo


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
        response = self.apiClient \
            .post(reverse('client-list'), user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('access' in response.data)


class RentalInfoViewsTests(TestCase):
    def setUp(self):
        self.client = Client.objects.create_user(
            username='juras',
            password='pass',
            email='JurekOwsiak@email.com',
            first_name='Jurek',
            last_name='Owsiak',
            phone='+48732005003',
            address='Cokolwiek'
        )
        self.equipment = Equipment.objects.create(
            name='Electric Guitar',
            description='Playable XD',
            available=True,
            type='Gui',
            max_rent_time=datetime.timedelta(days=2)
        )

        self.apiClient = APIClient()
        token_data = {'username': 'juras', 'password': 'pass'}
        token = self.apiClient\
            .post(reverse('token-obtain'), token_data, format='json')\
            .data['access']
        self.apiClient\
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
