from rest_framework.exceptions import PermissionDenied
from api.models import Hook
from rest_framework import serializers
import uuid

"""
WebHook plugin for Ficelle
This is a basic exemple for a webhook plugin
"""


def update_cron(create_item, state, settings):
    return state, settings


def update_web(request, create_item, state, settings):
    serialized = RequestSerializer(data=request.data)
    serialized.is_valid(raise_exception=True)
    if 'api_key' in settings and serialized.validated_data['api_key'] != settings['api_key']:
        raise PermissionDenied(detail="Wrong API Key")
    if 'api_key' not in settings and 'api_key' in state and serialized.validated_data['api_key'] != state['api_key']:
        raise PermissionDenied(detail="Wrong API Key")
    data = {
        "title": serialized.validated_data['title'],
        "text": serialized.validated_data['text'],
        "link": serialized.validated_data['link']
    }
    create_item(data)
    return state, settings


def init(settings, frequency):
    state = {"api_key": str(uuid.uuid4())}
    frequency = Hook.FREQUENCY_NEVER
    return state, frequency


def get_default():
    return {}, Hook.FREQUENCY_NEVER

"""
Boilerplate validation class
"""


class RequestSerializer(serializers.Serializer):
    api_key = serializers.CharField()
    title = serializers.CharField(default="")
    text = serializers.CharField(default="")
    link = serializers.CharField(default="")
