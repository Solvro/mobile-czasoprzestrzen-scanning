from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from scanning_app.models import Equipment, RentalInfo, Client
import datetime


class ViewTestCase(TestCase):
    def setUp(self):
        self.equipment = Equipment(2,
                                   'Name',
                                   'Some description',
                                   True,
                                   'Mic',
                                   datetime.timedelta(days=20, hours=5))
        self.client = Client(1,
                             'Name',
                             'LastName',
                             'djamail@cos.tam',
                             '433213',
                             'Grunwald 5/6')
        self.rentalInfo = RentalInfo(2,
                                     expected_return='1410-07-15',
                                     actual_return='2001-09-11',
                                     equipment_data_id=self.equipment,
                                     client_data_id=self.client)
        self.user = APIClient()
        self.equipment.save()
        self.client.save()
        self.rentalInfo.save()

    def test_api_can_get_equipment(self):
        equipment = Equipment.objects.get()
        response = self.user.get(
            reverse('equipment-detail',
                    kwargs={'pk': equipment.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, equipment)

    def test_api_can_post_equipment(self):
        response = self.user.post(
            reverse('equipment-list'), {'name': 'Some Name',
                                        'description': 'Some Description',
                                        'availability': False,
                                        'type': 'Gui',
                                        'max_rent_time': datetime.timedelta(days=20, hours=5)},
            format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_client(self):
        client = Client.objects.get()
        response = self.user.get(
            reverse('client-detail',
                    kwargs={'pk': client.id}),
            format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, client)

    def test_api_can_post_client(self):
        response = self.user.post(
            reverse('client-list'), {'first_name': 'Some Name',
                                     'last_name': 'Some LastName',
                                     'email': 'djamail@onet.pl',
                                     'phone': '+41793381442',  # Must be +41 and not sure (valid number?)
                                     'address': 'PlacStrzegomski 3/4'},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_rentalInfo(self):
        rental = RentalInfo.objects.get()
        response = self.user.get(
            reverse('rentalinfo-detail',
                    kwargs={'pk': rental.id}),
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, rental)

    def test_api_can_post_rentalInfo(self):
        equipment = {'name': 'Some Name',
                     'description': 'Some Description',
                     'status': False,
                     'type': 'Gui',
                     'max_rent_time': datetime.timedelta(days=20, hours=5)}
        client = {'first_name': 'Some Name',
                  'last_name': 'Some LastName',
                  'email': 'djamail@onet.pl',
                  'phone': '+41793381442',
                  'address': 'PlacStrzegomski 3/4'}
        response = self.user.post(
            reverse('rentalinfo-list'), {'expected_return': '1410-07-15',
                                         'actual_return': '2001-09-11',
                                         'equipment_data_id': equipment,
                                         'client_data_id': client},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
