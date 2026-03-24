from pydantic import BaseModel
from typing import List

class QueryRequest(BaseModel):
    """
    Standard request schema for a legal query.
    """
    query: str

class QueryResponse(BaseModel):
    """
    Structured response schema for the AI legal assistant.
    Matches the JSON format returned by the RAG engine.
    """
    issue: str
    law: str
    steps: List[str]
    risk: str
    advice: str
    is_legal: bool
    model_used: str
    disclaimer: str = "Disclaimer: Nyay Netra provides AI-generated legal information for educational purposes only. It is not a substitute for professional legal advice. Consult a qualified lawyer for your specific case."
