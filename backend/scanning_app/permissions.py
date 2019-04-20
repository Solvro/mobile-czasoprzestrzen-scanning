from rest_framework import permissions

from .models import AppUser


class IsAdminOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if type(request.user) is AppUser:
            return bool(request.user.is_admin() or
                        request.user.is_super_admin())
        return False


class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if type(request.user) is AppUser:
            return request.user.is_super_admin()
        return False


class IsAppUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return type(request.user) is AppUser


class IsThisClientOrAdminOrSuperAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        token_user = request.user
        if token_user.is_client():
            return bool(token_user == obj)
        return True


class IsThisAdminOrSuperAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        token_user = request.user
        if token_user.is_admin():
            return bool(token_user == obj)
        return token_user.is_super_admin()
