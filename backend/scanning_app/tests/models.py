from django.core.exceptions import ValidationError
from django.test import TestCase

from scanning_app.models import AppUser, UnacceptedClient


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


USERNAME = "username"


class UnacceptedClientTests(TestCase):

    def test_unique_username_passed_obj_created(self):
        AppUser.objects.create_user(username=USERNAME, password="pass",
                                    phone="+48732288410")
        self.assertEqual(AppUser.objects.count(), 1)
        UnacceptedClient.objects.create(username="diff username",
                                        password="other pass",
                                        phone="+48732450112")
        self.assertEqual(UnacceptedClient.objects.count(), 1)

    def test_username_in_appuser_passed_validation_error_raised(self):
        AppUser.objects.create_user(username=USERNAME, password="pass",
                                    phone="+48732288410")
        self.assertEqual(AppUser.objects.count(), 1)
        self.assertRaises(ValidationError, UnacceptedClient.objects.create,
                          username=USERNAME, password="other pass",
                          phone="+48732450112")
        self.assertEqual(UnacceptedClient.objects.count(), 0)
