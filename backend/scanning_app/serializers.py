from rest_framework import serializers

from .models import Equipment, Client, RentalInfo

# TODO: reconsider using HyperlinkedModelSerializer,
#  passing objects with them in json is weird


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


# TODO: we assume that whenever actual_return date is specified,
#  it's in the past, meaning equipment is available.
#  Which does not necessarily have to be True
class RentalInfoSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        if 'actual_return' not in validated_data:
            equipment = validated_data['equipment_data']
            equipment.availability = False
            equipment.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if instance.actual_return is None and 'actual_return' in validated_data:
            equipment = instance.equipment_data
            equipment.availability = True
            equipment.save()
        return super().update(instance, validated_data)

    class Meta:
        model = RentalInfo
        fields = ('id',
                  'url',
                  'rental_date',
                  'expected_return',
                  'actual_return',
                  'equipment_data',
                  'client_data')
