import sys
import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Ensure we can import from current directory
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.database import DATABASE_URL
from models.cv import CV

# Ensure we use the same logic for DB path as the app when running in backend dir
if DATABASE_URL.startswith("sqlite:///./"):
    # If running this script from backend/, it will look for ./eazycv.db
    pass

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def list_cvs():
    db = SessionLocal()
    try:
        cvs = db.query(CV).all()
        print(f"Found {len(cvs)} CVs:")
        for cv in cvs:
            print(f"ID: {cv.id} | User: {cv.user_id} | Name: {cv.personal.get('name', 'N/A')}")
    except Exception as e:
        print(f"Error accessing database: {e}")
        print("Make sure the database file exists and is initialized.")
    finally:
        db.close()

def clear_db():
    db = SessionLocal()
    try:
        num = db.query(CV).delete()
        db.commit()
        print(f"Deleted {num} CVs.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "clear":
        clear_db()
    else:
        list_cvs()
