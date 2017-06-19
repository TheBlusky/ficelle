import random

import requests


class FicelleClient(object):
    def __init__(self, ficelle_url, hook_id, api_key):
        self.ficelle_url = ficelle_url
        self.hook_id = hook_id
        self.api_key = api_key

    def push(self, title="", text="", link=""):
        response = requests.post(
            "{}/api/webhooks/{}/".format(self.ficelle_url, self.hook_id),
            data={
                "api_key": self.api_key,
                "title": title,
                "text": text,
                "link": link,
            })
        if response.status_code != 200:
            raise Exception("Ficelle API Error")
        return True


def random_phrase():
    words = ['Some', 'words', 'any', 'number', 'of', 'them']
    choices = [random.choice(words) for _ in range(random.randint(3,8))]
    return ' '.join(choices)

client = FicelleClient("http://localhost:8000","cd30c248-fc05-4182-ba78-886df35ffc51","99f2080d-4274-4461-bfa2-627eb14c0eee")

client.push(random_phrase(), random_phrase())