from django.test import TestCase

from scanning_app.models import AppUser


class ModelTestCase(TestCase):
    def setUp(self):
        self.client = AppUser(first_name="Marcel",
                              last_name="Krakowiak",
                              email="marcel.k@onet.eu",
                              phone="793381442",
                              address="Nowaczka 1/43")

    def test_model_create_client(self):
        initial_number_of_clients = AppUser.objects.count()
        self.client.save()
        after_saving_number_of_clients = AppUser.objects.count()
        self.assertEqual(
            initial_number_of_clients + 1,
            after_saving_number_of_clients
        )
