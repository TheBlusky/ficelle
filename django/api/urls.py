from django.conf.urls import url
from rest_framework import routers
import api.views

router = routers.SimpleRouter()
router.register(r'users', api.views.UserViewSet, base_name="users")
router.register(r'feeds', api.views.FeedViewSet, base_name="feeds")
router.register(r'hooks', api.views.HookViewSet, base_name="hooks")
router.register(r'items', api.views.ItemViewSet, base_name="hooks")
urlpatterns = [
    url(r'^webhooks/([a-z0-9-]{36})/$', api.views.webhook_view),
]
urlpatterns += router.urls
