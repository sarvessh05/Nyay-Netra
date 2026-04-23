# ⚖️ Nyaya Netra — API Architecture & Documentation

<div align="center">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</div>

> **Nyaya Netra** provides a robust, low-latency API designed to process natural language legal queries, interpret context via RAG, and return structured, actionable legal advice conforming to Indian Law (BNS/BNSS 2023).

---

## 🚀 Endpoint Overview

| Method | Endpoint | Description | Auth Required | Rate Limit |
| :--- | :--- | :--- | :---: | :---: |
| `GET` | `/` | Base health check and API system info | ❌ | None |
| `GET` | `/api/health` | Lightweight ping to wake up the server (Cold Starts) | ❌ | None |
| `POST` | `/api/ask` | Primary query inference endpoint. Processes legal queries. | ❌ | 5/minute |

---

## 📡 Detailed API Specifications

### 1. `GET /api/health`
**Purpose**: Verifies that the inference server is alive and operational. Used extensively by the frontend during initial load to mitigate Render/Cloud cold-start delays.

#### Response (200 OK)
```json
{
  "status": "success",
  "processed_at": "2024-03-24T12:00:00Z"
}
```

---

### 2. `POST /api/ask`
**Purpose**: The central AI processing hub. Accepts natural language input and historical conversation context to maintain empathetic, context-aware dialogues.

#### 📥 Request Body `(application/json)`
| Key | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `query` | `string` | ✅ | The legal question or situation described by the user. |
| `history` | `array` | ❌ | Array of previous messages for context tracking. |

**Example Request:**
```json
{
  "query": "My landlord locked me out without notice.",
  "history": [
    { "role": "user", "content": "Hi there" },
    { "role": "assistant", "content": "How can I assist your legal rights today?" }
  ]
}
```

#### 📤 Response `(application/json)`
The response is guaranteed to match the strict `QueryResponse` schema using Pydantic validation.

| Key | Type | Description |
| :--- | :--- | :--- |
| `issue` | `string` | Distilled core problem (e.g., "Illegal Eviction"). |
| `category` | `string` | Broad legal domain (e.g., "Civil Law"). |
| `law_citation` | `string` | Specific acts and sections (e.g., "Transfer of Property Act"). |
| `explanation` | `string` | Human-friendly description of the legal standing. |
| `action_plan` | `array<string>` | Step-by-step actionable guide. |
| `documents_needed`| `array<string>` | Required proof (e.g., "Rent Agreement"). |
| `where_to_go` | `string` | Specific authority to approach. |
| `risk_and_timeline`| `string` | Expected legal timeline and risks. |
| `is_legal` | `boolean` | Flag if the issue is a genuine legal matter. |
| `model_used` | `string` | Tracks whether Gemini or Groq handled the request. |
| `disclaimer` | `string` | Appended mandatory legal disclaimer. |

**Example Response:**
```json
{
  "issue": "Illegal Eviction and Lockout",
  "category": "Civil - Property Law",
  "law_citation": "Transfer of Property Act, 1882",
  "explanation": "Your landlord cannot legally lock you out without a court order...",
  "action_plan": [
    "Call the local police non-emergency line.",
    "Draft a formal legal notice."
  ],
  "documents_needed": ["Rental Agreement", "Utility Bills in your name"],
  "where_to_go": "Local Police Station / Civil Court",
  "risk_and_timeline": "Immediate injunction possible within 72 hours.",
  "is_legal": true,
  "model_used": "Gemini 1.5 Flash",
  "disclaimer": "Disclaimer: Nyaya Netra provides AI-generated legal info..."
}
```

#### ⚠️ Error Codes

| Code | Meaning | Resolution |
| :--- | :--- | :--- |
| `429` | **Too Many Requests** | Exceeded the 5/minute limit. Implement client-side backoff. |
| `500` | **Internal Error** | Parsing error or pipeline failure. Check server logs. |
| `503` | **Service Unavailable** | Both Gemini and Groq AI endpoints are unreachable. |

---

## 🔒 Security & Middleware

- **CORS Mitigation**: Flexible CORS setup integrated tightly with `fastapi.middleware.cors.CORSMiddleware`.
- **Rate Limiting**: Enforced via `slowapi`, protecting the `/ask` route from abuse.
- **Latency Tracking**: Custom `http` middleware appends an `X-Process-Time` header to all outgoing responses, allowing precise analytics on RAG processing times.
