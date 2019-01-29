from .serializers import EquipmentSerializer
from .models import Equipment
from rest_framework import viewsets
# Create your views here.


class DetailsView(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

