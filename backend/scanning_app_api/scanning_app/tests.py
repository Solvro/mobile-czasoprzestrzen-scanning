from django.test import TestCase
from .models import Client


class ModelTestCase(TestCase):
    def setUp(self):
        self.client_first_name = "Marcel"
        self.client_last_name = "Krakowiak"
        self.client_email = "marcel.k@onet.eu"
        self.client_phone = "793381442"
        self.client_address = "Nowaczka 1/43"
        self.client = Client(first_name=self.client_first_name, last_name=self.client_last_name, email=self.client_email, phone=self.client_phone, address=self.client_address)

    def test_model_create_client(self):
        old_count = Client.objects.count()
        self.client.save()
        new_count = Client.objects.count()
        self.assertNotEqual(old_count, new_count)


