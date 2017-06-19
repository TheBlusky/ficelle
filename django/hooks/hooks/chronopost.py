import base64
import hashlib
from api.models import Hook
from bs4 import BeautifulSoup
import requests


def perform_search(settings):
    url = 'http://www.chronopost.fr/tracking-no-drupal/suivi-colis'
    json = requests.get('{}?listeNumerosLT={}&langue=fr'.format(url, settings['nsuivi'])).json()
    bs = BeautifulSoup(json['tab'])
    return [" - ".join([td.text for td in row.findAll('td')]) for row in bs.findAll('tr')[1:]]


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
            "nsuivi": {
                "type": "string",
                "title": "Numero de suivi",
                "default": "XXXXXXXXXXXXXXXXXXXXXXX"
            },
        }
    }
    return schema, Hook.FREQUENCY_HOUR
