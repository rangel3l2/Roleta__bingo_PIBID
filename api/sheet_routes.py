from http.server import BaseHTTPRequestHandler
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
import json
from urllib.parse import parse_qs

def get_sheet_data(range_name):
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    SPREADSHEET_ID = os.environ.get('GOOGLE_SHEETS_ID')
    
    credentials_path = 'credencials.json'
    credentials = service_account.Credentials.from_service_account_file(
        credentials_path, scopes=SCOPES)
    
    service = build('sheets', 'v4', credentials=credentials)
    sheet = service.spreadsheets()
    result = sheet.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=range_name
    ).execute()
    return result.get('values', [])

def handler(request):
    if request.method == 'GET':
        path = request.path
        if path.endswith('/parameto_roleta'):
            data = get_sheet_data('parameto_roleta')
            return {
                'statusCode': 200,
                'body': json.dumps({'values': data}),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
    return {'statusCode': 404}
