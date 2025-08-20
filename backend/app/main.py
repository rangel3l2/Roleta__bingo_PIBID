from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import sheet_routes

app = FastAPI(
    title="Roleta Bingo API",
    version="1.0.0"
)

# Libera CORS para qualquer origem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sheet_routes.router, prefix="/api/v1/sheets", tags=["sheets"])

# Para Vercel: handler para serverless
handler = app
