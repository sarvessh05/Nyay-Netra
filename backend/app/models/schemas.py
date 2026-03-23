# Pydantic schemas for the app.
from pydantic import BaseModel

class QueryRequest(BaseModel):
    query: str
    mode: str = "normal"
