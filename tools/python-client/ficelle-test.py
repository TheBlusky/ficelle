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

client = FicelleClient("http://localhost:8000","ebfb8908-c3b0-49b4-9ca5-c158a014b361","66cc587a-dbf1-42df-921b-9df27fc3de73")

client.push(random_phrase(), random_phrase())