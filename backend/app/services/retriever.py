import json
from app.core.config import DATA_PATH

def retrieve_context(query: str):
    """
    Search the laws.json dataset for entries matching user keywords.
    Returns the top 2 matching entries as context strings for the AI.
    """
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            laws = json.load(f)
    except Exception as e:
        print(f"Error loading laws: {e}")
        return []

    query_words = set(query.lower().split())
    scored_laws = []

    for entry in laws:
        # Calculate matching score
        # 1 point for every keyword match
        score = sum(1 for kw in entry.get("keywords", []) if kw.lower() in query_words)
        
        # 2 bonus points if a keyword from the query matches the issue title
        issue_lower = entry.get("issue", "").lower()
        if any(word in issue_lower for word in query_words):
            score += 2

        if score > 0:
            # Format the entry into a single block of text for the AI context window
            context_str = (
                f"### Legal Context Item ###\n"
                f"Topic: {entry.get('issue')}\n"
                f"Applicable Law: {entry.get('law')}\n"
                f"Recommended Steps: {', '.join(entry.get('steps', []))}\n"
                f"Risk Profile: {entry.get('risk')}\n"
            )
            scored_laws.append((score, context_str))

    # Sort by score descending and return the top 2
    scored_laws.sort(key=lambda x: x[0], reverse=True)
    
    # Extract only the context strings
    top_matches = [item[1] for item in scored_laws[:2]]
    
    return top_matches
