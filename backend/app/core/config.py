import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GOOGLE_SHEET_ID: str = os.getenv("GOOGLE_SHEET_ID", "1Nhs68C4XDd7dIpLg0L9IdTBcgeuJ2GixOSWfXbJN5oQ")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "AIzaSyCU-CUcRlVZ8KmuiyFff7ECKtPn3aWdrFc")

settings = Settings()
