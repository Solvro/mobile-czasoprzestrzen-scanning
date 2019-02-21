from .permissions import PostPermissions, RentalInfoPermissions
from .serializers import EquipmentSerializer, ClientSerializer, RentalInfoSerializer
from .models import Equipment, Client, RentalInfo
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class EquipmentView(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = (IsAuthenticated,)


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = (PostPermissions,)


class RentalInfoView(viewsets.ModelViewSet):
    queryset = RentalInfo.objects.all()
    serializer_class = RentalInfoSerializer
    permission_classes = (RentalInfoPermissions,)
