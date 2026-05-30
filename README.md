# Healthcare Web

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-green)](backend)
[![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-yellow)](Frontend)

A polished healthcare web application with a FastAPI backend and a modern static frontend. The project supports patient and doctor onboarding, review submission, and a clean role-based UI.

---

## 🚀 What This Project Offers

- **Patient registration and login** using a backend API
- **Doctor registration and login** with frontend convenience and backend validation
- **Doctor dashboard** to view patients and submit patient reviews
- **Patient dashboard** to check doctor-verified reports
- **FastAPI + SQLite** backend with simple ORM models
- **Responsive static frontend** with animation and interactive forms

---

## 📁 Project Structure

- `backend/`
  - `main.py` - FastAPI application startup
  - `auth.py` - Auth routes and review endpoints
  - `database.py` - SQLite engine and session setup
  - `models.py` - SQLAlchemy models for patients, doctors, and reviews
  - `schemas.py` - Pydantic schemas for request/response validation
  - `requirements.txt` - Python dependencies
- `Frontend/`
  - `index.html` - Landing page
  - `auth.html` - Unified login and signup interface
  - `patient.html` - Patient dashboard view
  - `doctor.html` - Doctor dashboard view
  - `assistant.html` - Supplemental UI page
  - `style.css` - Application styling
  - `script.js` - Frontend logic and API integration

---

## 🧩 Tech Stack

- Python 3
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- SQLite
- HTML, CSS, JavaScript
- Motion.js for animation

---

## ⚙️ Backend Setup

1. Open a terminal and go to the backend folder:

```bash
cd d:\Healthcare_web\backend
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the server:

```bash
uvicorn main:app --reload
```

4. Visit the backend at:

```text
http://127.0.0.1:8000
```

---

## 🌐 Frontend Setup

The frontend is static and can be opened directly in a browser or served with a simple static server.

### Option 1: Open directly

Open `Frontend/index.html` in your browser.

### Option 2: Serve with Python HTTP server

```bash
cd d:\Healthcare_web\Frontend
python -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500
```

---

## 🔌 API Endpoints

- `GET /` - API root health check
- `POST /auth/patient/signup` - Register a new patient
- `POST /auth/patient/signin` - Patient login by phone
- `POST /auth/doctor/signup` - Register a new doctor
- `POST /auth/doctor/signin` - Doctor login by ID, phone, or email
- `GET /auth/doctor/patients` - List all patients
- `POST /auth/doctor/review` - Submit a patient review
- `GET /auth/doctor/review/{patient_id}` - Retrieve reviews for a patient

---

## 💡 Important Notes

- Data is stored locally in `medexplain.db` using SQLite.
- Doctor signup flow currently saves doctor metadata in browser `localStorage` and generates a `doctor_id` for login.
- Save the generated doctor ID after registration.
- Frontend expects the backend to run at `http://127.0.0.1:8000`.

---

## ✅ Recommended Workflow

1. Start the backend server.
2. Open or serve the frontend.
3. Register a patient or doctor on `auth.html`.
4. Sign in and verify the respective dashboard flow.

---

## 📜 License

This project is licensed under the **Apache License 2.0**.
See `LICENSE.txt` for the full license text.

---

## ✨ Improvements You Can Make

- Add full doctor/patient profile management
- Add authentication tokens and secure sessions
- Replace browser-local doctor storage with a backend-managed registration flow
- Improve frontend layout and mobile responsiveness
