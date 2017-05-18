#! /usr/bin/python3
import pprint
import sys
import os
import requests

ficelle_url = "XXX"
hook_id = "XXX"
api_key = "XXX"

data={x:os.environ[x] for x in os.environ if x.startswith("PAM")}

if 'PAM_SERVICE' in data and data['PAM_SERVICE'] == 'cron':
    exit()

response = requests.post(
    "{}/api/webhooks/{}/".format(ficelle_url, hook_id),
    data={
        "api_key": api_key,
        "title": 'Pam event !',
        "text": str(data),
        "link": "",
    }
)
