from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from backend.schemas.schemas import JobCreate, JobUpdate, JobOut
from backend.services.store import job_service

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/", response_model=List[JobOut])
def list_jobs(status: Optional[str] = Query(None, description="Filter by status: active | closed | draft")):
    """List all jobs. Candidates use ?status=active. Admins can omit filter."""
    return job_service.list_jobs(status=status)


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: str):
    """Get a single job by ID."""
    job = job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.post("/", response_model=JobOut, status_code=201)
def create_job(data: JobCreate):
    """Admin: create a new job listing."""
    return job_service.create_job(data)


@router.patch("/{job_id}", response_model=JobOut)
def update_job(job_id: str, data: JobUpdate):
    """Admin: update an existing job listing."""
    job = job_service.update_job(job_id, data)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.delete("/{job_id}", status_code=204)
def delete_job(job_id: str):
    """Admin: delete a job listing."""
    if not job_service.delete_job(job_id):
        raise HTTPException(status_code=404, detail="Job not found")