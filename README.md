# Healthcare Web

A lightweight healthcare web application with a FastAPI backend and a static frontend. It supports patient registration and sign-in, doctor registration and sign-in, patient listing for doctors, and review submission.

## Project Structure

- `backend/`
  - `main.py` - FastAPI application entrypoint.
  - `auth.py` - Authentication and review-related routes.
  - `database.py` - SQLite database configuration.
  - `models.py` - SQLAlchemy ORM models for patients, doctors, and reviews.
  - `schemas.py` - Pydantic request/response schemas.
  - `requirements.txt` - Python dependencies.
- `Frontend/`
  - `index.html` - Landing page.
  - `auth.html` - Login and signup page for patients and doctors.
  - `patient.html` - Patient dashboard.
  - `doctor.html` - Doctor dashboard.
  - `login.html` - Login page (if used separately).
  - `signup.html` - Signup page (if used separately).
  - `assistant.html` - Additional user interface page.
  - `style.css` - Frontend styling.
  - `script.js` - Frontend logic and API integration.

## Key Features

- Patient signup and sign-in via backend API
- Doctor signup via frontend local storage and sign-in via backend/local storage
- Doctor can view registered patients
- Doctor can add and retrieve patient reviews
- Simple static frontend with role-specific pages

## Tech Stack

- Python 3
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- SQLite
- HTML/CSS/JavaScript
- Motion.js for UI animation

## Backend Setup

1. Navigate to the backend folder:

```bash
cd d:\Healthcare_web\backend
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

## Frontend Setup

The frontend is static and can be opened directly in a browser or served with a simple static server.

### Option 1: Open directly

Open `Frontend/index.html` in your browser.

### Option 2: Serve from a simple HTTP server

From the `Frontend` folder:

```bash
cd d:\Healthcare_web\Frontend
python -m http.server 5500
```

Then visit `http://127.0.0.1:5500`.

## API Endpoints

- `GET /` - Health check endpoint
- `POST /auth/patient/signup` - Register a new patient
- `POST /auth/patient/signin` - Patient login by phone
- `POST /auth/doctor/signup` - Register a new doctor
- `POST /auth/doctor/signin` - Doctor login by ID, phone, or email
- `GET /auth/doctor/patients` - List all patients
- `POST /auth/doctor/review` - Create a review for a patient
- `GET /auth/doctor/review/{patient_id}` - Get reviews for a patient

## Important Notes

- The backend uses SQLite and stores data in `medexplain.db`.
- Doctor signup flow in the frontend stores doctor details in browser `localStorage` and generates a `doctor_id` for login.
- Make sure to save the generated doctor login ID after signup.
- The frontend expects the backend to be reachable at `http://127.0.0.1:8000`.

## Recommended Workflow

1. Start the backend server.
2. Open the frontend.
3. Register a patient or doctor on `auth.html`.
4. Sign in as a patient or doctor and test dashboard functionality.

## License

This project does not include a license file. Add a license if you plan to share or distribute the code.
