from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('equipment', views.EquipmentView)
# router.register('client', views.ClientView)
router.register('rental-info', views.RentalInfoView)

client_list_view = views.ClientListView.as_view({'get': 'list'})

admin_list_create_views = views.AdminListCreateViews.as_view({
    'get': 'list',
    'post': 'create'
})

super_admin_list_create_views = views.SuperAdminListCreateViews.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('signup/', views.ClientSignUpView.as_view(), name="signup"),
    path('client/', client_list_view, name="client-list"),
    path('admin/', admin_list_create_views, name="admin-list"),
    path('super-admin/', super_admin_list_create_views,
         name="super-admin-list"),
    path('', include(router.urls))
]
