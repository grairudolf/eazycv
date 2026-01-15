import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.declarative import declarative_base

# Use a file-based SQLite database for demonstration purposes
# DATABASE_URL = "sqlite:///./eazycv.db"

DATABASE_URL = os.getenv("DATABASE_URL")

# connect_args is needed for SQLite to allow multi-threaded access
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
