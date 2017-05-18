import json

from rest_framework.decorators import list_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from api.models import Hook
from api.serializers import HookSerializer, HookUpdateSerializer
from hooks import list_hooks


class HookViewSet(ModelViewSet):
    serializer_class = HookSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return HookUpdateSerializer
        return HookSerializer

    def get_queryset(self):
        user = self.request.user.user
        return Hook.objects.filter(owner=user)

    def perform_create(self, serializer):
        user = self.request.user.user
        serializer.save(owner=user)

    @list_route(methods=['get'])
    def get_available_hooks(self, request):
        return Response({'status': 'ok', 'hooks': list_hooks()})
