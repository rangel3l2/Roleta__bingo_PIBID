from pydantic import BaseModel
from typing import List

class SheetDataResponse(BaseModel):
    values: List[list]
