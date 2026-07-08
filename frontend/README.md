# Gloss & Glow Booking Platform

A full-stack booking and management platform built for **Gloss & Glow Car Detailing Studio**.

The platform allows customers to book detailing services online while providing administrators with a secure dashboard to manage appointments and services.

---

# Features

## Customer Side

- Browse available detailing services
- View service pricing and descriptions
- Explore the gallery
- Book appointments online
- Dynamic service selection
- Dynamic available time slots
- Booking validation
- Responsive mobile-friendly interface
- Automatic scroll restoration between pages

---

## Admin Side

- Secure admin login
- Appointment management dashboard
- Add new appointments
- Edit appointments
- Delete appointments
- Update appointment status
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- Search appointments
- Manage services
  - Add services
  - Edit services
  - Activate/Deactivate services

---

## Backend

- REST API built with Flask
- SQLite database
- Session-based authentication
- Backend validation
- CRUD operations for appointments
- CRUD operations for services
- Environment variable support
- CORS configuration

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- React Icons

## Backend

- Flask
- SQLite
- Flask-Session
- Flask-CORS
- Gunicorn

---

# Project Structure

```text
gloss-glow-booking-platform/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── run.py
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│
├── .gitignore
└── README.md
```

---

# API Overview

## Customer APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Fetch active services |
| GET | `/api/slots` | Fetch available time slots |
| GET | `/api/gallery` | Fetch gallery images |
| POST | `/api/appointments` | Create appointment |

---

## Admin APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET | `/api/admin/dashboard` | Dashboard summary |
| GET | `/api/admin/appointments` | Fetch appointments |
| PUT | `/api/admin/appointments/:id` | Update appointment |
| DELETE | `/api/admin/appointments/:id` | Delete appointment |
| GET | `/api/admin/services` | Fetch services |
| POST | `/api/admin/services` | Add service |
| PUT | `/api/admin/services/:id` | Update service |
| DELETE | `/api/admin/services/:id` | Delete service |

---

# Current Version

**Version:** v1.0

### Implemented

- Customer booking system
- Admin authentication
- Appointment management
- Service management
- Dynamic booking form
- Responsive UI

### Planned Future Enhancements

- SMS notifications
- Email confirmations
- Online payments
- Dashboard analytics
- Appointment notifications

---

# Author

**Bansari Akhani**

M.Sc. Information Technology

Internship Project — Gloss & Glow Booking & Management Platform