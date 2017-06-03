import json
from rest_framework import serializers
from api.models import Hook
from hooks import get_hook_handler


class HookUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hook
        fields = ('feed', 'title', 'enabled', 'settings')

    def validate_feed(self, value):
        if value.owner_id != self.context['request'].user.user.id:
            raise serializers.ValidationError("Incorrect feed")
        return value


class HookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hook
        fields = ('id', 'created', 'owner', 'type', 'feed', 'frequency', 'settings', 'title', 'state', 'enabled')
        read_only_fields = ('id', 'created', 'owner', 'state', 'enabled')

    def validate_feed(self, value):
        if value.owner_id != self.context['request'].user.user.id:
            raise serializers.ValidationError("Incorrect feed")
        return value

