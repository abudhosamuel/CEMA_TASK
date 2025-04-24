from app import models
from sqlalchemy.orm import Session

def create_program(db: Session, program_name: str):
    program = models.Program(name=program_name)
    db.add(program)
    db.commit()
    db.refresh(program)
    return program

def register_client(db: Session, name: str, age: int):
    client = models.Client(name=name, age=age)
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

def enroll_client(db: Session, client_id: int, program_id: int):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    program = db.query(models.Program).filter(models.Program.id == program_id).first()
    if client and program:
        if program in client.programs:
            return "already_enrolled"
        client.programs.append(program)
        db.commit()
        return client
    return None


def get_client_profile(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()

def search_clients(db: Session, name_query: str):
    return db.query(models.Client).filter(models.Client.name.contains(name_query)).all()
