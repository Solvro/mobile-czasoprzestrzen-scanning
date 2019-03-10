from rest_framework import permissions


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
