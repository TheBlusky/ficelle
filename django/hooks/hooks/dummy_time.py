import datetime
from api.models import Hook

"""
WebHook plugin for Ficelle
This is a basic exemple for a webhook plugin
"""


def update_cron(create_item, state, settings):
    data = {
        "title": str(datetime.datetime.now()),
        "text": "",
        "link": ""
    }
    create_item(data)
    return state, settings


def update_web(request, create_item, state, settings):
    return state, settings


def init(state, settings, frequency):
    state = {}
    settings = {}
    frequency = Hook.FREQUENCY_MINUTE
    return state, settings, frequency


def get_default():
    return {}, {}, Hook.FREQUENCY_MINUTE
