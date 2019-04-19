from rest_framework import serializers

from scanning_app.models import AppUser
from scanning_app.serializers import AddressSerializer, BusinessInfoSerializer


class ClientSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, many=False)
    business_data = BusinessInfoSerializer(required=False, many=False)

    def update(self, instance, validated_data):
        if 'address' in validated_data:
            if instance.address is not None:
                instance.address.delete()
            add_ser = AddressSerializer(data=validated_data['address'])
            add_ser.is_valid()
            instance.address = add_ser.save()
            del validated_data['address']
        if 'business_data' in validated_data:
            if instance.business_data is not None:
                instance.business_data.delete()
            bus_ser = BusinessInfoSerializer(
                data=validated_data['business_data']
            )
            bus_ser.is_valid()
            instance.business_data = bus_ser.save()
            del validated_data['business_data']
        return super().update(instance, validated_data)

    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'phone', 'address', 'business_data')


class CustomVerifyTokenClientSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, many=False)
    business_data = BusinessInfoSerializer(required=False, many=False)
    is_business = serializers.SerializerMethodField()

    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name', 'type',
                  'email', 'phone', 'address', 'business_data', 'is_business')

    def get_is_business(self, obj):
        return bool(not (obj.business_data is None or obj.business_data == ''))
