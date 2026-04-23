import json
from typing import List, Optional
from app.core.config import DATA_PATH

def retrieve_context(query: str, history: Optional[List] = None):
    """
    Search the laws.json dataset for entries matching user keywords.
    For follow-up support, it also considers keywords from the most recent user query in history.
    """
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            laws = json.load(f)
    except Exception as e:
        return []

    # Aggregate query words from current query and last user query if history exists
    query_words = set(query.lower().split())
    
    # If the current query is short (e.g., "What should I do"), include keywords from the last query for context
    if history and len(query_words) < 4:
        # Get the last message from the user
        last_user_query = next((msg.content for msg in reversed(history) if msg.role == "user"), "")
        if last_user_query:
            query_words.update(last_user_query.lower().split())

    # Remove filler words for better matching
    fillers = {"what", "should", "i", "do", "tell", "me", "about", "how", "to", "the", "a", "an", "is", "of"}
    search_keywords = query_words - fillers
    if not search_keywords:
        search_keywords = query_words # Fallback if everything is a filler

    scored_laws = []

    for entry in laws:
        # Calculate matching score
        score = sum(1 for kw in entry.get("keywords", []) if kw.lower() in search_keywords)
        
        # 2 bonus points if a keyword from the query matches the issue title
        issue_lower = entry.get("issue", "").lower()
        if any(word in issue_lower for word in search_keywords):
            score += 2

        if score > 0:
            # Format the entry into a single block of text for the AI context window
            laws_str = "\n".join([f"- {l['act']} ({', '.join(l['sections'])})" for l in entry.get("laws", [])])
            steps_str = "\n- ".join(entry.get("steps", []))
            proof_str = "\n- ".join(entry.get("proof_required", []))
            
            context_str = (
                f"### [LEGAL MATCH: {entry.get('issue')}] ###\n"
                f"CATEGORY: {entry.get('category')}\n"
                f"SEVERITY: {entry.get('severity')}\n"
                f"DESCRIPTION: {entry.get('description', 'N/A')}\n"
                f"RELEVANT STATUTES:\n{laws_str}\n"
                f"IMMEDIATE ACTIONABLE STEPS:\n- {steps_str}\n"
                f"EVIDENCE/PROOF REQUIRED:\n- {proof_str}\n"
                f"AUTHORITY TO APPROACH: {entry.get('authority', 'N/A')}\n"
                f"PROCESS RISK & EXPECTED DURATION: {entry.get('risk', 'N/A')}\n"
            )
            scored_laws.append((score, context_str))

    # Sort by score descending and return the top 2
    scored_laws.sort(key=lambda x: x[0], reverse=True)
    
    # Extract only the context strings
    top_matches = [item[1] for item in scored_laws[:2]]
    
    return top_matches
