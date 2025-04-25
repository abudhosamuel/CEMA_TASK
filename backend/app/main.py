from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os

# Import your database and CRUD logic
from app import models, database, crud

# Initialize FastAPI app
app = FastAPI(title="Health Information System")

# Setup CORS (allow frontend to access API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # For demo purposes. In production, specify your frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ========= Serve React Frontend =========
app.mount("/static", StaticFiles(directory="frontend_static/static"), name="static")

@app.get("/")
def serve_react():
    return FileResponse('frontend_static/index.html')


# ========= API Endpoints =========

@app.post("/programs")
def create_program(name: str, db: Session = Depends(get_db)):
    return crud.create_program(db, name)

@app.post("/clients")
def register_client(name: str, age: int, db: Session = Depends(get_db)):
    return crud.register_client(db, name, age)

@app.post("/clients/{client_id}/enroll")
def enroll_client(client_id: int, program_id: int, db: Session = Depends(get_db)):
    result = crud.enroll_client(db, client_id, program_id)
    if result == "already_enrolled":
        raise HTTPException(status_code=400, detail="Client is already enrolled in this program")
    if not result:
        raise HTTPException(status_code=404, detail="Client or Program not found")
    return {"msg": f"Client {client_id} enrolled in Program {program_id}"}

@app.get("/clients/{client_id}")
def get_client_profile(client_id: int, db: Session = Depends(get_db)):
    client = crud.get_client_profile(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return {
        "id": client.id,
        "name": client.name,
        "age": client.age,
        "programs": [program.name for program in client.programs]
    }

@app.get("/clients/search/")
def search_clients(name: str, db: Session = Depends(get_db)):
    clients = crud.search_clients(db, name)
    return [{"id": c.id, "name": c.name, "age": c.age} for c in clients]

@app.get("/clients")
def list_clients(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    return [{"id": c.id, "name": c.name} for c in clients]

@app.get("/programs")
def list_programs(db: Session = Depends(get_db)):
    programs = db.query(models.Program).all()
    return [{"id": p.id, "name": p.name} for p in programs]

# ========= End of API =========
