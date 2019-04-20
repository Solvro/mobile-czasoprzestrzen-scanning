from django.core.exceptions import ValidationError
from django_rest_passwordreset.views import ResetPasswordRequestToken
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenVerifySerializer
from rest_framework_simplejwt.views import TokenVerifyView

from scanning_app.permissions import IsAppUser
from scanning_app.user.serializers import ChangePasswordSerializer, \
    AuthorizationError
from .admins.serializers import CustomVerifyTokenAdminsSerializer
from .client.serializers import CustomVerifyTokenClientSerializer


class VerifyTokenView(TokenVerifyView):
    serializer_class = TokenVerifySerializer

    @swagger_auto_schema(
        request_body=TokenVerifySerializer,
        responses={
            200: "User info",
            "200 client": CustomVerifyTokenClientSerializer,
            "200 admins": CustomVerifyTokenAdminsSerializer,
            401: "Token is invalid or expired"
        }
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = request.data['token']
        validated_token = JWTAuthentication.get_validated_token(
            JWTAuthentication(), raw_token=token)
        user = JWTAuthentication.get_user(JWTAuthentication(),
                                          validated_token=validated_token)
        if user.is_client():
            ser = CustomVerifyTokenClientSerializer(user)
        else:
            ser = CustomVerifyTokenAdminsSerializer(user)
        response.data = ser.data
        return response


class ChangePasswordView(views.APIView):
    permission_classes = (IsAuthenticated, IsAppUser,)

    @swagger_auto_schema(
        operation_description="POST api-v1/change-password/\n"
                              "Change users in token password",
        request_body=ChangePasswordSerializer,
        responses={
            200: "Users password changed",
            400: "field not provided",
            401: "Incorrect old password provided"
        }
    )
    def post(self, request):
        user = request.user
        data = request.data
        try:
            ChangePasswordSerializer(user, data=data).save()
        except ValidationError as e:
            return views.Response(status=status.HTTP_400_BAD_REQUEST,
                                  data={'error': e})
        except AuthorizationError as e:
            return views.Response(status=status.HTTP_401_UNAUTHORIZED,
                                  data={'error': e.message})
        return views.Response(status=status.HTTP_200_OK)


class CustomResetPasswordRequestToken(ResetPasswordRequestToken):

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, args, kwargs)
        except ValidationError:
            return Response(status=status.HTTP_404_NOT_FOUND)
