import unittest
import demjson
from rest_framework import status
from rest_framework.test import APIClient
from api.models import Hook


class APIItemWebhookTestCase(unittest.TestCase):
    client_user = None
    feed_user = None
    hook_user = None
    settings = None
    client_anon = None

    def test0000_init(self):
        self.__class__.client_anon = APIClient()

        self.__class__.client_user = APIClient()
        self.__class__.client_user.post(
            "/api/users/register/",
            {'email': 'api_hook_user@ficelle.tld', 'password': 'tata'},
            format='json')
        response = self.__class__.client_user.post(
            "/api/users/login/",
            {'email': 'api_hook_user@ficelle.tld', 'password': 'tata'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.__class__.client_user.post(
            "/api/feeds/",
            {'title': 'toto_user'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.feed_user = response.json()['id']
        response = self.__class__.client_user.post(
            "/api/hooks/",
            {'title': 'toto1', 'type': 'webhook', "feed": self.__class__.feed_user,
             "frequency": Hook.FREQUENCY_NEVER, "settings": "{}", "state": "{}"},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.hook_user = response.json()['id']
        self.__class__.settings = demjson.decode(response.json()['settings'])

    def test0100_add_items(self):
        response = self.__class__.client_anon.post(
            "/api/webhooks/{}/".format("550e8400-e29b-41d4-a716-446655440000"),
            {'api_key': self.__class__.settings['api_key'], "text": 0},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.__class__.client_anon.post(
            "/api/webhooks/{}/".format(self.__class__.hook_user),
            {'api_key': "550e8400-e29b-41d4-a716-446655440000", "text": 0},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        for i in range(100):
            response = self.__class__.client_anon.post(
                "/api/webhooks/{}/".format(self.__class__.hook_user),
                {'api_key': self.__class__.settings['api_key'], "text": i},
                format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test0200_view_items(self):
        response = self.__class__.client_user.get(
            "/api/items/".format(self.__class__.hook_user),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data["count"], 100)
        self.assertEqual(len(data["results"]), 20)
        i = 99
        for result in data["results"]:
            self.assertEqual(demjson.decode(result["data"])['text'], str(i))
            i -= 1