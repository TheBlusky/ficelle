import demjson
from api.models import Hook
from ficelle.celery import app
from hooks import get_hook_handler


@app.task
def update_hook(hook_id):
    hook = Hook.objects.filter(id=hook_id)
    update_cron = get_hook_handler(hook.type, "update_cron")
    n_state, n_settings = update_cron(
        hook.create_item_generator(),
        demjson.decode(hook.state), demjson.decode(hook.settings)
    )
    hook.state = demjson.encode(n_state)
    hook.settings = demjson.encode(n_settings)
    hook.save()


@app.task
def test_debug(arg1="default"):
    print("Debug time !")
    print(arg1)
