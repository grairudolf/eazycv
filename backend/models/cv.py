from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from database.database import Base

class CV(Base):
    __tablename__ = "cvs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), index=True, nullable=False)
    personal = Column(JSON, nullable=False)
    experience = Column(JSON, nullable=False)
    education = Column(JSON, nullable=False)
    skills = Column(JSON, nullable=False)
    optimized_cv = Column(String, nullable=True)
