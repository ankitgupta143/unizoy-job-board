from fastapi import APIRouter, HTTPException
from typing import List

from backend.schemas.schemas import ApplicationCreate, ApplicationOut
from backend.services.store import application_service, job_service

router = APIRouter(tags=["applications"])


@router.post("/jobs/{job_id}/applications", response_model=ApplicationOut, status_code=201)
def apply_to_job(job_id: str, data: ApplicationCreate):
    """Candidate: submit an application to a job."""
    job = job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job["status"] != "active":
        raise HTTPException(status_code=400, detail="This job is no longer accepting applications")

    app = application_service.create_application(job_id, data)
    if not app:
        raise HTTPException(status_code=500, detail="Failed to create application")
    return app


@router.get("/jobs/{job_id}/applications", response_model=List[ApplicationOut])
def list_job_applications(job_id: str):
    """Admin: list all applications for a job."""
    job = job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return application_service.list_applications(job_id=job_id)


@router.get("/applications", response_model=List[ApplicationOut])
def list_all_applications():
    """Admin: list all applications across all jobs."""
    return application_service.list_applications()


@router.get("/applications/{app_id}", response_model=ApplicationOut)
def get_application(app_id: str):
    """Admin: get a specific application."""
    app = application_service.get_application(app_id)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app