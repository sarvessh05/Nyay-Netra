from pydantic import BaseModel
from typing import List, Optional

class Message(BaseModel):
    """
    Represents a single message in a conversation.
    """
    role: str  # 'user' or 'assistant'
    content: str

class QueryRequest(BaseModel):
    """
    Standard request schema for a legal query.
    """
    query: str
    history: Optional[List[Message]] = []

class QueryResponse(BaseModel):
    """
    Rich response schema for the AI legal assistant.
    Provides detailed legal mapping and actionable plans for the common man.
    """
    issue: str
    category: str
    law_citation: str
    explanation: str
    action_plan: List[str]
    documents_needed: List[str]
    where_to_go: str
    risk_and_timeline: str
    is_legal: bool
    model_used: str
    disclaimer: str = "Disclaimer: Nyaya Netra provides AI-generated legal info for educational purposes. It is NOT legal advice. Always consult a lawyer."
