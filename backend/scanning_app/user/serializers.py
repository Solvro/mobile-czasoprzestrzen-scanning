from django.core.exceptions import ValidationError
from rest_framework import serializers

from scanning_app.models import AppUser


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
