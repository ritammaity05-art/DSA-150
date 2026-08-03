#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --noinput
python manage.py makemigrations accounts products cart payments orders analytics
python manage.py migrate
python manage.py seed_data
