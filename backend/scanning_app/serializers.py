from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenVerifySerializer

from .models import Equipment, AppUser, RentalInfo, UnacceptedClient, TypeOfEquipment


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'


class TypeOfEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfEquipment
        fields = '__all__'


class SignUpUnacceptedClientSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
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
        fields = ('id', 'first_name', 'last_name', 'email', 'is_business')

    def get_is_business(self, obj):
        return bool(not (obj.business_data is None or obj.business_data == ''))


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
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'phone', 'address', 'business_data')


class AdminAndSuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'phone')


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


class RentalInfoGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalInfo
        fields = '__all__'


class CustomVerifyUserSerializer(serializers.ModelSerializer):
    is_business = serializers.SerializerMethodField()

    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'phone', 'address', 'business_data', 'is_business')

    def get_is_business(self, obj):
        return bool(not (obj.business_data is None or obj.business_data == ''))


class CustomVerifyAdminsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'phone',)
