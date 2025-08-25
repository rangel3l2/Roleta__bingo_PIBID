import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

# Add the backend directory to Python path
BACKEND_DIR = os.path.dirname(os.path.realpath(__file__))
sys.path.append(BACKEND_DIR)

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

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

# Mount routes
app.include_router(router, prefix="/api/v1/sheets", tags=["sheets"])

# Handler for serverless
handler = Mangum(app)
