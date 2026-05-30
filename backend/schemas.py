from pydantic import BaseModel

class PatientSignup(BaseModel):
    name: str
    phone: str
    email: str

class PatientSignin(BaseModel):
    phone: str

class DoctorSignup(BaseModel):
    doctor_id: str
    name: str
    phone: str
    email: str

class DoctorSignin(BaseModel):
    doctor_id: str
class ReviewCreate(BaseModel):
    patient_id: int
    doctor_id: int
    remark: str

class ReviewResponse(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    remark: str

    class Config:
        orm_mode = True

