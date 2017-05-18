from django.conf.urls import url, include
from django.shortcuts import redirect

import api.urls


def redirect_index(request):
    return redirect('/static/index.html')

urlpatterns = [
    url(r'^api/', include(api.urls.urlpatterns)),
    url(r'^(?:index.html)?$', redirect_index),
]
