FROM python:3
RUN mkdir /ficelle
WORKDIR /ficelle
RUN mkdir react/
RUN mkdir django/
ADD django ./django
ADD react/build react/build
WORKDIR /ficelle/django
RUN pip install -r requirements.txt
RUN python manage.py collectstatic
EXPOSE 8000
CMD gunicorn ficelle.wsgi --bind 0.0.0.0:8000 --preload --log-file -