import unittest
from rest_framework import status
from rest_framework.test import APIClient
from ficelle import settings


class APIUserTestCase(unittest.TestCase):
    def test0000_user_register_not_allowed(self):
        client = APIClient()
        settings.ALLOW_REGISTER = False
        response = client.post("/api/users/register/", {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        settings.ALLOW_REGISTER = True

    def test0001_user_register_empty(self):
        client = APIClient()
        response = client.post("/api/users/register/", {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test0002_user_register_ok(self):
        client = APIClient()
        response = client.post("/api/users/register/", {'email': 'toto@devnull.tld', 'password': 'tata'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test0003_user_register_twice_ko_ok(self):
        client = APIClient()
        response = client.post("/api/users/register/", {'email': 'toto@devnull.tld', 'password': 'tata'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test0100_user_login_ko(self):
        client = APIClient()
        response = client.post("/api/users/login/", {'email': 'toto@devnull.tld', 'password': 'toto'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0101_user_login_ok(self):
        client = APIClient()
        response = client.post("/api/users/login/", {'email': 'toto@devnull.tld', 'password': 'tata'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test0200_user_logout_ok(self):
        client = APIClient()
        response = client.post("/api/users/login/", {'email': 'toto@devnull.tld', 'password': 'tata'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = client.post("/api/users/logout/", {'email': 'toto@devnull.tld', 'password': 'tata'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = client.get("/api/users/me/", format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test0300_user_me_ok(self):
        client = APIClient()
        response = client.post("/api/users/login/", {'email': 'toto@devnull.tld', 'password': 'tata'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = client.get("/api/users/me/", format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test0301_user_me_ko(self):
        client = APIClient()
        response = client.get("/api/users/me/", format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

