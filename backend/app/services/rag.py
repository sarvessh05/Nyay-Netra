# RAG engine logic.
from app.services.retriever import retrieve_context
from app.services.ai import call_ai

def process_query(query: str):
    context = retrieve_context(query)
    # prompt = build_prompt(query, context)
    # response = call_ai(prompt)
    return {"message": "Processing..."}
