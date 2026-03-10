from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import Optional, List
from datetime import date
from enum import Enum


class JobType(str, Enum):
    full_time = "Full-time"
    part_time = "Part-time"
    contract = "Contract"
    internship = "Internship"


class JobStatus(str, Enum):
    active = "active"
    closed = "closed"
    draft = "draft"


# --- Job Schemas ---

class JobCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=120)
    department: str = Field(..., min_length=1)
    location: str = Field(..., min_length=1)
    type: JobType = JobType.full_time
    salary: str = Field(..., min_length=1)
    description: str = Field(..., min_length=20)
    requirements: List[str] = Field(..., min_items=1)


class JobUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    type: Optional[JobType] = None
    salary: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    status: Optional[JobStatus] = None


class JobOut(BaseModel):
    id: str
    title: str
    department: str
    location: str
    type: JobType
    salary: str
    description: str
    requirements: List[str]
    postedAt: date
    status: JobStatus
    applicationCount: int = 0

    class Config:
        from_attributes = True


# --- Application Schemas ---

class ApplicationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    resumeLink: HttpUrl
    coverNote: Optional[str] = Field(None, max_length=2000)


class ApplicationOut(BaseModel):
    id: str
    jobId: str
    name: str
    email: str
    resumeLink: str
    coverNote: Optional[str]
    appliedAt: date
    status: str = "pending"