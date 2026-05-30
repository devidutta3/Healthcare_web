from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone = Column(String, unique=True)
    email = Column(String)


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True)
    doctor_id = Column(String, unique=True)
    name = Column(String)
    phone = Column(String)
    email = Column(String)


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    remark = Column(String)

    patient = relationship("Patient")
    doctor = relationship("Doctor")
