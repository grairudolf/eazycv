from dotenv import load_dotenv

# Load environment variables from .env file at the very beginning
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from services.cv import create_cv, get_cvs_by_user, get_cv_by_id
from schemas.cv import CVSchema, CVSchemaCreate
from database.database import get_db, Base, engine
from models.cv import CV
import uuid

# Demo user id used in local, unauthenticated mode
DEMO_USER_ID = uuid.UUID("00000000-0000-0000-0000-000000000001")

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware to allow the frontend to communicate with the backend
from fastapi.middleware.cors import CORSMiddleware

# Allow all origins in local development so frontend can be served from
# http://localhost:8080, http://127.0.0.1:8080, or other hosts without
# running into CORS issues.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to EazyCV API"}


@app.get("/users/")
def list_users(db: Session = Depends(get_db)):
    """Return a simple list of user IDs that have saved CVs.

    In local demo mode there will typically be a single demo user, but this
    endpoint is useful if you later extend the app to support multiple users.
    """
    rows = db.query(CV.user_id).distinct().all()
    return [{"user_id": str(row[0])} for row in rows]

@app.post("/cvs/", response_model=CVSchema)
def create_new_cv(cv: CVSchemaCreate, db: Session = Depends(get_db)):
    """Create a new CV for the demo user.

    The application now runs in a single-user, local demo mode without
    external authentication. All CVs are associated with a fixed demo user.
    """
    user_id = DEMO_USER_ID
    return create_cv(db=db, cv=cv, user_id=user_id)

@app.get("/cvs/", response_model=list[CVSchema])
def read_user_cvs(db: Session = Depends(get_db)):
    """Return all CVs for the demo user."""
    user_id = DEMO_USER_ID
    return get_cvs_by_user(db=db, user_id=user_id)

@app.get("/cvs/{cv_id}", response_model=CVSchema)
def read_cv(cv_id: int, db: Session = Depends(get_db)):
    cv = get_cv_by_id(db=db, cv_id=cv_id)
    if cv is None:
        raise HTTPException(status_code=404, detail="CV not found")
    return cv

from services.gemini import optimize_summary_with_gemini
from services.cv import update_cv_with_optimization

@app.post("/cvs/{cv_id}/optimize", response_model=CVSchema)
def optimize_cv(cv_id: int, db: Session = Depends(get_db)):
    cv = get_cv_by_id(db=db, cv_id=cv_id)
    if cv is None:
        raise HTTPException(status_code=404, detail="CV not found")

    # Extract the summary from the personal details
    summary_to_optimize = cv.personal.get("summary", "")
    if not summary_to_optimize:
        raise HTTPException(status_code=400, detail="CV has no summary to optimize.")

    # Call the updated Gemini service
    optimized_text = optimize_summary_with_gemini(summary_to_optimize)

    # Update the CV with the new, optimized summary
    return update_cv_with_optimization(db=db, cv_id=cv_id, optimized_text=optimized_text)
