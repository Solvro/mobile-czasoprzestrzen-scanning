from rest_framework import routers

from . import views

router = routers.DefaultRouter()

router.register('rentalinfo', views.RentalInfoView, basename='rentalinfo')

urlpatterns = router.urls
