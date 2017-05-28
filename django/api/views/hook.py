import json

from rest_framework.decorators import list_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from api.models import Hook
from api.serializers import HookSerializer, HookUpdateSerializer
from hooks import list_hooks, get_hook_handler


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
        settings = json.dumps(serializer.validated_data['settings'])
        frequency = serializer.validated_data['frequency']
        state, frequency = get_hook_handler(serializer.validated_data['type'], "init")(
            settings,
            frequency
        )
        serializer.save(owner=user, frequency=frequency, state=state)

    @list_route(methods=['get'])
    def get_available_hooks(self, request):
        return Response({'status': 'ok', 'hooks': [{
            "type": hookType,
            "template": {
                "settings": json.dumps(get_hook_handler(hookType, "get_default")()[0]),
                "frequency": get_hook_handler(hookType, "get_default")()[1]
            }
        } for hookType in list_hooks()]})
