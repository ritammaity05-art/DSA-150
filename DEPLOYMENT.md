# ShopFlow Pro Production Deployment Guide

This guide covers deploying **ShopFlow Pro** to production environments using **Gunicorn**, **Nginx**, **Systemd**, and **PostgreSQL**.

---

## 1. System Requirements & Setup

Ensure Python 3.10+, PostgreSQL, Nginx, and Git are installed on your target server (e.g. Ubuntu 22.04 LTS).

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv postgresql postgresql-contrib nginx curl -y
```

---

## 2. PostgreSQL Configuration

Create database and user:

```bash
sudo -u postgres psql
CREATE DATABASE shopflow_db;
CREATE USER shopflow_user WITH PASSWORD 'SecurePassword123!';
ALTER ROLE shopflow_user SET client_encoding TO 'utf8';
ALTER ROLE shopflow_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE shopflow_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE shopflow_db TO shopflow_user;
\q
```

---

## 3. Project Deployment

Clone repo, set environment variables, and run migrations:

```bash
cd /var/www
git clone <your-repository-url> shopflow_pro
cd shopflow_pro

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

cp .env.example .env
# Edit .env with production database credentials and SECRET_KEY
nano .env

python manage.py makemigrations
python manage.py migrate
python manage.py seed_data
python manage.py collectstatic --noinput
```

---

## 4. Systemd Gunicorn Service

Create `/etc/systemd/system/shopflow.service`:

```ini
[Unit]
Description=ShopFlow Pro Gunicorn Daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/shopflow_pro
ExecStart=/var/www/shopflow_pro/venv/bin/gunicorn --workers 3 --bind unix:/var/www/shopflow_pro/shopflow.sock shopflow.wsgi:application

[Install]
WantedBy=multi-user.target
```

Enable & start service:

```bash
sudo systemctl daemon-reload
sudo systemctl start shopflow
sudo systemctl enable shopflow
```

---

## 5. Nginx Reverse Proxy Configuration

Create `/etc/nginx/sites-available/shopflow`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /static/ {
        alias /var/www/shopflow_pro/staticfiles/;
    }

    location /media/ {
        alias /var/www/shopflow_pro/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/shopflow_pro/shopflow.sock;
    }
}
```

Enable site & test Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/shopflow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```
