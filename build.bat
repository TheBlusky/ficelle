@echo off
docker run --rm -it -v %~dp0react\:/usr/src/ficelle -w /usr/src/ficelle node:latest npm run build
docker build --no-cache=true -t blusky/ficelle .