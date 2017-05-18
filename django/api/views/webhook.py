import demjson
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from api.models import Hook, Item
from hooks import get_hook_handler


@csrf_exempt
@api_view(['GET', 'POST'])
def webhook_view(request, hook_id):
    hook = get_object_or_404(Hook, id=hook_id)
    update_web = get_hook_handler(hook.type, "update_web")
    n_state, n_settings = update_web(
        request, hook.create_item_generator(),
        demjson.decode(hook.state), demjson.decode(hook.settings)
    )
    hook.state = demjson.encode(n_state)
    hook.settings = demjson.encode(n_settings)
    hook.save()
    return Response({"status": "Ok"})
