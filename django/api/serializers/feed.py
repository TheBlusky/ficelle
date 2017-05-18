from rest_framework import serializers
from api.models import Feed, Item


class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ('id', 'created', 'owner', 'title')
        read_only_fields = ('id', 'created', 'owner')
