from .serializers import EquipmentSerializer, ClientSerializer, RentalInfoSerializer
from .models import Equipment, Client, RentalInfo
from rest_framework import viewsets


# Create your views here.


class EquipmentView(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class RentalInfoView(viewsets.ModelViewSet):
    queryset = RentalInfo.objects.all()
    serializer_class = RentalInfoSerializer
