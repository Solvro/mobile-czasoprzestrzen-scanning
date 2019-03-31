from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenVerifySerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenVerifyView

from .models import Equipment, AppUser, RentalInfo
from .serializers import EquipmentSerializer, ClientSerializer, \
    RentalInfoSerializer, SignUpClientSerializer, RentalInfoGetSerializer, \
    AdminCreationSerializer, SuperAdminCreationSerializer
from .permissions import PostPermissions, RentalInfoPermissions, \
    IsSuperAdmin
from django_filters.rest_framework import DjangoFilterBackend


class EquipmentView(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name', 'available', 'type')


class ClientSignUpView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = SignUpClientSerializer


class AdminCreationView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AdminCreationSerializer
    permission_classes = (IsSuperAdmin,)


class SuperAdminCreationView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = SuperAdminCreationSerializer
    permission_classes = (IsSuperAdmin,)


class ClientSignUpView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = SignUpClientSerializer


class AdminCreationView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AdminCreationSerializer
    permission_classes = (IsSuperAdmin,)


class SuperAdminCreationView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = SuperAdminCreationSerializer
    permission_classes = (IsSuperAdmin,)


class ClientView(viewsets.ModelViewSet):
    queryset = AppUser.objects.all()
    permission_classes = (PostPermissions,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name')

    def create(self, request, *args, **kwargs):
        created = super().create(request, *args, **kwargs)
        if created.status_code == status.HTTP_201_CREATED:
            token_serializer = TokenObtainPairSerializer(data=request.data)
            try:
                token_serializer.is_valid(raise_exception=True)
                created.data = token_serializer.validated_data
            except TokenError as e:
                raise InvalidToken(e.args[0])
        return created

    def get_serializer_class(self):
        if self.action == 'create':
            return SignUpClientSerializer
        return ClientSerializer


class RentalInfoView(viewsets.ModelViewSet):
    queryset = RentalInfo.objects.all()
    serializer_class = RentalInfoSerializer
    permission_classes = (RentalInfoPermissions,)

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return RentalInfoGetSerializer
        return RentalInfoSerializer

    def create(self, request, *args, **kwargs):
        equipment_to_rent = \
            Equipment.objects.get(id=request.data['equipment_data'])
        if not equipment_to_rent.available:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class VerifyTokenView(TokenVerifyView):
    serializer_class = TokenVerifySerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = request.data['token']
        validated_token = JWTAuthentication.get_validated_token(JWTAuthentication(), raw_token=token)
        user = JWTAuthentication.get_user(JWTAuthentication(), validated_token=validated_token)
        response.data['type'] = user.type
        return response
