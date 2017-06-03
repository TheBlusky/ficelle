import base64
import hashlib

from api.models import Hook
import requests
import time

"""
WebHook plugin for Ficelle
This is a basic exemple for a webhook plugin
"""


def perform_search(settings, retry=3):
    if retry == 0:
        return []
    r = requests.get('https://torrentapi.org/pubapi_v2.php?get_token=get_token')
    token = r.json()['token']
    r = requests.get(
          'https://torrentapi.org/pubapi_v2.php?mode=list&token={}&format=json_extended&{}'.format(token, settings['searchParameters'])
    )
    print( 'https://torrentapi.org/pubapi_v2.php?mode=list&token={}&format=json_extended&{}'.format(token, settings['searchParameters']))
    results = r.json()
    if 'torrent_results' in results:
        print(results['torrent_results'])
        return [
            result['title'] + " " + result['pubdate']
            for result in results['torrent_results']
            if settings['searchString'] in result['title']
        ]
    else:
        time.sleep(3)
        return perform_search(settings, retry-1)


def update_cron(create_item, state, settings):
    newState = {"history":state['history'][:]}
    items = perform_search(settings)
    for item in items:
        m_hash = base64.b64encode(hashlib.md5(item.encode()).digest()).decode()
        if m_hash not in newState['history']:
            newState['history'].append(m_hash)
            data = {
                "title": item,
                "text": "",
                "link": ""
            }
            create_item(data)
    if len(newState['history']) > 20:
        newState['history'] = newState['history'][len(newState['history'])-20:]
    return newState, settings


def update_web(request, create_item, state, settings):
    return update_cron(create_item, state, settings)


def init(settings, frequency):
    state = {"history":[]}
    frequency = Hook.FREQUENCY_HOUR
    return state, frequency


def get_default():
    schema = {
        "type": "object",
        "properties": {
            "searchParameters": {
                "type": "string",
                "title": "Search parameters",
                "default": "category=41&sort=seeders&limit=100"
            },
            "searchString": {
                "type": "string",
                "title": "String match",
                "default": "E01"
            },
        }
    }
    return schema, Hook.FREQUENCY_HOUR
