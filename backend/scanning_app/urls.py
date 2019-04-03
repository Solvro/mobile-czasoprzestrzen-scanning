from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('equipment', views.EquipmentView)
# router.register('client', views.ClientView)
router.register('rental-info', views.RentalInfoView)

client_list_view = views.ClientListView.as_view({'get': 'list'})
client_detail_views = views.ClientRetrieveUpdateDestroy.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy'
})

admin_list_create_views = views.AdminListCreateViews.as_view({
    'get': 'list',
    'post': 'create'
})
admin_detail_views = views.AdminRetrieveUpdateDestroy.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy'
})

super_admin_list_create_views = views.SuperAdminListCreateViews.as_view({
    'get': 'list',
    'post': 'create'
})
super_admin_detail_views = views.SuperAdminRetrieveUpdateDestroy.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('signup/', views.ClientSignUpView.as_view(), name="signup"),
    path('client/', client_list_view, name="client-list"),
    path('client/<int:pk>/', client_detail_views, name="client-detail"),
    path('admin/', admin_list_create_views, name="admin-list"),
    path('admin/<int:pk>/', admin_detail_views, name="admin-detail"),
    path('super-admin/', super_admin_list_create_views,
         name="super-admin-list"),
    path('super-admin/<int:pk>/', super_admin_detail_views,
         name="super-admin-detail"),
    path('', include(router.urls))
]
