import demjson
from api.models import Hook
from ficelle.celery import app
from hooks import get_hook_handler


@app.task
def update_hook(hook_id):
    print("Debug time !")
    hook = Hook.objects.filter(id=hook_id)[0]
    update_cron = get_hook_handler(hook.type, "update_cron")
    n_state, n_settings = update_cron(
        hook.create_item_generator(),
        demjson.decode(hook.state), demjson.decode(hook.settings)
    )
    hook.state = demjson.encode(n_state)
    hook.settings = demjson.encode(n_settings)
    hook.save()
