from fastapi import APIRouter, HTTPException, Request
from app.models.schemas import QueryRequest, QueryResponse
from app.services.rag import process_query
from app.core.security import limiter

router = APIRouter()

@router.post("/ask", response_model=QueryResponse)
@limiter.limit("5/minute")
async def ask_legal_query(request: Request, payload: QueryRequest):
    """
    Submit a legal query to 'Nyaya Netra'.
    The request is processed via our RAG pipeline (Retrieve -> Prompt -> AI).
    """
    try:
        # Pass the query string from our validated Pydantic model
        result = process_query(payload.query)
        
        # If the result is None or indicates a failure in the RAG logic, raise an error
        if not result:
            raise HTTPException(status_code=503, detail="AI services are currently unreachable.")
            
        return result
        
    except Exception as e:
        # Log the error and return a generic 500 status to the client
        print(f"API Route Error: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")
