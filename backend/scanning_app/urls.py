from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('equipment', views.EquipmentView)
router.register('client', views.ClientView)
router.register('rental-info', views.RentalInfoView)

unaccepted_client_signup_view = views.UnacceptedClientListCreateDestroyViewSet\
    .as_view({'post': 'create'})
unaccepted_client_list_view = views.UnacceptedClientListCreateDestroyViewSet\
    .as_view({'get': 'list'})
unaccepted_client_destroy_view = views.UnacceptedClientListCreateDestroyViewSet\
    .as_view({'delete': 'destroy'})


urlpatterns = [
    path('signup/', unaccepted_client_signup_view, name="signup"),
    path('admin/', views.AdminCreationView.as_view(), name="admin-list"),
    path('super-admin/', views.SuperAdminCreationView.as_view(),
         name="super-admin-list"),
    path('unaccepted-client/', unaccepted_client_list_view,
         name="unaccepted-client-list"),
    path('unaccepted-client/<int:pk>/',
         unaccepted_client_destroy_view,
         name="unaccepted-client-detail"),
    path('unaccepted-client/<int:pk>/accept/',
         views.AcceptUnacceptedClientView.as_view(),
         name="unaccepted-client-accept"),
    path('', include(router.urls))
]
