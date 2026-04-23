import time
from typing import List, Optional
from app.services.retriever import retrieve_context
from app.services.ai import call_gemini, call_groq
from app.services.formatter import format_ai_response

def build_prompt(query: str, context: list, history: Optional[list] = None):
    """
    Constructs a compassionate, high-fidelity legal prompt for the common man.
    Integrates rich context and handles conversation history for follow-up support.
    """
    context_text = "\n\n".join(context) if context else "No direct matches found in our local knowledge base. Use general Indian law (citing BNS/BNSS 2023 for criminal matters)."
    
    # Format history if it exists
    history_text = ""
    is_followup = False
    if history:
        is_followup = True
        history_text = "\n### PREVIOUS CONVERSATION ###\n"
        for msg in history:
            role = "USER" if msg.role == "user" else "ASSISTANT"
            history_text += f"{role}: {msg.content}\n"

    # Define intro instructions based on whether it is a follow-up
    if not is_followup:
        intro_instructions = 'If this is the FIRST message, acknowledge their problem with empathy (e.g., "I\'m sorry you\'re going through this, let\'s fix it together").'
    else:
        intro_instructions = 'This is a FOLLOW-UP query. Do NOT repeat the initial empathy or general introductions. Stay focused on the existing context.'

    prompt = f"""
    PERSONALITY: You are 'Nyaya Netra' (ਨਿਆਇ ਨੇਤਰ), a friendly and compassionate legal guardian for the common man in India. 
    Your tone must be reassuring, patient, and easy to understand. Avoid legal jargon where possible. 
    {intro_instructions}

    ### CONTEXT FROM DATABASE ###
    {context_text}

    {history_text}

    ### CURRENT USER QUERY ###
    {query}

    ### RESPONSE GUIDELINES ###
    1. Helpfulness is 90% of your job. Be a friend first, a lawyer second.
    2. Provide a definitive, actionable result. 
    3. CITE specific Sections/Acts clearly (BNS, BNSS, Consumer Act, etc.).
    4. FOLLLOW-UP LOGIC: If the user asks "What should I do" or "Tell me more", refer back to the context in the PREVIOUS CONVERSATION and the provided DATABASE CONTEXT. Do NOT hallucinate new unrelated categories (like Cyber Crime if the problem is Theft).
    5. You MUST respond ONLY in valid JSON with this exact schema:
    {{
        "issue": "Identify the core problem (refer to history if current query is vague)",
        "category": "Broad category (e.g., Criminal, Civil, Consumer)",
        "law_citation": "Exact Act/Sections",
        "explanation": "FRIENDLY summary. If follow-up, answer the specific question while keeping the old context. Do NOT re-introduce yourself.",
        "action_plan": ["Specific Step 1", "Step 2", "..."],
        "documents_needed": ["Proof A", ],
        "where_to_go": "Exact office or portal",
        "risk_and_timeline": "Realistic timeline and reassurance",
        "is_legal": true/false,
        "model_used": ""
    }}
    """
    return prompt

def process_query(query: str, history: Optional[list] = None):
    """
    Coordinates the RAG pipeline with history support and friendly fallbacks.
    """
    start_retrieval = time.time()
    # Pass history to retriever so it can maintain context for generic queries
    context = retrieve_context(query, history)
    retrieval_time = time.time() - start_retrieval
    
    prompt = build_prompt(query, context, history)
    
    start_ai = time.time()
    response = call_gemini(prompt)
    model_name = "Gemini 1.5 Flash"
    
    if not response:
        response = call_groq(prompt)
        model_name = "Groq / Llama 3.3"
        
    ai_time = time.time() - start_ai
    
    if response:
        formatted_response = format_ai_response(response)
        if formatted_response:
            formatted_response["model_used"] = model_name
            formatted_response["disclaimer"] = "Disclaimer: Nyaya Netra provides AI-generated legal info for educational purposes. Always consult a lawyer."
            
            return formatted_response
        
    # Safety fallback
    return {
        "issue": "Technical Delay",
        "category": "System",
        "law_citation": "N/A",
        "explanation": "I'm so sorry, but my legal systems are a bit slow right now. Give me a moment!",
        "action_plan": ["Please refresh and ask me again. I'm here to help!"],
        "documents_needed": ["N/A"],
        "where_to_go": "N/A",
        "risk_and_timeline": "N/A",
        "is_legal": False,
        "model_used": "Failed",
        "disclaimer": "N/A"
    }
