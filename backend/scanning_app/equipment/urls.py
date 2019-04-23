from django.urls import path, include
from rest_framework import routers

from .views import EquipmentViewSet, TypeOfEquipmentViewSet, \
    RentEquipmentView, ReturnEquipmentView, AdminReturnEquipmentView, \
    RentalInfoViewSet

router = routers.DefaultRouter()
router.register('equipment-type', TypeOfEquipmentViewSet)
router.register('equipment', EquipmentViewSet)
router.register('rentalinfo', RentalInfoViewSet, basename='rentalinfo')

urlpatterns = [
    path('equipment/<int:pk>/rent/', RentEquipmentView.as_view(),
         name="equipment-rent"),
    path('equipment/<int:pk>/return/', ReturnEquipmentView.as_view(),
         name="equipment-return"),
    path('equipment/<int:pk>/admin-return/',
         AdminReturnEquipmentView.as_view(),
         name='equipment-admins-return'),
    path('', include(router.urls)),
]
