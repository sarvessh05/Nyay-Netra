# 🧪 Nyaya Netra — Testing Documentation

<div align="center">
  <img src="https://img.shields.io/badge/Testing-Status%3A%20Pending-orange?style=for-the-badge" />
</div>

> Comprehensive strategies and scenarios to ensure the reliability of the Nyaya Netra RAG engine and its Cyber Ethereal frontend.

---

## 🎯 Testing Approach

We enforce testing across three distinct planes:
1. **Unit Testing**: Isolating formatters, AI mock responses, and context retrieval accuracy.
2. **Integration Testing**: Verifying the pathway from FastAPI routes down to the Groq/Gemini calls.
3. **E2E / Frontend Testing**: Validating user flows, animations, and API interactions.

---

## 🗜️ Backend Testing Scenarios (Pytest Guidelines)

To run the suite (once implemented): `pytest tests/ --cov=app`

| Test Category | Target Function | Scenario | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **Logic Unit** | `retrieve_context` | Query contains exact keyword "tenant". | Matches Property Dispute JSON block. |
| **Logic Unit** | `format_ai_response` | Passing a markdown `json` string block. | Successfully strips backticks and returns `dict`. |
| **Safety Integration**| `call_gemini` | Gemini API connection timeout mock. | Triggers Groq Fallback seamlessly. |
| **Route Intercept**| `POST /api/ask` | Send > 5 queries in less than 1 min. | Returns HTTP 429 Too Many Requests. |

### Fallback Simulation
A critical test verifies system resilience. By artificially nullifying the `GEMINI_API_KEY` in the test environment, the system must independently route the generation to the `call_groq` wrapper without alerting the client of a failure layer.

---

## 🕷️ Frontend Testing Scenarios (Jest / React Testing Library)

| Component | Scenario | Verification |
| :--- | :--- | :--- |
| `Landing` | User clicks "Consult Nyaya AI". | Parent state updates to `chat` view. |
| `ChatWindow` | Submit button pressed with empty input. | Blocked submission, no API request fired. |
| `AnalysisPanel`| API payload returns valid `action_plan` array. | Panel expands and correctly maps items into UI lists. |
| `API Service` | Server is down/returns 503. | Chat displays fallback error message gracefully. |

---

## 🚀 Performance Testing (Lighthouse / LoadT)

- **Cold Start Analytics**: Ensuring `wakeupBackend()` initiates correctly on Mount to minimize first-inference latency.
- **Render Fidelity**: Validating `requestAnimationFrame` on the custom mouse cursor maintain 60 FPS under load.
- **Load Boundaries**: Simulating concurrently fired queries to validate ASGI/Uvicorn worker threads.
