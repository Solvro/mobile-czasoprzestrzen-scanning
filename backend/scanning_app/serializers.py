from rest_framework import serializers
from .models import Equipment, Client, RentalInfo


class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Equipment
        fields = ('id',
                  'url',
                  'name',
                  'description',
                  'availability',
                  'type',
                  'max_rent_time')


class SignUpClientSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Client.objects.create_user(**validated_data)

    class Meta:
        model = Client
        fields = ('username',
                  'password',
                  'first_name',
                  'last_name',
                  'email',
                  'phone',
                  'address',
                  'business_data')


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ('id',
                  'username',
                  'url',
                  'first_name',
                  'last_name',
                  'email',
                  'phone',
                  'address',
                  'business_data')


class RentalInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RentalInfo
        fields = ('id',
                  'url',
                  'rental_date',
                  'expected_return',
                  'actual_return',
                  'equipment_data_id',
                  'client_data_id')
