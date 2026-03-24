import os
from dotenv import load_dotenv
from pathlib import Path

# Load variables from .env (located in backend/ root)
# The backend/.env is one level up from 'app/' or two levels up from 'core/'
ENV_PATH = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# API Keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Resource Paths
APP_DIR = Path(__file__).parent.parent  # Points to 'backend/app'
DATA_PATH = APP_DIR / "data" / "laws.json"
