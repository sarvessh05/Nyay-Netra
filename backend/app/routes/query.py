from fastapi import APIRouter
from app.services.rag import process_query

router = APIRouter()

@router.post("/ask")
def ask(payload: dict):
    result = process_query(payload.get("query", ""))
    return result
