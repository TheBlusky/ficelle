from django.contrib.auth import logout, authenticate, login
from django.db import IntegrityError
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import list_route
from api.models import User
from api.serializers import UserSerializer
from ficelle import settings


class UserViewSet(ViewSet):
    @list_route(methods=['post'])
    def register(self, request):
        if not settings.ALLOW_REGISTER:
            raise PermissionDenied(detail="Registering is disabled")
        serialized = UserSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        validated_data = serialized.validated_data
        try:
            User.create(validated_data['email'], validated_data['password'])
        except IntegrityError:
            return Response({'status': 'ko', 'message': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'status': 'ok'})

    @list_route(methods=['post'])
    def login(self, request):
        serialized = UserSerializer(data=request.data)
        serialized.is_valid(raise_exception=True)
        validated_data = serialized.validated_data
        django_user = authenticate(username=validated_data['email'], password=validated_data['password'])
        if django_user is None:
            raise AuthenticationFailed()
        login(request, django_user)
        return Response({'status': 'ok'})

    @list_route(methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({})

    @list_route(methods=["GET"], permission_classes=[IsAuthenticated])
    def me(self, request):
        user = get_object_or_404(User, django_user=request.user)
        return Response({
            'status': 'ok',
            'user': {'email': user.django_user.email}
        })
