from rest_framework import serializers


# It's assumed that whenever actual_return date is specified,
# it's in the past, meaning equipment is still available.
from scanning_app.models import RentalInfo
from scanning_app.serializers import EquipmentSerializer, ClientSerializer


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
