import json

import demjson
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User as DjangoUser
import uuid

from django_celery_beat.models import IntervalSchedule, PeriodicTask


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    django_user = models.OneToOneField(DjangoUser, on_delete=models.CASCADE)

    @classmethod
    def create(cls, email, password):
        django_user = DjangoUser.objects.create_user(email, email, password)
        django_user.save()
        user = cls()
        user.django_user = django_user
        user.save()
        return user


class Feed(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    title = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Hook(models.Model):
    FREQUENCY_NEVER = 'n'
    FREQUENCY_MINUTE = 'm'
    FREQUENCY_HALFHOUR = 'h'
    FREQUENCY_HOUR = 'H'
    FREQUENCY_DAY = 'd'
    FREQUENCY_WEEK = 'w'
    FREQUENCY = (
        (FREQUENCY_NEVER, 'Never'),
        (FREQUENCY_MINUTE, 'Minute'),
        (FREQUENCY_HALFHOUR, 'Half-hour'),
        (FREQUENCY_HOUR, 'Hour'),
        (FREQUENCY_DAY, 'Day'),
        (FREQUENCY_WEEK, 'Week')
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    type = models.CharField(max_length=64)
    frequency = models.CharField(max_length=4, choices=FREQUENCY)
    settings = models.CharField(max_length=1024)
    state = models.CharField(max_length=1024)

    def create_item_generator(self):
        def create_item(data):
            item = Item()
            item.hook = self
            item.owner = self.owner
            item.feed = self.feed
            item.data = demjson.encode(data)
            item.save()
            return item
        return create_item


@receiver(models.signals.post_save, sender=Hook)
def hook_create_cron(sender, instance, created, *args, **kwargs):
    if created and instance.frequency != Hook.FREQUENCY_NEVER:
        every = {
            Hook.FREQUENCY_MINUTE: 1,
            Hook.FREQUENCY_HALFHOUR: 30,
            Hook.FREQUENCY_HOUR: 1,
            Hook.FREQUENCY_DAY: 1,
            Hook.FREQUENCY_WEEK: 7
        }
        period = {
            Hook.FREQUENCY_MINUTE: IntervalSchedule.MINUTES,
            Hook.FREQUENCY_HALFHOUR: IntervalSchedule.MINUTES,
            Hook.FREQUENCY_HOUR: IntervalSchedule.HOURS,
            Hook.FREQUENCY_DAY: IntervalSchedule.DAYS,
            Hook.FREQUENCY_WEEK: IntervalSchedule.DAYS
        }
        schedule, created = IntervalSchedule.objects.get_or_create(
            every=every[instance.frequency],
            period=period[instance.frequency],
        )
        PeriodicTask.objects.create(
            interval = schedule,
            name='ficelle-hook-{}'.format(instance.id),
            task='ficelle.tasks.update_hook',
            args=json.dumps([instance.id])
        )


@receiver(models.signals.post_delete, sender=Hook)
def hook_delete_cron(sender, instance, *args, **kwargs):
    if instance.frequency != Hook.FREQUENCY_NEVER:
        PeriodicTask.objects.filter(name='ficelle-hook-{}'.format(instance.id)).delete()


class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    hook = models.ForeignKey(Hook, on_delete=models.CASCADE)
    data = models.CharField(max_length=4096)
