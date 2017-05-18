import unittest
from rest_framework import status
from rest_framework.test import APIClient


class APIFeedTestCase(unittest.TestCase):
    client_user = None
    client_stranger = None
    client_anon = None
    feed_ids = []

    def test0000_init(self):
        self.__class__.client_user = APIClient()
        self.__class__.client_user.post(
            "/api/users/register/",
            {'email': 'api_feed_user@ficelle.tld', 'password': 'tata'},
            format='json')
        response = self.__class__.client_user.post(
            "/api/users/login/",
            {'email': 'api_feed_user@ficelle.tld', 'password': 'tata'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.__class__.client_stranger = APIClient()
        self.__class__.client_stranger.post(
            "/api/users/register/",
            {'email': 'api_feed_stranger@ficelle.tld', 'password': 'tata'},
            format='json')
        response = self.__class__.client_stranger.post(
            "/api/users/login/",
            {'email': 'api_feed_stranger@ficelle.tld', 'password': 'tata'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.__class__.client_anon = APIClient()

    def test0100_create(self):
        response = self.__class__.client_user.post(
            "/api/feeds/",
            {'title': 'toto1'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.feed_ids.append(response.json()['id'])
        response = self.__class__.client_user.post(
            "/api/feeds/",
            {'title': 'toto2'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.__class__.feed_ids.append(response.json()['id'])

        response = self.__class__.client_anon.post(
            "/api/feeds/",
            {'title': 'toto'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0200_list(self):
        response = self.__class__.client_user.get(
            "/api/feeds/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)

        response = self.__class__.client_stranger.get(
            "/api/feeds/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 0)

        response = self.__class__.client_anon.get(
            "/api/feeds/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0300_retrieve(self):
        response = self.__class__.client_user.get(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.__class__.client_stranger.get(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.__class__.client_anon.get(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0400_update(self):
        response = self.__class__.client_user.put(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.__class__.client_stranger.put(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        response = self.__class__.client_anon.put(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0500_partial_update(self):
        response = self.__class__.client_user.patch(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.__class__.client_stranger.patch(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        response = self.__class__.client_anon.patch(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            {'title': 'toto4'},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0600_destroy(self):
        response = self.__class__.client_user.delete(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.__class__.client_user.get(
            "/api/feeds/",
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)

        response = self.__class__.client_stranger.delete(
            "/api/feeds/{}/".format(self.__class__.feed_ids[1]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        response = self.__class__.client_anon.delete(
            "/api/feeds/{}/".format(self.__class__.feed_ids[0]),
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)