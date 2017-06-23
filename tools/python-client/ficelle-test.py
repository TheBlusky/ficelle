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

# client = FicelleClient("http://localhost:8000","cd30c248-fc05-4182-ba78-886df35ffc51","99f2080d-4274-4461-bfa2-627eb14c0eee")
client1 = FicelleClient("http://localhost:8000","d4a3bfff-c901-4370-bd44-057d8e4dcd6e","14d96d26-5c0e-4923-9bd7-fde7caa4b677")
client2 = FicelleClient("http://localhost:8000","bd7164c4-ce09-4555-b62c-1f2714091e3f","d83f5000-cc71-4384-acbe-f1b3cbc55cec")
client3 = FicelleClient("http://localhost:8000","86ade9bc-3ddc-4f24-a210-5c03aaa6204d","642212d0-cc14-4dc0-88c6-7036b2079136")
client4 = FicelleClient("http://localhost:8000","e2c38a8c-d529-4b11-a31d-593abd03ff8b","5c04dff4-74fd-41d6-a296-2903e26d4d98")

client1.push(random_phrase(), random_phrase())
client2.push(random_phrase(), random_phrase())
client3.push(random_phrase(), random_phrase())
client4.push(random_phrase(), random_phrase())
