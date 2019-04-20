from django.urls import include, path

urlpatterns = [
    path('', include('scanning_app.user.urls')),
    path('', include('scanning_app.unacceptedclient.urls')),
    path('', include('scanning_app.equipment.urls')),
]
