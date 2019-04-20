from rest_framework import serializers

from scanning_app.models import AppUser


class CustomVerifyTokenAdminsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name', 'last_name', 'type',
                  'email', 'phone',)


class AdminsCreationSerializer(serializers.ModelSerializer):
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


class AdminCreationSerializer(AdminsCreationSerializer):
    type = 'Ra'


class SuperAdminCreationSerializer(AdminsCreationSerializer):
    type = 'Sa'


class AdminAndSuperAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'phone')
