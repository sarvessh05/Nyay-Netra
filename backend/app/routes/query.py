from fastapi import APIRouter, HTTPException, Request
from app.models.schemas import QueryRequest, QueryResponse
from app.services.rag import process_query
from app.core.security import limiter

router = APIRouter()

@router.get("/health")
async def health_check():
    """
    Returns the server health status.
    """
    return {"status": "healthy", "service": "Nyay Netra Backend", "version": "1.0.1"}

@router.post("/ask", response_model=QueryResponse)
@limiter.limit("5/minute")
async def ask_legal_query(request: Request, payload: QueryRequest):
    """
    Submit a legal query to 'Nyaya Netra'.
    """
    try:
        result = process_query(payload.query, payload.history)
        
        # If AI failed, return a 503 status
        if result.get("model_used") == "Failed":
            raise HTTPException(
                status_code=503, 
                detail="AI legal services are currently overloaded. Please try again later."
            )
            
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"API Route Error: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")
