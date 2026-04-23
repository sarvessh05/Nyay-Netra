# 💻 Nyaya Netra — Code Documentation

<div align="center">
  <img src="https://img.shields.io/badge/Code-Standards-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Linting-ESLint-4B32C3?style=for-the-badge&logo=eslint" />
</div>

> Detailed documentation of the internal functions, classes, and conventions used across the Nyaya Netra ecosystem.

---

## 📘 Backend Logic (Python / FastAPI)

### Module: `services / rag.py`
The orchestrator of the entire process.

- **`build_prompt(query, context, history)`**
  *Parameters*: `query` (str), `context` (list), `history` (list|None)
  *Returns*: `str`
  *Description*: Constructs a hyper-specific, persona-driven legal prompt. Injects historical state metadata and strict JSON schematic enforcement instructions.

- **`process_query(query, history)`**
  *Description*: Main service pipeline. Coordinates `retrieve_context()`, `build_prompt()`, `call_gemini()`, and fallback `call_groq()`. It manages execution timing and aggregates the final response payload.

### Module: `services / retriever.py`
Local context manager.

- **`retrieve_context(query, history)`**
  *Description*: A heuristic search function. Filters out "filler" words, scores legal categories based on keyword matches from `data/laws.json`, and injects both the current query terms and previous user query terms (to support contextual follow-ups). 

### Module: `services / ai.py`
External integrations.

- **`call_gemini(prompt)` / `call_groq(prompt)`**
  *Description*: Wrappers around the respective SDKs. Both functions configure their clients to return forced JSON objects to prevent raw markdown leaks into the client-side parsing layer.

---

## 🎨 Frontend Logic (React)

### Separation of Concerns Update
As part of the shift to **Clean Architecture**, the frontend has been modularized:
- **`src/api/apiService.js`**: Centralized Axios definitions. Manages `wakeupBackend()` and `askLegalQuery()`.
- **`src/features/`**: Contains compound domains like Chat and Analysis panels logic.
- **`src/pages/`**: Single-view router containers.

### Component Highlight: `App.jsx`
- Operates as the root router and state controller.
- Initiates a "Cold Start Ping" to `/api/health` instantly upon mounting via `useEffect`.
- Subscribes to custom cursor movement metadata using `requestAnimationFrame` for a smooth, high-fps aesthetic without choking React's render lifecycle.

### Component Highlight: `ChatWindow.jsx`
- Manages optimistic UI updates (injecting user messages immediately while flagging `loading`).
- Defers API execution to `apiService.js`.
- Upon resolution, parses the dual-faceted data: pushing the `explanation` into the chat feed, and passing the structured `analysisData` back up the tree for the `AnalysisPanel` to consume.

---

## 📏 Coding Standards & Conventions

1. **Error Handling**: 
   - Backend functions must capture base exceptions and return `None` or raise well-defined `HTTPException`s. 
   - Frontend must rely on `try/catch` and provide fallback UI states. No raw errors exposed to the user.
2. **Types**: Pydantic schemes stringently enforce endpoint validation.
3. **No Raw Logging**: `print` and `console.log` trace statements have been deliberately abstracted out of production code formats for security and compliance.
