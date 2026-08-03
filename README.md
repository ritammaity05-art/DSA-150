# Tin Tun Store - Enterprise E-Commerce Platform

**Tin Tun Store** is a full-stack, enterprise-grade E-Commerce web application and RESTful API platform built with **Python 3**, **Django 5**, **Django REST Framework (DRF)**, **PostgreSQL**, **JWT Authentication**, **HTML5**, **CSS3**, **Bootstrap 5**, and **JavaScript**.

Developed by **Ritam**.

---

## 🌟 Key Features & Capabilities

- **Role-Based Access Control (RBAC)**: Distinct permissions for `Admin`, `Seller`, and `Customer` roles.
- **RESTful API & Swagger UI**: Full OpenAPI 3 schema auto-generation (`/api/schema/swagger-ui/`).
- **JWT & Session Security**: SimpleJWT bearer tokens for API clients & Session authentication for Web UI.
- **Rich Product Catalog**: Multi-level Categories, Subcategories, Brands (Nike, Adidas, Puma, Apple, Sony, Samsung, Nintendo), Tags, SKU tracking, Inventory management, Price discount calculations, and Product Reviews/Ratings.
- **Cart & Coupon Engine**: Real-time subtotal calculation, 10% VAT tax calculator, flat/threshold shipping charges, and promotional coupon engine.
- **Order Management & Invoices**: Order placement, shipment tracking, return request submission, and automated PDF Invoice downloading generated via ReportLab.
- **Payment Gateway Ready**: Handlers for Cash on Delivery (COD), Stripe, and Razorpay.
- **Executive Dashboards**: Interactive Chart.js analytics for revenue growth, sales metrics, inventory low-stock alerts, and data export to CSV & Excel (`openpyxl`).
- **Dockerized**: Containerized deployment via `Dockerfile` and `docker-compose.yml`.

---

## 🏗️ Project Architecture

```
tin_tun_store/
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── DEPLOYMENT.md
├── postman_collection.json
├── shopflow/                # Main Project Configuration & URLs
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── accounts/            # User model, Roles, Address, Profile, JWT Auth
│   ├── products/            # Categories, Brands, Products, Reviews, Wishlist, Seed command
│   ├── cart/                # Cart, CartItem, Coupon logic, Tax/Shipping calculators
│   ├── orders/              # Orders, Items, Returns, PDF Invoice Generator
│   ├── payments/            # Transactions, Stripe, Razorpay & COD services
│   └── analytics/           # Dashboards, Revenue metrics, CSV/Excel exporters
├── static/                  # Glassmorphism CSS design system & JS
├── templates/               # Responsive Bootstrap 5 HTML templates
```

---

## 🌐 Live Deployment (Free Hosting on Render / Railway)

This project is configured with `render.yaml` and `build.sh` for **1-click free live deployment** on [Render.com](https://render.com).

### Steps to Host Live for Free:
1. Sign up on [Render.com](https://render.com) using your GitHub account.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: `https://github.com/ritammaity05-art/Tin-Tun-store.git`.
4. Render will automatically detect `build.sh` and `gunicorn shopflow.wsgi:application`.
5. Click **Create Web Service**. Your live URL (e.g., `https://tin-tun-store.onrender.com`) will be generated!

---

## 🚀 Quick Start Guide (Local)

### 1. Clone & Environment Setup
```bash
git clone https://github.com/your-username/tin-tun-store.git
cd tin-tun-store

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

### 3. Database Setup & Seed Data
```bash
python manage.py makemigrations accounts products cart payments orders analytics
python manage.py migrate
python manage.py seed_data
```

**Default Seed Credentials:**
- **Admin**: `admin@shopflowpro.com` / `AdminPass123!`
- **Seller**: `seller@shopflowpro.com` / `SellerPass123!`
- **Customer**: `customer@shopflowpro.com` / `CustomerPass123!`

### 4. Run Development Server
```bash
python manage.py runserver
```

Open your browser at `http://127.0.0.1:8000/`

---

## 📡 REST API & Documentation

- **Swagger UI**: `http://127.0.0.1:8000/api/schema/swagger-ui/`
- **ReDoc**: `http://127.0.0.1:8000/api/schema/redoc/`
- **Postman Collection**: Import `postman_collection.json` into Postman.

---

## 🧪 Testing

Run the full automated unit and API test suite:
```bash
python manage.py test
```

---

## 📄 License
Licensed under the MIT License. Developed by Ritam.
