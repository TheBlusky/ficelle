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
