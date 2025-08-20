from fastapi import APIRouter, Query, HTTPException
from app.services.sheet_service import SheetService
from app.schemas.sheet_schema import SheetDataResponse

router = APIRouter()

@router.get("/", response_model=SheetDataResponse)
def get_sheet_data(range: str = Query("A1:Z100")):
    """
    Retorna os dados da planilha Google Sheets.
    """
    try:
        data = SheetService().get_sheet_data(range)
        return SheetDataResponse(values=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados da planilha: {str(e)}")

@router.get("/parameto_roleta", response_model=SheetDataResponse)
def get_parameto_roleta():
    """
    Retorna os dados da aba 'parameto_roleta' da planilha.
    """
    try:
        data = SheetService().get_sheet_data("parameto_roleta")
        return SheetDataResponse(values=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados da aba parameto_roleta: {str(e)}")

@router.get("/dados_roleta", response_model=SheetDataResponse)
def get_dados_roleta():
    """
    Retorna os dados da aba 'dados_roleta' da planilha.
    """
    try:
        data = SheetService().get_sheet_data("dados_roleta")
        return SheetDataResponse(values=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados da aba dados_roleta: {str(e)}")
