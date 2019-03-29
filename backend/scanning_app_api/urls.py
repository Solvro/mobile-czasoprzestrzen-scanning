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
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh, \
    token_verify

from .views import SwaggerSchemaView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', SwaggerSchemaView.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api-v1/login/', token_obtain_pair, name='login'),
    path('api-v1/refresh/', token_refresh, name='token-refresh'),
    path('api-v1/verify/', token_verify, name='token-verify'),
    path('api-v1/', include('scanning_app.urls')),
]
