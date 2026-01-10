from sqlalchemy import Column, Integer, String, JSON
from database.database import Base
import uuid

class CV(Base):
    __tablename__ = "cvs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False) # Store UUID as string for SQLite compatibility
    personal = Column(JSON, nullable=False)
    experience = Column(JSON, nullable=False)
    education = Column(JSON, nullable=False)
    skills = Column(JSON, nullable=False)
    optimized_cv = Column(String, nullable=True)
