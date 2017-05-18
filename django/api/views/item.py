from rest_framework import filters, pagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from api.models import Item, User
from api.serializers import ItemSerializer


class ItemPagination(pagination.PageNumberPagination):
    page_size = 20
    max_page_size = 20


class ItemViewSet(ReadOnlyModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)
    search_fields = ('hook__id', 'feed__id')
    ordering_fields = ('created',)
    ordering = ('-created',)

    pagination_class = ItemPagination

    def get_queryset(self):
        user = User.objects.filter(django_user=self.request.user)[0]
        return Item.objects.filter(owner=user)
