from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenVerifySerializer
from rest_framework_simplejwt.views import TokenVerifyView

from .models import Equipment, AppUser, RentalInfo
from .serializers import EquipmentSerializer, ClientSerializer, \
    RentalInfoSerializer, SignUpClientSerializer, RentalInfoGetSerializer, \
    AdminCreationSerializer, SuperAdminCreationSerializer, \
    AdminAndSuperAdminSerializer
from .permissions import RentalInfoPermissions, \
    IsSuperAdmin, IsAppUser, IsAdminOrSuperAdmin, IsThisAdminOrSuperAdmin, \
    IsThisClientOrAdminOrSuperAdmin
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


class ClientListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = AppUser.objects.filter(type="Cl")
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated, IsAppUser, IsAdminOrSuperAdmin,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name')

    @swagger_auto_schema(
        operation_description="GET /api-v1/client/\n"
                              "List clients",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'list clients (Not admin or super admin)'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class AdminListCreateViews(mixins.ListModelMixin, mixins.CreateModelMixin,
                           viewsets.GenericViewSet):
    queryset = AppUser.objects.filter(type="Ra")
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AdminCreationSerializer
        return AdminAndSuperAdminSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [IsAuthenticated, IsAppUser, IsSuperAdmin]
        else:
            permission_classes = [IsAuthenticated, IsAppUser,
                                  IsAdminOrSuperAdmin]
        return [permission() for permission in permission_classes]

    @swagger_auto_schema(
        operation_description="GET /api-v1/admin/\n"
                              "List admins",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'list admins (Not admin or super admin)'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

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
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class SuperAdminListCreateViews(mixins.ListModelMixin, mixins.CreateModelMixin,
                                viewsets.GenericViewSet):
    queryset = AppUser.objects.filter(type="Sa")
    permission_classes = (IsAuthenticated, IsAppUser, IsSuperAdmin)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return SuperAdminCreationSerializer
        return AdminAndSuperAdminSerializer

    @swagger_auto_schema(
        operation_description="GET /api-v1/super-admin/\n"
                              "List super admins",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'list super admins (Not super admin)'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

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
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class ClientRetrieveUpdateDestroy(mixins.RetrieveModelMixin,
                                  mixins.UpdateModelMixin,
                                  mixins.DestroyModelMixin,
                                  viewsets.GenericViewSet):
    queryset = AppUser.objects.filter(type="Cl")
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated, IsAppUser,
                          IsThisClientOrAdminOrSuperAdmin)

    @swagger_auto_schema(
        operation_description="GET /api-v1/client/{id}/\n"
                              "Retrieve client with given id",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'retrieve client (Not this client or admin or super admin)',
            404: 'No client with given id found'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="PATCH /api-v1/client/{id}/\n"
                              "Update client with given id",
        responses={
            400: 'Obligatory field not provided or invalid value '
                 'or username duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update client (Not this client or admin or super admin)',
            404: 'No client with given id found'
        }
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/client/{id}/\n"
                              "Delete client with given id\n"
                              "!!!AS OF NOW ONCE CLIENT IS DELETED ALL OF HIS RENT HISTORY IS DELETED AS WELL!!!",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update client (Not this client or admin or super admin)',
            404: 'No client with given id found'
        }
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class AdminRetrieveUpdateDestroy(mixins.RetrieveModelMixin,
                                 mixins.UpdateModelMixin,
                                 mixins.DestroyModelMixin,
                                 viewsets.GenericViewSet):
    queryset = AppUser.objects.filter(type="Ra")
    serializer_class = ClientSerializer  # TODO
    permission_classes = (IsAuthenticated, IsAppUser,
                          IsThisAdminOrSuperAdmin)

    @swagger_auto_schema(
        operation_description="GET /api-v1/admin/{id}/\n"
                              "Retrieve admin with given id",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'retrieve admin (Not this admin or super admin)',
            404: 'No admin with given id found'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="PATCH /api-v1/admin/{id}/\n"
                              "Update admin with given id",
        responses={
            400: 'Obligatory field not provided or invalid value '
                 'or username duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update admin (Not this admin or super admin)',
            404: 'No admin with given id found'
        }
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/admin/{id}/\n"
                              "Delete admin with given id\n",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update admin (Not this admin or super admin)',
            404: 'No admin with given id found'
        }
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class SuperAdminRetrieveUpdateDestroy(mixins.RetrieveModelMixin,
                                      mixins.UpdateModelMixin,
                                      mixins.DestroyModelMixin,
                                      viewsets.GenericViewSet):
    queryset = AppUser.objects.filter(type="Sa")
    serializer_class = ClientSerializer  # TODO
    permission_classes = (IsAuthenticated, IsAppUser,
                          IsSuperAdmin)

    @swagger_auto_schema(
        operation_description="GET /api-v1/super-admin/{id}/\n"
                              "Retrieve super admin with given id",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'retrieve super admin (Not super admin)',
            404: 'No super admin with given id found'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="PATCH /api-v1/super-admin/{id}/\n"
                              "Update super admin with given id",
        responses={
            400: 'Obligatory field not provided or invalid value '
                 'or username duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update super admin (Not super admin)',
            404: 'No super admin with given id found'
        }
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/super-admin/{id}/\n"
                              "Delete super admin with given id\n",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update super admin (Not super admin)',
            404: 'No super admin with given id found'
        }
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


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
        validated_token = JWTAuthentication.get_validated_token(
            JWTAuthentication(), raw_token=token)
        user = JWTAuthentication.get_user(JWTAuthentication(),
                                          validated_token=validated_token)
        response.data['username'] = user.username
        return response
