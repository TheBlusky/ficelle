#!/bin/sh

docker run --rm -it -v "$(pwd)/react:/usr/src/ficelle" -w /usr/src/ficelle node:latest bash -c "npm install; npm run build"
docker build --no-cache=true -t blusky/ficelle .