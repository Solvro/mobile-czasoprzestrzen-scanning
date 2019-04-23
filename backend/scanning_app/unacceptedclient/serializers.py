from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from scanning_app.models import AppUser, UnacceptedClient
from scanning_app.serializers import AddressSerializer, BusinessInfoSerializer


class SignUpUnacceptedClientSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, many=False)
    business_data = BusinessInfoSerializer(required=False, many=False)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        if 'address' in validated_data:
            add_ser = AddressSerializer(data=validated_data['address'])
            add_ser.is_valid()
            validated_data['address'] = add_ser.save()
        if 'business_data' in validated_data:
            bus_ser = BusinessInfoSerializer(
                data=validated_data['business_data']
            )
            bus_ser.is_valid()
            validated_data['business_data'] = bus_ser.save()
        return super(SignUpUnacceptedClientSerializer, self) \
            .create(validated_data)

    def validate(self, attrs):
        if AppUser.objects.filter(username__exact=attrs['username']).exists():
            raise serializers.ValidationError(
                "A user with that username already exists.")
        return super().validate(attrs)

    class Meta:
        model = UnacceptedClient
        fields = ('id', 'username', 'password', 'first_name', 'last_name',
                  'email', 'phone', 'address', 'business_data')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }


class ListUnacceptedClientSerializer(serializers.ModelSerializer):
    is_business = serializers.SerializerMethodField()

    class Meta:
        model = UnacceptedClient
        fields = ('id', 'first_name', 'last_name', 'email', 'phone',
                  'is_business')

    def get_is_business(self, obj):
        return bool(not (obj.business_data is None))
