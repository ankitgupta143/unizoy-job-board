"""
In-memory data store for Unizoy Job Board.
Replace with a real database (PostgreSQL + SQLAlchemy) for production.
"""
from datetime import date
from typing import Dict, List, Optional
import uuid

from backend.schemas.schemas import JobCreate, JobUpdate, ApplicationCreate


# ── Seed data ────────────────────────────────────────────────────────────────

JOBS: Dict[str, dict] = {
    "1": {
        "id": "1",
        "title": "Senior Frontend Engineer",
        "department": "Engineering",
        "location": "Remote",
        "type": "Full-time",
        "salary": "$120k – $160k",
        "description": "We're looking for a Senior Frontend Engineer to lead UI development.",
        "requirements": ["5+ years React/Next.js", "TypeScript", "Design systems"],
        "postedAt": date(2025, 3, 1),
        "status": "active",
    },
    "2": {
        "id": "2",
        "title": "Backend Engineer – Node.js",
        "department": "Engineering",
        "location": "New York, NY",
        "type": "Full-time",
        "salary": "$110k – $150k",
        "description": "Join our backend team to build scalable APIs powering millions of users.",
        "requirements": ["4+ years Node.js", "PostgreSQL", "REST & GraphQL"],
        "postedAt": date(2025, 3, 5),
        "status": "active",
    },
    "3": {
        "id": "3",
        "title": "Product Designer",
        "department": "Design",
        "location": "San Francisco, CA",
        "type": "Full-time",
        "salary": "$100k – $140k",
        "description": "Shape the visual language of Unizoy from research to high-fidelity designs.",
        "requirements": ["3+ years product design", "Figma expert", "User testing experience"],
        "postedAt": date(2025, 3, 8),
        "status": "active",
    },
}

APPLICATIONS: Dict[str, dict] = {}


# ── Job service ───────────────────────────────────────────────────────────────

class JobService:

    def list_jobs(self, status: Optional[str] = None) -> List[dict]:
        jobs = list(JOBS.values())
        if status:
            jobs = [j for j in jobs if j["status"] == status]
        # Attach application count
        for job in jobs:
            job["applicationCount"] = sum(
                1 for a in APPLICATIONS.values() if a["jobId"] == job["id"]
            )
        return jobs

    def get_job(self, job_id: str) -> Optional[dict]:
        job = JOBS.get(job_id)
        if job:
            job["applicationCount"] = sum(
                1 for a in APPLICATIONS.values() if a["jobId"] == job_id
            )
        return job

    def create_job(self, data: JobCreate) -> dict:
        job_id = str(uuid.uuid4())
        job = {
            "id": job_id,
            **data.dict(),
            "type": data.type.value,
            "postedAt": date.today(),
            "status": "active",
            "applicationCount": 0,
        }
        JOBS[job_id] = job
        return job

    def update_job(self, job_id: str, data: JobUpdate) -> Optional[dict]:
        job = JOBS.get(job_id)
        if not job:
            return None
        updates = {k: v for k, v in data.dict().items() if v is not None}
        if "type" in updates and hasattr(updates["type"], "value"):
            updates["type"] = updates["type"].value
        if "status" in updates and hasattr(updates["status"], "value"):
            updates["status"] = updates["status"].value
        JOBS[job_id].update(updates)
        return JOBS[job_id]

    def delete_job(self, job_id: str) -> bool:
        if job_id not in JOBS:
            return False
        del JOBS[job_id]
        return True


# ── Application service ───────────────────────────────────────────────────────

class ApplicationService:

    def list_applications(self, job_id: Optional[str] = None) -> List[dict]:
        apps = list(APPLICATIONS.values())
        if job_id:
            apps = [a for a in apps if a["jobId"] == job_id]
        return apps

    def get_application(self, app_id: str) -> Optional[dict]:
        return APPLICATIONS.get(app_id)

    def create_application(self, job_id: str, data: ApplicationCreate) -> Optional[dict]:
        if job_id not in JOBS:
            return None
        app_id = str(uuid.uuid4())
        app = {
            "id": app_id,
            "jobId": job_id,
            "name": data.name,
            "email": data.email,
            "resumeLink": str(data.resumeLink),
            "coverNote": data.coverNote,
            "appliedAt": date.today(),
            "status": "pending",
        }
        APPLICATIONS[app_id] = app
        return app


job_service = JobService()
application_service = ApplicationService()