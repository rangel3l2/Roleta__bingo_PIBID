from app.services.sheet_service import SheetService

def test_get_sheet_data():
    service = SheetService()
    data = service.get_sheet_data("A1:B2")
    assert isinstance(data, list)
