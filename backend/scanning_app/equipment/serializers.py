import datetime

from rest_framework import serializers

from scanning_app.models import TypeOfEquipment, Equipment, RentalInfo
from scanning_app.serializers import ClientSerializer


class TypeOfEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfEquipment
        fields = '__all__'


class EquipmentSerializer(serializers.ModelSerializer):
    type = TypeOfEquipmentSerializer(required=False, many=False)

    class Meta:
        model = Equipment
        fields = '__all__'


class EquipmentCreateSerializer(serializers.ModelSerializer):
    max_rent_time = serializers.IntegerField(required=True)

    def create(self, validated_data):
        max_rent_time_delta = datetime.timedelta(
            days=validated_data['max_rent_time']
        )
        validated_data['max_rent_time'] = max_rent_time_delta
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'max_rent_time' in validated_data:
            max_rent_time_delta = datetime.timedelta(
                days=validated_data['max_rent_time']
            )
            validated_data['max_rent_time'] = max_rent_time_delta
        return super().update(instance, validated_data)

    class Meta:
        model = Equipment
        exclude = ('available',)


class EquipmentRentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalInfo
        fields = ('id', 'expected_return')


# It's assumed that whenever actual_return date is specified,
# it's in the past, meaning equipment is still available.
class RentalInfoSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        if 'actual_return' not in validated_data:
            equipment = validated_data['equipment_data']
            equipment.available = False
            equipment.save()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if instance.actual_return is None and 'actual_return' in validated_data:
            equipment = instance.equipment_data
            equipment.available = True
            equipment.save()
        return super().update(instance, validated_data)

    class Meta:
        model = RentalInfo
        exclude = ('rental_date',)
        extra_kwargs = {
            'equipment_data': {'required': True},
            'client_data': {'required': True}
        }


class RentalInfoGetSerializer(serializers.ModelSerializer):
    equipment_data = EquipmentSerializer(required=False, many=False)
    client_data = ClientSerializer(required=False, many=False)

    class Meta:
        model = RentalInfo
        fields = '__all__'
