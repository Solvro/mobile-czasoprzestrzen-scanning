from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('equipment', views.EquipmentView)
router.register('client', views.ClientView)
router.register('rental-info', views.RentalInfoView)

urlpatterns = [
    path('signup/', views.UnacceptedClientSignUpView.as_view(), name="signup"),
    path('admin/', views.AdminCreationView.as_view(), name="admin-list"),
    path('super-admin/', views.SuperAdminCreationView.as_view(),
         name="super-admin-list"),
    path('unaccepted-client/', views.UnacceptedClientListView.as_view(),
         name="unaccepted-client-list"),
    path('', include(router.urls))
]
