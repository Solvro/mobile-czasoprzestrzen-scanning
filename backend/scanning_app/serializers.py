from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import AppUser, UnacceptedClient, Address, BusinessInfo


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class BusinessInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessInfo
        fields = '__all__'


class AppAdminCreationSerializer(serializers.ModelSerializer):
    type = None

    def create(self, validated_data):
        validated_data['type'] = self.type
        return AppUser.objects.create_user(**validated_data)

    class Meta:
        model = AppUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name',
                  'email', 'phone')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }


class AdminCreationSerializer(AppAdminCreationSerializer):
    type = 'Ra'


class SuperAdminCreationSerializer(AppAdminCreationSerializer):
    type = 'Sa'


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


class AdminAndSuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'phone')


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


class CustomVerifyTokenAdminsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name', 'type',
                  'email', 'phone',)


class AuthorizationError(Exception):
    def __init__(self, message):
        self.message = message


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def save(self, **kwargs):
        user = self.instance
        data = self.initial_data
        if 'old_password' not in data:
            raise ValidationError('old_password not provided')
        if 'new_password' not in data:
            raise ValidationError('new_password not provided')
        if not user.check_password(data['old_password']):
            raise AuthorizationError('Incorrect password')
        user.set_password(data['new_password'])
        user.save()
        return user

    class Meta:
        model = AppUser
        fields = ('old_password', 'new_password')
