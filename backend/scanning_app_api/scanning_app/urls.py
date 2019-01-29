from . import views
from rest_framework import routers
from django.urls import include, path

router = routers.DefaultRouter()
router.register('equipment', views.DetailsView)


urlpatterns = [
    path('', include(router.urls))
]

