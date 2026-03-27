from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.query import router as query_router

# Initialize the Nyaya Netra API
from app.core.security import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

import time

app = FastAPI(
    title="Nyay Netra Backend API",
    description="Advanced RAG-based Legal Assistant Engine"
)

# 🕒 Response Time Middleware
@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    print(f"DEBUG: Request to {request.url.path} took {process_time:.4f}s")
    return response

# Add Rate Limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 🌍 Configure CORS (Cross-Origin Resource Sharing)
# This is essential for Phase 3 (Frontend) to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# 🗺️ Register API Route Groups
# Prefixed with /api for clean versioning and separation
app.include_router(query_router, prefix="/api")

@app.get("/")
def read_root():
    """
    Base health check endpoint to verify backend status.
    """
    return {
        "name": "Nyaya Netra API",
        "status": "Healthy and Operational",
        "documentation": "/docs"
    }
