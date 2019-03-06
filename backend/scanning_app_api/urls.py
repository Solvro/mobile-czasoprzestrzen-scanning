"""scanning_app_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh

from .views import SwaggerSchemaView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', SwaggerSchemaView.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', token_obtain_pair, name='token-obtain'),
    path('api/token/refresh/', token_refresh, name='token-refresh'),
    path('', include('scanning_app.urls')),
]
