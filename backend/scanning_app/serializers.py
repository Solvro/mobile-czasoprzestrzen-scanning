from rest_framework import serializers

from .models import Equipment, AppUser, RentalInfo


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'


class AppUserCreationSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return AppUser.objects.create_user(**validated_data)

    class Meta:
        model = AppUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name',
                  'email', 'phone', 'address', 'business_data')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }


class SignUpClientSerializer(AppUserCreationSerializer):
    pass


class AdminCreationSerializer(AppUserCreationSerializer):
    def create(self, validated_data):
        validated_data['type'] = 'Ra'  # set user type to admin
        return super(AppUserCreationSerializer, self).create(validated_data)

    class Meta(AppUserCreationSerializer.Meta):
        fields = ('id', 'username', 'password', 'first_name', 'last_name',
                  'email', 'phone')


class SuperAdminCreationSerializer(AppUserCreationSerializer):
    def create(self, validated_data):
        validated_data['type'] = 'Sa'  # set user type to super-admin
        return super(AppUserCreationSerializer, self).create(validated_data)

    class Meta(AppUserCreationSerializer.Meta):
        fields = ('id', 'username', 'password', 'first_name', 'last_name',
                  'email', 'phone')


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'phone', 'address', 'business_data')


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
