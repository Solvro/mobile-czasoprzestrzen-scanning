from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('equipment', views.EquipmentView)
router.register('client', views.ClientView)
router.register('rental-info', views.RentalInfoView)


urlpatterns = [
    path('signup/', views.ClientSignUpView.as_view(), name="signup"),
    path('admin/', views.AdminCreationView.as_view(), name="admin-list"),
    path('', include(router.urls))
]

