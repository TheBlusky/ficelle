from rest_framework import serializers
from api.models import Item, Feed, Hook


class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ('id', 'title')
        read_only_fields = ('id', 'title')


class HookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hook
        fields = ('id', 'title')
        read_only_fields = ('id', 'title')


class ItemSerializer(serializers.ModelSerializer):
    feed = FeedSerializer(read_only=True)
    hook = HookSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ('id', 'created', 'feed', 'owner', 'hook', 'data')
        read_only_fields = ('id', 'created', 'feed', 'owner', 'hook', 'data')
