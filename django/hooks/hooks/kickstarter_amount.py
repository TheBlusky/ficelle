from api.models import Hook
from bs4 import BeautifulSoup
import requests


def update_cron(create_item, state, settings):
    project = settings["project"]
    url = 'https://www.kickstarter.com/projects/{}/'.format(project)
    html = requests.get(url).content
    div = BeautifulSoup(html).find('div', {'class': 'project-nav__links'})
    data = div.findAll('a')
    new_state = {el.attrs['data-content']: int(el.find('span').text) for el in data if len(el.findAll('span')) > 0}
    for elem in new_state:
        if elem in settings["checks"] and settings["checks"][elem] and state[elem] < new_state[elem]:
            data = {
                "title": "New {} for {} ({} -> {})".format(
                    elem,
                    settings['project'],
                    state[elem],
                    new_state[elem]
                ),
                "text": "",
                "link": url
            }
            create_item(data)
    return new_state, settings


def update_web(request, create_item, state, settings):
    return update_cron(create_item, state, settings)


def init(settings, frequency):
    state = {'comments': 0, 'updates': 0, 'faqs': 0}
    frequency = Hook.FREQUENCY_HOUR
    return state, frequency


def get_default():
    schema = {
        "type": "object",
        "properties": {
            "project": {
                "type": "string",
                "default": "583173617/raspi-boy-retro-handheld-emulation-console-electro"
            },
            "checks": {
                "type": "object",
                "properties": {
                    "comments": {
                        "type": "boolean",
                        "title": "Comments"
                    },
                    "updates": {
                        "type": "boolean",
                        "title": "Updates"
                    },
                    "faqs": {
                        "type": "boolean",
                        "title": "FAQs"
                    }
                }
            }
        }
    }
    return schema, Hook.FREQUENCY_HOUR
