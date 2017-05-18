import json
from rest_framework import serializers
from api.models import Hook
from hooks import get_hook_handler


class HookUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hook
        fields = ('feed', 'title')

    def validate_feed(self, value):
        if value.owner_id != self.context['request'].user.user.id:
            raise serializers.ValidationError("Incorrect feed")
        return value


class HookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hook
        fields = ('id', 'created', 'owner', 'type', 'feed', 'frequency', 'settings', 'state', 'title')
        read_only_fields = ('id', 'created', 'owner')

    def validate_feed(self, value):
        if value.owner_id != self.context['request'].user.user.id:
            raise serializers.ValidationError("Incorrect feed")
        return value

    def to_internal_value(self, data):
        data = super(HookSerializer, self).to_internal_value(data)
        # Initiate data
        data['state'], data['settings'], data['frequency'] = get_hook_handler(data['type'], "init")(
            json.dumps(data['state']),
            json.dumps(data['settings']),
            data['frequency']
        )
        return data
