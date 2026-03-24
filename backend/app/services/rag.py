from app.services.retriever import retrieve_context
from app.services.ai import call_gemini, call_groq

def build_prompt(query: str, context: list):
    """
    Constructs a structured legal prompt for the AI, integrating retrieved context.
    """
    context_text = "\n\n".join(context) if context else "No specific legal context found in our dataset."
    
    prompt = f"""
    You are 'Nyaya Netra', a premium AI legal assistant specialized in Indian law. 
    Your goal is to provide structured and empathetic legal guidance.

    ### USER QUERY ###
    {query}

    ### LEGAL CONTEXT (Retrieved from laws.json) ###
    {context_text}

    ### INSTRUCTIONS ###
    1. Provide a clear and accurate legal analysis.
    2. Base your response on the provided LEGAL CONTEXT if available. If no context is found, use your general legal knowledge but be cautious.
    3. You MUST respond ONLY in the following valid JSON structure:
    {{
        "issue": "Brief summary of the legal issue (max 10 words)",
        "law": "Formal name of the law or statute that applies",
        "steps": ["Action Step 1", "Action Step 2", "Action Step 3"],
        "risk": "Risk level (Low/Moderate/High) + 1 brief sentence explaining why",
        "advice": "Concise and actionable legal advice written directly to the user",
        "disclaimer": "AI guidance disclaimer: This is not a substitute for professional legal advice.",
        "model_used": "Leave this field empty (will be filled by the system)"
    }}
    """
    return prompt

def process_query(query: str):
    """
    Coordinates the RAG pipeline:
    1. Retrieves relevant legal context.
    2. Builds the prompt.
    3. Calls the primary AI (Gemini).
    4. Falls back to Groq if Gemini fails.
    5. Returns the structured dictionary.
    """
    # 1. Retrieve relevant legal facts
    context = retrieve_context(query)
    
    # 2. Build the AI instructions
    prompt = build_prompt(query, context)
    
    # 3. Attempt Primary Call (Gemini)
    response = call_gemini(prompt)
    model_name = "Gemini 1.5 Flash"
    
    # 4. Fallback to Groq if necessary
    if not response:
        print("Gemini failed. Falling back to Groq...")
        response = call_groq(prompt)
        model_name = "Groq / Llama 3.1"
        
    if response:
        # Stamp the response with the model that actually provided the answer
        response["model_used"] = model_name
        return response
        
    # If all AI services fail, return a structured error response
    return {
        "issue": "AI Service Temporarily Unavailable",
        "law": "N/A",
        "steps": ["Please try again in a few moments."],
        "risk": "N/A",
        "advice": "The legal assistant is experiencing high traffic. Your query is important to us.",
        "is_legal": False,
        "model_used": "Failed",
        "disclaimer": "N/A - Service Unavailable"
    }
