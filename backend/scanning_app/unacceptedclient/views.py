from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins, viewsets, views, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from scanning_app.models import UnacceptedClient
from scanning_app.permissions import IsAdminOrSuperAdmin
from scanning_app.serializers import ClientSerializer
from .serializers import ListUnacceptedClientSerializer, \
    SignUpUnacceptedClientSerializer


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
