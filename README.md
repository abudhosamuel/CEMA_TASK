
 Health Information System

A Full-Stack Health Information System built with React.js and FastAPI to help doctors manage clients and health programs such as TB, Malaria, HIV, etc.

This system allows:

Client registration

Program creation

Enrolling clients into programs

Searching and viewing client profiles

API-first design for easy integration with other systems


## Tech Stack

Frontend - React.js, Axios, React Router  
Backend - FastAPI (Python), SQLAlchemy, SQLite Server  
API Docs - Swagger UI

## Features

Create health programs (e.g., TB, Malaria, HIV)

Register new clients

Enroll clients into one or more programs

Search for clients by name

View detailed client profiles with enrolled programs

RESTful API exposed for external integrations


## Authors

- [@abudhosamuel](https://www.github.com/abudhosamuel)


## Installation

## Clone the Repository

git clone https://github.com/abudhosamuel/CEMA_TASK.git

## Backend Setup (FastAPI)

cd backend  
python3 -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt  
uvicorn app.main:app --reload

API available at: http://127.0.0.1:8000
Swagger Docs: http://127.0.0.1:8000/docs
    
## FrontEnd Setup (React)

In a new terminal:

cd frontend  
npm install  
npm start

## Deployment


https://health-information-system.onrender.com
