from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import SessionLocal
from models import Patient, Doctor, Review 
from schemas import *

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/patient/signup")
def patient_signup(data: PatientSignup, db: Session = Depends(get_db)):
    if db.query(Patient).filter(Patient.phone == data.phone).first():
        raise HTTPException(400, "Patient already exists")
    patient = Patient(**data.dict())
    db.add(patient)
    db.commit()
    return {"message": "Patient registered"}

@router.post("/patient/signin")
def patient_signin(data: PatientSignin, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.phone == data.phone).first()
    if not patient:
        raise HTTPException(404, "Patient not found")
    return {"message": "Login success"}

@router.post("/doctor/signup")
def doctor_signup(data: DoctorSignup, db: Session = Depends(get_db)):
    clean_doctor_id = data.doctor_id.strip()
    if db.query(Doctor).filter(Doctor.doctor_id == clean_doctor_id).first():
        raise HTTPException(400, "Doctor already exists")
    doctor = Doctor(
        doctor_id=clean_doctor_id,
        name=data.name,
        phone=data.phone,
        email=data.email
    )
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return {"message": "Doctor registered"}

@router.post("/doctor/signin")
def doctor_signin(data: DoctorSignin, db: Session = Depends(get_db)):
    identifier = data.doctor_id.strip()
    doctor = db.query(Doctor).filter(
        or_(
            Doctor.doctor_id == identifier,
            Doctor.phone == identifier,
            Doctor.email == identifier
        )
    ).first()
    if not doctor:
        raise HTTPException(404, "Doctor not found")
    return {
        "message": "Login success",
        "doctor": {
            "id": doctor.id,
            "doctor_id": doctor.doctor_id,
            "name": doctor.name
        }
    }

@router.get("/doctor/patients")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()

@router.post("/doctor/review")
def add_review(data: ReviewCreate, db: Session = Depends(get_db)):
    review = Review(**data.dict())
    db.add(review)
    db.commit()
    return {"message": "Review added successfully"}


@router.get("/doctor/review/{patient_id}")
def get_reviews(patient_id: int, db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.patient_id == patient_id).all()
