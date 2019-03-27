from rest_framework import permissions

from .models import AppUser


class PostPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated


class RentalInfoPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            if request.user == obj.client_data:
                return True
            return False
        return request.user and request.user.is_authenticated


class IsAdminOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if type(request.user) is AppUser:
            return bool(request.user.is_admin() or
                        request.user.is_super_admin())
        return False
