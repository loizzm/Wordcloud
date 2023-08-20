FROM python:3.10

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE inmotion.settings

WORKDIR /app

COPY . /app

RUN pip install -r ./inmotion/requiriments/requirements.txt

EXPOSE 8000

CMD ["python", "./inmotion/manage.py", "runserver", "0.0.0.0:8000"]