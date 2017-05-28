from rest_framework import serializers
from api.models import Feed, Item, Hook


class HookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hook
        fields = ('id', 'title', 'enabled')
        read_only_fields = ('id', 'title', 'enabled')


class FeedSerializer(serializers.ModelSerializer):
    hook_set = HookSerializer(many=True, read_only=True)

    class Meta:
        model = Feed
        fields = ('id', 'created', 'owner', 'title', 'hook_set')
        read_only_fields = ('id', 'created', 'owner', 'hook_set')