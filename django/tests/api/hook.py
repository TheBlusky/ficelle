import unittest
from rest_framework import status
from rest_framework.test import APIClient

from api.models import Hook


class APIHookTestCase(unittest.TestCase):
    client_user = None
    client_stranger = None
    client_anon = None
    feed_user = None
    feed_stranger = None
    hooks_ids = []

    def test0000_init(self):
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

        self.__class__.client_stranger = APIClient()
        self.__class__.client_stranger.post(
            "/api/users/register/",
            {'email': 'api_hook_stranger@ficelle.tld', 'password': 'tata'},
            format='json')
        response = self.__class__.client_stranger.post(
            "/api/users/login/",
            {'email': 'api_hook_stranger@ficelle.tld', 'password': 'tata'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.__class__.client_stranger.post(
            "/api/feeds/",
            {'title': 'toto_stranger'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.feed_stranger = response.json()['id']

        self.__class__.client_anon = APIClient()

    def test0100_create(self):
        response = self.__class__.client_user.post(
            "/api/hooks/",
            {'title': 'toto1', 'type': 'webhook', "feed": self.__class__.feed_user, "frequency": Hook.FREQUENCY_NEVER, "settings":"{}", "state":"{}"},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.hooks_ids.append(response.json()['id'])
        response = self.__class__.client_user.post(
            "/api/hooks/",
            {'title': 'toto1', 'type': 'webhook', "feed": self.__class__.feed_user, "frequency": Hook.FREQUENCY_NEVER, "settings":"{}", "state":"{}"},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.hooks_ids.append(response.json()['id'])

        response = self.__class__.client_stranger.post(
            "/api/hooks/",
            {'title': 'toto1', 'type': 'webhook', "feed": self.__class__.feed_user, "frequency": Hook.FREQUENCY_NEVER, "settings":"{}", "state":"{}"},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.__class__.client_anon.post(
            "/api/hooks/",
            {'title': 'toto'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0200_list(self):
        response = self.__class__.client_user.get(
            "/api/hooks/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)

        response = self.__class__.client_stranger.get(
            "/api/hooks/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 0)

        response = self.__class__.client_anon.get(
            "/api/hooks/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0300_retrieve(self):
        response = self.__class__.client_user.get(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.__class__.client_stranger.get(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.__class__.client_anon.get(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0400_update(self):
        response = self.__class__.client_user.put(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4', 'feed': self.__class__.feed_user},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.__class__.client_user.put(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4', 'feed': self.__class__.feed_stranger},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.__class__.client_stranger.put(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4', 'feed': self.__class__.feed_stranger},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.__class__.client_anon.put(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0500_partial_update(self):
        response = self.__class__.client_user.patch(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.__class__.client_user.patch(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'feed': self.__class__.feed_stranger},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.__class__.client_user.post(
            "/api/feeds/",
            {'title': 'new_toto_user'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_feed = response.json()['id']
        response = self.__class__.client_user.patch(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'feed': new_feed},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.__class__.client_stranger.patch(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.__class__.client_anon.patch(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0600_destroy(self):
        response = self.__class__.client_user.delete(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.__class__.client_user.get(
            "/api/hooks/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)

        response = self.__class__.client_stranger.delete(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[1]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.__class__.client_anon.delete(
            "/api/hooks/{}/".format(self.__class__.hooks_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0700_get_available_hooks(self):
        response = self.__class__.client_user.get(
            "/api/hooks/get_available_hooks/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.__class__.client_anon.get(
            "/api/hooks/get_available_hooks/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
