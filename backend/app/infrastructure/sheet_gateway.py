import requests
from app.core.config import settings

class SheetGateway:
    def fetch_sheet(self, range_: str):
        url = (
            f"https://sheets.googleapis.com/v4/spreadsheets/"
            f"{settings.GOOGLE_SHEET_ID}/values/{range_}?key={settings.GOOGLE_API_KEY}"
        )
        try:
            resp = requests.get(url)
            resp.raise_for_status()
            data = resp.json()
            return data.get("values", [])
        except Exception as e:
            print("Erro ao buscar dados da planilha:", e)
            if hasattr(e, 'response') and e.response is not None:
                print("Resposta do Google:", e.response.text)
            raise
