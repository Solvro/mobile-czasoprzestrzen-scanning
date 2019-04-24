from django.urls import path

from .views import UnacceptedClientListCreateDestroyViewSet, \
    AcceptUnacceptedClientView

unaccepted_client_signup_view = UnacceptedClientListCreateDestroyViewSet\
    .as_view({'post': 'create'})
unaccepted_client_list_view = UnacceptedClientListCreateDestroyViewSet \
    .as_view({'get': 'list'})
unaccepted_client_destroy_view = UnacceptedClientListCreateDestroyViewSet \
    .as_view({'delete': 'destroy'})

urlpatterns = [
    path('signup/', unaccepted_client_signup_view, name="signup"),
    path('unaccepted-client/', unaccepted_client_list_view,
         name="unaccepted-client-list"),
    path('unaccepted-client/<int:pk>/',
         unaccepted_client_destroy_view,
         name="unaccepted-client-detail"),
    path('unaccepted-client/<int:pk>/accept/',
         AcceptUnacceptedClientView.as_view(),
         name="unaccepted-client-accept"),
]
