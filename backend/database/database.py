import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.declarative import declarative_base

# Use a file-based SQLite database for demonstration purposes
# Default to a local SQLite file when DATABASE_URL is not set so tests
# and local development work without additional env configuration.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./eazycv.db")

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
