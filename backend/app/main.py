from fastapi import FastAPI
from app.routes.query import router

app = FastAPI(title="Nyaya Netra API")

app.include_router(router)
