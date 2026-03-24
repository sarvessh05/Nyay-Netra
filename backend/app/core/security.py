from slowapi import Limiter
from slowapi.util import get_remote_address

# We'll use in-memory rate limiting (simple & effective for MVP)
# Per-IP rate limiting
limiter = Limiter(key_func=get_remote_address)
