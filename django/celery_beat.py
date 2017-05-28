import celery.bin.celery
import os
celery.bin.celery.main((os.getcwd() + 'celery_wrapper.py -A ficelle beat -l DEBUG -S django').split(" "))
