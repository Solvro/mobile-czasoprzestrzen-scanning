# Model test
from django.test import TestCase
from .models import Client


class ModelTestCase(TestCase):
    def setUp(self):
        self.client_first_name = "Marcel"
        self.client_last_name = "Krakowiak"
        self.client_email = "marcel.k@onet.eu"
        self.client_phone = "793381442"
        self.client_address = "Nowaczka 1/43"
        self.client = Client(first_name=self.client_first_name, last_name=self.client_last_name,
                             email=self.client_email, phone=self.client_phone, address=self.client_address)

    def test_model_create_client(self):
        old_count = Client.objects.count()
        self.client.save()
        new_count = Client.objects.count()
        self.assertNotEqual(old_count, new_count)


# View test
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Equipment
import datetime


class ViewTestCase(TestCase):
    def setUp(self):
        self.equipment = Equipment(2,
                                   'Name',
                                   'Some description',
                                   True,
                                   'Mic',
                                   datetime.timedelta(days=20, hours=5))
        self.client = APIClient()
        self.equipment.save()

    def test_api_can_get_equipment(self):
        equipment = Equipment.objects.get()
        response = self.client.get(
            reverse('equipment-detail',
                    kwargs={'pk': equipment.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, equipment)

    def test_api_can_post_equipment(self):
        response = self.client.post(
            reverse('equipment-list'), {'name': 'Some Name',
                                        'description': 'Some Description',
                                        'status': False,
                                        'type': 'Gui',
                                        'max_rent_time': datetime.timedelta(days=20, hours=5)},
            format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
