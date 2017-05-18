from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from api.models import Feed, User
from api.serializers import FeedSerializer


class FeedViewSet(ModelViewSet):
    serializer_class = FeedSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.user
        return Feed.objects.filter(owner=user)

    def perform_create(self, serializer):
        user = self.request.user.user
        serializer.save(owner=user)
