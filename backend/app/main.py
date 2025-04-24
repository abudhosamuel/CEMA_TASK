from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, database, crud
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Health Information System")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/programs")
def create_program(name: str, db: Session = Depends(get_db)):
    return crud.create_program(db, name)

@app.post("/clients")
def register_client(name: str, age: int, db: Session = Depends(get_db)):
    return crud.register_client(db, name, age)

@app.post("/clients/{client_id}/enroll")
def enroll_client(client_id: int, program_id: int, db: Session = Depends(get_db)):
    client = crud.enroll_client(db, client_id, program_id)
    if not client:
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
