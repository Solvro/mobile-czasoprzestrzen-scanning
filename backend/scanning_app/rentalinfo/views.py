from drf_yasg.openapi import Parameter
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.response import Response

from scanning_app import models
from scanning_app.models import AppUser, RentalInfo
from scanning_app.permissions import RentalInfoPermissions

from .serializers import RentalInfoSerializer, RentalInfoGetSerializer


class RentalInfoView(viewsets.ModelViewSet):
    queryset = models.RentalInfo.objects.all()
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
            models.Equipment.objects.get(id=request.data['equipment_data'])
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
            equip_to_update = models.Equipment.objects\
                .get(id=rent.equipment_data.pk)
            if rent.actual_return is None:
                equip_to_update.available = True
                equip_to_update.save()
            return super().destroy(request, *args, **kwargs)
        except RentalInfo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
