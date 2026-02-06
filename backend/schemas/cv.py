from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class PersonalInfo(BaseModel):
    name: str
    title: str
    email: str
    phone: str
    location: str
    website: Optional[str] = None
    linkedin: Optional[str] = None
    summary: str

class Experience(BaseModel):
    role: str
    company: str
    startDate: str
    endDate: str
    description: str

class Education(BaseModel):
    degree: str
    institution: str
    startDate: str
    endDate: str
    description: Optional[str] = None

class CVSchemaCreate(BaseModel):
    personal: PersonalInfo
    experience: List[Experience]
    education: List[Education]
    skills: List[str]

class CVSchema(CVSchemaCreate):
    id: int
    user_id: str
    optimized_cv: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
