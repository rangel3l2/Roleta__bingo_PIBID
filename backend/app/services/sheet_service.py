from app.infrastructure.sheet_gateway import SheetGateway

class SheetService:
    def __init__(self):
        self.gateway = SheetGateway()

    def get_sheet_data(self, range_: str):
        data = self.gateway.fetch_sheet(range_)
        print("Dados recebidos da planilha:", data)  # <-- Adicionado para debug
        return data
