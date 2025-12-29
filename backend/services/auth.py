from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from supabase import Client
from database.supabase import supabase

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Client = Depends(lambda: supabase)):
    try:
        user = db.auth.get_user(token)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid credentials: {e}")
