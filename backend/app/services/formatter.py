import json
import re

def format_ai_response(raw_response):
    """
    Cleans and validates the raw output from the AI models.
    Handles common issues like markdown code blocks and partial JSON.
    """
    if isinstance(raw_response, dict):
        return raw_response
        
    if not isinstance(raw_response, str):
        return None

    try:
        # 1. Strip markdown code blocks if present (e.g., ```json ... ```)
        clean_text = re.sub(r'^```json\s*|\s*```$', '', raw_response.strip(), flags=re.MULTILINE)
        
        # 2. Try to parse as JSON
        data = json.loads(clean_text)
        
        # 3. Basic validation of required fields for the new rich schema
        required_fields = ["issue", "category", "law_citation", "explanation", "action_plan", "documents_needed", "where_to_go", "risk_and_timeline"]
        for field in required_fields:
            if field not in data:
                data[field] = "Information not provided by AI." if field != "action_plan" and field != "documents_needed" else []
                
        return data
        
    except json.JSONDecodeError:
        return None
