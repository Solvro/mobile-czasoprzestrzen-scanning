from django.urls import path, include
from django_rest_passwordreset.serializers import EmailSerializer, \
    PasswordTokenSerializer
from django_rest_passwordreset.views import reset_password_confirm
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh

from .views import CustomResetPasswordRequestToken, ChangePasswordView, \
    VerifyTokenView

decorated_reset_pass_request = (
    swagger_auto_schema(request_body=EmailSerializer, method='post')
)(CustomResetPasswordRequestToken.as_view())

decorated_reset_pass_confirm = (
    swagger_auto_schema(request_body=PasswordTokenSerializer, method='post')
)(reset_password_confirm)

urlpatterns = [
    path('login/', token_obtain_pair, name='login'),
    path('refresh/', token_refresh, name='token-refresh'),
    path('verify/', VerifyTokenView.as_view(), name='token-verify'),
    path('change-password/', ChangePasswordView.as_view(),
         name="change-password"),
    path('reset-password/', decorated_reset_pass_request,
         name="reset-request"),
    path('reset-password/confirm/', decorated_reset_pass_confirm,
         name='reset-confirm'),
    path('', include('scanning_app.user.admins.urls')),
    path('', include('scanning_app.user.client.urls')),
]