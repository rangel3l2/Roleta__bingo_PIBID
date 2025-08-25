## Setup (Windows)

1. Create virtual environment:
```bat
python -m venv venv
```

2. Activate virtual environment:
```bat
venv\Scripts\activate
```

3. Install dependencies:
```bat
pip install -r requirements.txt
```

4. To deactivate the virtual environment when done:
```bat
deactivate
```

## Environment Variables Setup
1. Create a `.env` file in the root directory
2. Add your Google Sheets credentials:
```
GOOGLE_SHEETS_CREDENTIALS=your_credentials.json
GOOGLE_SHEETS_ID=your_spreadsheet_id
```
3. Place your Google Sheets credentials JSON file in the project root

Note: Make sure to get your credentials from Google Cloud Console and enable Google Sheets API.
