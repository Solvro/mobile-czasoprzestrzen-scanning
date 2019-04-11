from django.apps import AppConfig


class ScanningAppConfig(AppConfig):
    name = 'scanning_app'

    def ready(self):
        import scanning_app.signals
