from django.urls import path

from .views import ClientListView, ClientRetrieveUpdateDestroy

client_list_view = ClientListView.as_view({'get': 'list'})
client_detail_views = ClientRetrieveUpdateDestroy.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('client/', client_list_view, name="client-list"),
    path('client/<int:pk>/', client_detail_views, name="client-detail"),
]
