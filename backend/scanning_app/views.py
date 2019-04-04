from rest_framework import viewsets, status, views, mixins
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenVerifySerializer
from rest_framework_simplejwt.views import TokenVerifyView
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema

from . import models, serializers
from .permissions import IsAppUser, IsThisClientOrAdminOrSuperAdmin, \
    IsAdminOrSuperAdmin, IsThisAdminOrSuperAdmin, IsSuperAdmin, \
    RentalInfoPermissions


class EquipmentView(viewsets.ModelViewSet):
    queryset = models.Equipment.objects.all()
    serializer_class = serializers.EquipmentSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name', 'available', 'type')


class UnacceptedClientListCreateDestroyViewSet(mixins.CreateModelMixin,
                                               mixins.ListModelMixin,
                                               mixins.DestroyModelMixin,
                                               viewsets.GenericViewSet):
    queryset = models.UnacceptedClient.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ListUnacceptedClientSerializer
        else:
            return serializers.SignUpUnacceptedClientSerializer

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
            200: serializers.ClientSerializer,
            401: 'No token provided',
            403: 'User in tokent doesn\'t have permissions to '
                 'accept unaccepted clients (Not admin or super admin)',
            404: 'No unaccepted client with given id found'
        }
    )
    def post(self, request, pk):
        user = get_object_or_404(models.UnacceptedClient, pk=pk)
        accepted_user = user.accept()
        ser = serializers.ClientSerializer(accepted_user)
        return Response(data=ser.data, status=status.HTTP_200_OK)


class ClientListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = models.AppUser.objects.filter(type="Cl")
    serializer_class = serializers.ClientSerializer
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
    queryset = models.AppUser.objects.filter(type="Ra")
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.AdminCreationSerializer
        return serializers.AdminAndSuperAdminSerializer

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
    queryset = models.AppUser.objects.filter(type="Sa")
    permission_classes = (IsAuthenticated, IsAppUser, IsSuperAdmin)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.SuperAdminCreationSerializer
        return serializers.AdminAndSuperAdminSerializer

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
    queryset = models.AppUser.objects.filter(type="Cl")
    serializer_class = serializers.ClientSerializer
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
        operation_description="PUT /api-v1/client/{id}/\n"
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
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

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
    queryset = models.AppUser.objects.filter(type="Ra")
    serializer_class = serializers.AdminAndSuperAdminSerializer
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
        operation_description="PUT /api-v1/admin/{id}/\n"
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
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

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
    queryset = models.AppUser.objects.filter(type="Sa")
    serializer_class = serializers.AdminAndSuperAdminSerializer
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
        operation_description="PUT /api-v1/super-admin/{id}/\n"
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
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

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
    queryset = models.RentalInfo.objects.all()
    serializer_class = serializers.RentalInfoSerializer
    permission_classes = (RentalInfoPermissions,)

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return serializers.RentalInfoGetSerializer
        return serializers.RentalInfoSerializer

    def create(self, request, *args, **kwargs):
        equipment_to_rent = \
            models.Equipment.objects.get(id=request.data['equipment_data'])
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
