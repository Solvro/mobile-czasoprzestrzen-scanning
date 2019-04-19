import datetime

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.openapi import Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status, views, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from scanning_app.permissions import IsAdminOrSuperAdmin, IsAppUser, \
    RentalInfoPermissions
from .serializers import EquipmentCreateSerializer, EquipmentSerializer, \
    TypeOfEquipmentSerializer, EquipmentRentSerializer, \
    RentalInfoGetSerializer, RentalInfoSerializer
from scanning_app.models import Equipment, RentalInfo, TypeOfEquipment, AppUser


class TypeOfEquipmentViewSet(viewsets.ModelViewSet):
    queryset = TypeOfEquipment.objects.all()
    serializer_class = TypeOfEquipmentSerializer
    permission_classes = (IsAdminOrSuperAdmin,)

    @swagger_auto_schema(
        operation_description="GET /api-v1/equipment-type/\n"
                              "List of equipment types",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'list types (Not admin or super admin)'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="POST /api-v1/equipment-type/\n"
                              "Create new type",
        responses={
            400: 'Obligatory field not provided or type name duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'create type (Not admin or super admin)'
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/equipment-type/{id}/\n"
                              "Delete type",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'delete type (Not admin or super admin)',
            404: 'No type with given id found'
        }
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name', 'available', 'type')

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'PUT']:
            return EquipmentCreateSerializer
        else:
            return EquipmentSerializer

    @swagger_auto_schema(
        operation_description="POST /api-v1/equipment/\n"
                              "Create new equipment",
        responses={
            400: 'Obligatory field not provided or type name duplicate',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'create equipment (Not admin or super admin)'
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="GET /api-v1/equipment/{id}/\n"
                              "Retrieve equipment with given id",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'retrieve equipment (Not this client or admin or super admin)',
            404: 'No equipment with given id found'
        }
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="PUT /api-v1/equipment/{id}/\n"
                              "Update equipment with given id",
        responses={
            400: 'Obligatory field not provided or invalid value ',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update equipment (Not admin or super admin)',
            404: 'No equipment with given id found'
        }
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="PATCH /api-v1/equipment/{id}/\n"
                              "Update equipment with given id",
        responses={
            400: 'Invalid value',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'update equipment (Not admin or super admin)',
            404: 'No equipment with given id found'
        }
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/equipment/{id}/\n"
                              "Delete equipment",
        responses={
            400: 'Client has ongoing rents',
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'delete equipment (Not admin or super admin)',
            404: 'No equipment with given id found'
        }
    )
    def destroy(self, request, *args, **kwargs):
        has_ongoing_rents = RentalInfo.objects \
            .filter(equipment_data=self.get_object()) \
            .filter(actual_return__isnull=True) \
            .exists()
        if has_ongoing_rents:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="GET /api-v1/equipment/\n"
                              "List all equipment",
        responses={
            401: 'No token provided',
            403: 'User in token doesn\'t have permissions to '
                 'list equipment (Not admin or super admin)'
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class RentEquipmentView(generics.GenericAPIView):
    serializer_class = EquipmentRentSerializer
    permission_classes = (IsAppUser, IsAuthenticated)
    queryset = RentalInfo.objects.all()

    @swagger_auto_schema(
        operation_description="POST api-v1/equipment/{id}/rent/\n"
                              "Rent equipment with id",
        request_body=EquipmentRentSerializer,
        responses={
            201: "Created rent",
            400: "Wrong data or available==False",
            404: "Equipment with id doesn't exist"
        }
    )
    def post(self, request, pk):
        try:
            equip = Equipment.objects.get(pk=pk)
            request.data['equipment_data'] = pk
            request.data['client_data'] = request.user.pk
            serializer = RentalInfoSerializer(data=request.data)
            if equip is not None and equip.available:
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data,
                                    status=status.HTTP_201_CREATED)
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
            elif equip is None:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Equipment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ReturnEquipmentView(views.APIView):
    permission_classes = (IsAppUser, IsAuthenticated)

    @swagger_auto_schema(
        operation_description="PUT api-v1/equipment/{id}/return/\n"
                              "Return equipment with id",
        responses={
            200: "Equipment returned",
            400: "Equipment is available",
            403: "Rent isn't assigned to you",
            404: "Equipment doesn't exist"
        }
    )
    def put(self, request, pk):
        try:
            equip = Equipment.objects.get(pk=pk)
            if equip is not None and not equip.available:
                rent = RentalInfo.objects \
                    .filter(equipment_data=pk, actual_return__isnull=True)[0]
                if rent.client_data.pk == request.user.pk:
                    equip.available = True
                    rent.actual_return = datetime.date.today()
                    equip.save()
                    rent.save()
                    return Response(status=status.HTTP_200_OK)
                return Response(status=status.HTTP_403_FORBIDDEN)
            elif equip is None:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Equipment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AdminReturnEquipmentView(views.APIView):
    permission_classes = (IsAppUser, IsAuthenticated, IsAdminOrSuperAdmin)

    @swagger_auto_schema(
        operation_description="PUT api-v1/equipment/{id}/admin-return/\n"
                              "Return equipment with id",
        responses={
            200: "Equipment returned",
            400: "Equipment is available",
            401: "No token provided",
            403: "Not admin or super-admin user",
            404: "Equipment doesn't exist"
        }
    )
    def put(self, request, pk):
        try:
            equip = Equipment.objects.get(pk=pk)
            if equip.available:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Equipment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        rent = RentalInfo.objects \
            .filter(equipment_data=pk, actual_return__isnull=True)[0]
        if rent is not None:
            equip.available = True
            equip.save()
            rent.actual_return = datetime.date.today()
            rent.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class RentalInfoViewSet(viewsets.ModelViewSet):
    queryset = RentalInfo.objects.all()
    permission_classes = (RentalInfoPermissions,)

    def get_queryset(self):
        qs = self.queryset
        try:
            user = AppUser.objects.get(pk=self.request.user.id)
        except AppUser.DoesNotExist:
            return AppUser.objects.none()
        if user.is_client():
            qs = qs.filter(client_data=user)
        if 'status' in self.request.query_params:
            status = self.request.query_params['status']
            if status == 'ongoing':
                qs = qs.filter(actual_return__isnull=True)
            elif status == 'finished':
                qs = qs.filter(actual_return__isnull=False)
        return qs

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return RentalInfoGetSerializer
        return RentalInfoSerializer

    @swagger_auto_schema(
        manual_parameters=[Parameter('status', 'query', type='string', enum=['finished', 'ongoing'])]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="POST /api-v1/rentalinfo/{id}\n"
                              "Create rentalinfo manually",
        responses={
            400: 'Equipment.available == False',
            404: 'Equipment not found'
        }
    )
    def create(self, request, *args, **kwargs):
        equipment_to_rent = \
            Equipment.objects.get(id=request.data['equipment_data'])
        if not equipment_to_rent.available:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="DELETE /api-v1/rentalinfo/{id}\n"
                              "Delete rental info with given id",
        responses={
            404: 'Id of rentalinfo which doesn\'t exist',
            403: 'User doesn\'t have permissions to delete'
        }
    )
    def destroy(self, request, *args, **kwargs):
        try:
            rent = RentalInfo.objects.get(pk=kwargs['pk'])
            equip_to_update = Equipment.objects\
                .get(id=rent.equipment_data.pk)
            if rent.actual_return is None:
                equip_to_update.available = True
                equip_to_update.save()
            return super().destroy(request, *args, **kwargs)
        except RentalInfo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

