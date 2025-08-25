import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Get root directory
ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes after CORS setup
from app.api.v1.sheet_routes import router

# Mount routes and static files
app.include_router(router, prefix="/api/v1/sheets", tags=["sheets"])
if os.path.exists(FRONTEND_DIR):
    app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
else:
    print(f"Warning: Frontend directory not found at {FRONTEND_DIR}")
