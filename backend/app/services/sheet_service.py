import os
from dotenv import load_dotenv
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

load_dotenv()

from app.infrastructure.sheet_gateway import SheetGateway

class SheetService:
    def __init__(self):
        self.SPREADSHEET_ID = os.getenv('GOOGLE_SHEETS_ID')
        self.API_KEY = os.getenv('GOOGLE_API_KEY')
        
        if not self.SPREADSHEET_ID or not self.API_KEY:
            raise ValueError("Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY in .env")
        
        try:
            self.service = build('sheets', 'v4', developerKey=self.API_KEY)
        except Exception as e:
            print(f"Error initializing Sheets API: {str(e)}")
            raise

    def get_sheet_data(self, range_name):
        try:
            sheet = self.service.spreadsheets()
            result = sheet.values().get(
                spreadsheetId=self.SPREADSHEET_ID,
                range=range_name
            ).execute()
            return result.get('values', [])
        except HttpError as e:
            if e.resp.status == 403:
                print("API access denied. Please enable Google Sheets API in Google Cloud Console")
            raise
        except Exception as e:
            print(f"Error fetching sheet data: {str(e)}")
            raise
