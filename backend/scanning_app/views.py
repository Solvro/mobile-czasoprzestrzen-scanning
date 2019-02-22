from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from .models import Equipment, Client, RentalInfo
from .serializers import EquipmentSerializer, ClientSerializer, \
    RentalInfoSerializer, SignUpClientSerializer
from .permissions import PostPermissions, RentalInfoPermissions


class EquipmentView(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = (IsAuthenticated,)


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = (PostPermissions,)

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
