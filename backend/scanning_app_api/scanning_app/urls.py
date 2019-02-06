from . import views
from rest_framework import routers
from django.urls import include, path

router = routers.DefaultRouter()
router.register('equipment', views.EquipmentView)
router.register('client', views.ClientView)
router.register('rental-info', views.RentalInfoView)


urlpatterns = [
    path('', include(router.urls))
]

