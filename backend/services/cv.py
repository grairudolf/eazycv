from sqlalchemy.orm import Session
from models.cv import CV
from schemas.cv import CVSchemaCreate
import uuid

def create_cv(db: Session, cv: CVSchemaCreate, user_id: uuid.UUID):
    db_cv = CV(
        user_id=user_id,
        personal=cv.personal.dict(),
        experience=[exp.dict() for exp in cv.experience],
        education=[edu.dict() for edu in cv.education],
        skills=cv.skills
    )
    db.add(db_cv)
    db.commit()
    db.refresh(db_cv)
    return db_cv

def get_cvs_by_user(db: Session, user_id: uuid.UUID):
    return db.query(CV).filter(CV.user_id == user_id).all()

def get_cv_by_id(db: Session, cv_id: int):
    return db.query(CV).filter(CV.id == cv_id).first()

def update_cv_with_optimization(db: Session, cv_id: int, optimized_text: str):
    db_cv = get_cv_by_id(db, cv_id)
    if db_cv:
        db_cv.optimized_cv = optimized_text
        db.commit()
        db.refresh(db_cv)
    return db_cv
