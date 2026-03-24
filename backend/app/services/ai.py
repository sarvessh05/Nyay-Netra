import json
import google.generativeai as genai
from groq import Groq
from app.core.config import GEMINI_API_KEY, GROQ_API_KEY

def call_gemini(prompt: str):
    """
    Primary AI call using Google Gemini 1.5 Flash.
    Returns a parsed JSON dictionary or None on failure.
    """
    if not GEMINI_API_KEY:
        print("Gemini API Key missing.")
        return None
        
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # We request the model to return JSON. Gemini 1.5 supports JSON mode.
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return None

def call_groq(prompt: str):
    """
    Fallback AI call using Groq (Llama 3 70B).
    Returns a parsed JSON dictionary or None on failure.
    """
    if not GROQ_API_KEY:
        print("Groq API Key missing.")
        return None

    try:
        client = Groq(api_key=GROQ_API_KEY)
        
        # Groq also supports a native JSON mode.
        completion = client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"Groq API Error: {e}")
        return None
