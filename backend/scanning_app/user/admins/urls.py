from django.urls import path

from scanning_app.user.admins.views import AdminListCreateViews, \
    AdminRetrieveUpdateDestroy, SuperAdminListCreateViews, \
    SuperAdminRetrieveUpdateDestroy

admin_list_create_views = AdminListCreateViews.as_view({
    'get': 'list',
    'post': 'create'
})
admin_detail_views = AdminRetrieveUpdateDestroy.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

super_admin_list_create_views = SuperAdminListCreateViews.as_view({
    'get': 'list',
    'post': 'create'
})
super_admin_detail_views = SuperAdminRetrieveUpdateDestroy.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('admin/', admin_list_create_views, name="admin-list"),
    path('admin/<int:pk>/', admin_detail_views, name="admin-detail"),
    path('super-admin/', super_admin_list_create_views,
         name="super-admin-list"),
    path('super-admin/<int:pk>/', super_admin_detail_views,
         name="super-admin-detail"),
]
