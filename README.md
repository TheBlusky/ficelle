# Ficelle

A web application providing your own and customisable activity feed.

[`ficelle`](https://fr.wiktionary.org/wiki/ficelle), in french, is a little [`fil`](https://fr.wiktionary.org/wiki/fil)
which means both [`wire`](https://en.wiktionary.org/wiki/wire) and [`feed`](https://en.wiktionary.org/wiki/feed) in
english.

![screenshot](screenshot.png)

## Concepts

A single page application, including all activity feeds you regularly check: email, RSS, Facebook, scheduler, IoT stuff
(ringbell, coffee, alarm, ...), access log to your server, status update on a delivery...

With `ficelle`, each `user` can create their own `feeds`, powered by `hooks`.

There are two kinds of `hooks` :

 - `webhook` that can feed a `feed` through the `ficelle` API;
 - `cronhook` that are scheduled to feed the `feed` periodically.

## Features

### To-do

 - Front
  - [ ] JSON Schema for Hook editing
  - [ ] Filtering on Hook / Feed
 - Server
  - [ ] Implement more services
  - [ ] Ficelle event within ficelle event
  - [ ] More testing

### Hooks

 - [x] Webhook
   - [x] API
   - [ ] Slack (?)
 - [ ] Cronhook
   - [X] Dummy Hook that gives time
   - [X] RSS
   - [X] Torrent API
   - [ ] Email (?)
   - [ ] Reddit
   - [ ] Twitter
   - [ ] jeuxvideo.com (?)
   - [ ] fnac.com (?)
   - [ ] laposte.com

## Run with docker

### Build the image

```
git clone https://github.com/TheBlusky/ficelle.sh
cd ficelle/
sh build.sh
```

### Run the image

```
docker-compose up
```

## Settings

The following environment variables can be set to change `ficelle` settings:

|  Name                   | Values           | Default | Description |
|-------------------------|------------------|---------|-------------|
| `FICELLE_DEBUG`         | `True` / `False` | `False` | Enable the debug mode of `django` backend
| `FICELLE_ALLOW_REGISTER`| `True` / `False` | `True`  | Allow users to self register

## Under the hood

![process schema](process.schema.png)

## Run in a development environement

If you want to contribute to `ficelle`, the following layers must be deployed (for en dev. environement)
```bash
git clone https://github.com/TheBlusky/ficelle.sh
cd ficelle/
cd django/

# Run django webserver (including Runner and Worker)
python manage.py runserver

# Run celery beat and worker (only for cronhooks, but require a Redis instance)
python celery_beat.py
python celery_worker.py

cd ../react/
# Run npm for having an instance of the front
npm run start
```

Then, the application should be available in your browser at `http://localhost:3000`.

## Create a new Hook

Tbd.