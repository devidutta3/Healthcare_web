from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import router
from database import Base, engine

app = FastAPI()

# ✅ CORS MUST BE ADDED FIRST (before routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_methods=["*"],      # allows OPTIONS, POST, GET
    allow_headers=["*"],
    allow_credentials=False
)

# create tables
Base.metadata.create_all(bind=engine)

# include routers AFTER CORS
app.include_router(router)



@app.get("/")
def root():
    return {"message": "Welcome to the Techo Sayains Backend API!"}
