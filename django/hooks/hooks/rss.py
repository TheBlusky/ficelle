from time import mktime
from api.models import Hook
import feedparser

"""
WebHook plugin for Ficelle
This is a basic exemple for a cron plugin
"""


def update_cron(create_item, state, settings):
    f = feedparser.parse(settings['url'])
    if 'entries' not in f:
        return state, settings
    max_updated_at = state['lastUpdate']
    for entry in f['entries']:
        updatedAt = int(mktime(entry['published_parsed']))
        max_updated_at = max(max_updated_at, updatedAt)
        if updatedAt > state['lastUpdate']:
            data = {
                "title": entry.get('title', '')[0:64],
                "text": entry.get('summary', '')[0:64],
                "link": entry.get('link', '')
            }
            create_item(data)
    state['lastUpdate'] = max_updated_at
    return state, settings


def update_web(request, create_item, state, settings):
    return state, settings


def init(state, settings, frequency):
    state = {"lastUpdate": 0}
    settings = {"url": settings['url']}
    frequency = frequency
    return state, settings, frequency


def get_default():
    return {}, {"url": "##ACCOUNT##"}, Hook.FREQUENCY_HALFHOUR
