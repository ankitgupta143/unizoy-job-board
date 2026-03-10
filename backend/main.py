"""
Unizoy Job Board – FastAPI Backend
Run with: uvicorn backend.main:app --reload
Docs at:  http://localhost:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import jobs, applications

app = FastAPI(
    title="Unizoy Job Board API",
    description="REST API for the Unizoy Job Board. Supports admin job management and candidate applications.",
    version="1.0.0",
)

# ── CORS (allow the React dev server) ─────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(jobs.router, prefix="/api")
app.include_router(applications.router, prefix="/api")


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": "Unizoy Job Board API", "version": "1.0.0"}


@app.get("/api/health", tags=["health"])
def health():
    return {"status": "healthy"}