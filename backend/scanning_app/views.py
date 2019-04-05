from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, viewsets, status, views, mixins
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, \
    TokenVerifySerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenVerifyView

from .models import Equipment, AppUser, RentalInfo, UnacceptedClient, \
    TypeOfEquipment
from .serializers import EquipmentSerializer, ClientSerializer, \
    RentalInfoSerializer, SignUpUnacceptedClientSerializer, \
    RentalInfoGetSerializer, TypeOfEquipmentSerializer, \
    AdminCreationSerializer, SuperAdminCreationSerializer, \
    ListUnacceptedClientSerializer
from .permissions import PostPermissions, RentalInfoPermissions, \
    IsSuperAdmin, IsAdminOrSuperAdmin
from django_filters.rest_framework import DjangoFilterBackend


class EquipmentView(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name', 'available', 'type')


class TypeOfEquipmentView(viewsets.ModelViewSet):
    queryset = TypeOfEquipment.objects.all()
    serializer_class = TypeOfEquipmentSerializer
    permission_classes = (IsAdminOrSuperAdmin,)


class UnacceptedClientListCreateDestroyViewSet(mixins.CreateModelMixin,
                                               mixins.ListModelMixin,
                                               mixins.DestroyModelMixin,
                                               viewsets.GenericViewSet):
    queryset = UnacceptedClient.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ListUnacceptedClientSerializer
        else:
            return SignUpUnacceptedClientSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = []
        else:
            permission_classes = [IsAdminOrSuperAdmin]
        return [permission() for permission in permission_classes]

    @swagger_auto_schema(
        operation_description="GET /api-v1/unaccepted-client/\n"
                              "List unaccepted clients",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'list unaccepted clients (Not admin or super admin)'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="POST /api-v1/signup/\n"
                              "Create new unaccepted client",
        responses={
            400: 'Obligatory field not provided or username duplicate'
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/unaccepted-client/{pk}/\n"
                              "Delete unaccepted client with given id",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'delete unaccepted client (Not admin or super admin)',
            404: 'No unaccepted client with given id found'
        }
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class AcceptUnacceptedClientView(views.APIView):
    permission_classes = (IsAdminOrSuperAdmin,)

    @swagger_auto_schema(
        operation_description=
        "POST /api-v1/unaccepted-client/{id}/accept/\n"
        "Accept client, move from UnacceptedClients table to AppUser table",
        responses={
            200: ClientSerializer,
            401: 'No token provided',
            403: 'User in tokent doesn\'t have permissions to '
                 'accept unaccepted clients (Not admin or super admin)',
            404: 'No unaccepted client with given id found'
        }
    )
    def post(self, request, pk):
        user = get_object_or_404(UnacceptedClient, pk=pk)
        accepted_user = user.accept()
        ser = ClientSerializer(accepted_user)
        return Response(data=ser.data, status=status.HTTP_200_OK)


class AdminCreationView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AdminCreationSerializer
    permission_classes = (IsSuperAdmin,)

    @swagger_auto_schema(
        operation_description="POST /api-v1/admin/\n"
                              "Create new admin",
        responses={
            400: 'Obligatory field not provided or username duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'create admin (Not super admin)'
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class SuperAdminCreationView(generics.CreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = SuperAdminCreationSerializer
    permission_classes = (IsSuperAdmin,)

    @swagger_auto_schema(
        operation_description="POST /api-v1/super-admin/\n"
                              "Create new super admin",
        responses={
            400: 'Obligatory field not provided or username duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'create super admin (Not super admin)'
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


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
            return SignUpUnacceptedClientSerializer
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
        validated_token = JWTAuthentication \
            .get_validated_token(JWTAuthentication(), raw_token=token)
        user = JWTAuthentication.get_user(JWTAuthentication(),
                                          validated_token=validated_token)
        response.data['username'] = user.username
        return response
