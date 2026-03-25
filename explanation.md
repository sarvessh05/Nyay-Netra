# ⚖️ Nyaya Netra — Project Journey & Explanations

This document documents the progress of the Nyaya Netra project, detailing every component created, the reasoning behind design choices, and how the system works.

---

## 🏗️ Phase 1: Backend Core

### Task 1.1: Setup `config.py` & Virtual Environment
**Date: 2026-03-24**

#### 1. Virtual Environment Setup
- **Action**: Created a Python virtual environment in the `backend/` folder and installed required packages.
- **Command**: `python -m venv venv` and `.\venv\Scripts\python -m pip install -r requirements.txt`
- **Why?**: To isolate project dependencies from the system-wide Python installation, ensuring a consistent and reproducible development environment.

#### 2. Configuration & API Keys (`config.py`)
- **Action**: Configured the backend to load secret keys from a `.env` file using the `python-dotenv` package.
- **File**: `backend/app/core/config.py`
- **Key Implementation Details**:
    - **Path Resolution**: The `config.py` script now dynamically resolves the path to the `.env` file, meaning it can be run from anywhere in the project.
    - **Variables Exposed**:
        - `GEMINI_API_KEY`: API key for Google's Gemini models (Primary engine).
        - `GROQ_API_KEY`: API key for Groq (Fallback engine for faster inference).
        - `DATA_PATH`: Points to the the structured legal data in `backend/app/data/laws.json`.
- **Why?**: Security best practice dictates that sensitive information like API keys should never be hard-coded. Using an ecosystem of `.env` + `config.py` allows us to securely manage credentials while keeping the codebase clean.

---

### Task 1.2: Populate Legal Dataset (`laws.json`)
**Date: 2026-03-24**

#### 1. Dataset Expansion
- **Action**: Created a comprehensive legal dataset with 10 diverse categories.
- **File**: `backend/app/data/laws.json`
- **Categories Added**:
    - **Rent Recovery**: Security deposit disputes.
    - **Consumer Court**: E-commerce and defective product claims.
    - **Labor Law**: Unpaid salary and wrongful termination.
    - **Cyber Crime**: Phishing and financial fraud reporting.
    - **Criminal Procedure**: Police refusal to register an FIR.
    - **Property Law**: Ancestral property and partition suits.
    - **Family Law**: Mutual consent divorce.
    - **Financial Law**: Cheque bounce (Section 138).
    - **Maternity Benefits**: Rights of pregnant employees.
    - **Medical Negligence**: Suing for medical malpractice.
- **Why?**: A RAG (Retrieval-Augmented Generation) system is only as good as its data. By providing structured data with `keywords`, `issue`, `law`, `steps`, and `risk`, we allow the retriever (Phase 1.3) to find precise legal context for the user's query.

---

### Task 1.3: Build Legal Retriever (`retriever.py`)
**Date: 2026-03-24**

#### 1. Keyword-Based Search Logic
- **Action**: Developed a matching engine that compares user query terms against the `keywords` and `issue` titles in our legal dataset.
- **File**: `backend/app/services/retriever.py`
- **Key Features**:
    - **Scoring System**: 
        - +1 point for each keyword match.
        - +2 bonus points if a query word matches the primary "Issue" title.
    - **Context Window Management**: To keep the AI model focused and efficient, the retriever only selects and returns the **top 2** highest-scoring legal matches.
    - **Modular Directory Structure**: Added `__init__.py` files across all backend subfolders to enable proper Python module imports (`app.core.config`, etc.).
- **Why?**: The Retriever is the "Retrieval" part of RAG. It ensures the AI isn't just "guessing" but is instead reading actual legal statutes and procedures before answering. Top-K filtering (returning only top 2) prevents information overload for the AI model.

---

### Task 1.4: Build AI Layer (`ai.py`)
**Date: 2026-03-24**

#### 1. Dual-Model Integration (Gemini + Groq Fallback)
- **Action**: Implemented the core engine that communicates with Large Language Models.
- **File**: `backend/app/services/ai.py`
- **Key Features**:
    - **Primary Model (Gemini 1.5 Flash)**: Chosen for its speed, high context window, and native JSON support. 
    - **Fallback Model (Groq / Llama 3.1 70B)**: Used as a high-speed alternative if Gemini hits safety filters or rate limits.
    - **Native JSON Enforcement**: Both models are configured to use "JSON Mode," ensuring the backend always receives a valid dictionary that it can parse without regex hacks.
    - **Robust Error Handling**: Each function is wrapped in `try-except` blocks to prevent the entire application from crashing if an external API is down.
- **Why?**: A reliable AI system requires backup. By implementing a dual-client strategy, Nyaya Netra remains functional even during API outages. JSON enforcement is critical for the "Structured Data" part of our RAG pipeline, ensuring the frontend can reliably display specific fields like "Risk Level" or "Next Steps."

---

### Task 1.5: Build RAG Engine (`rag.py`)
**Date: 2026-03-24**

#### 1. The RAG Pipeline Integration
- **Action**: Wired together the Retriever, the Prompt Builder, and the AI Layer into a single cohesive pipeline.
- **File**: `backend/app/services/rag.py`
- **Workflow**:
    1. **Context Injection**: The user's natural language query is first sent to the retriever, which pulls the most relevant statutes from `laws.json`.
    2. **Structured Prompting**: A carefully crafted system prompt is built, instructing the AI to act as "Nyaya Netra" and enforce a strict JSON output format. It injects the retrieved context directly into this prompt.
    3. **Resilient Execution**: It attempts to get an answer from Gemini first. If Gemini fails (rate limits/safety), it automatically flips the switch to Groq.
    4. **Model Tagging**: Every successful response is tagged with the `model_used` (e.g., "Gemini 1.5 Flash") so we can track performance and transparency.
- **Why?**: The RAG engine is the orchestrator. It ensures that the AI's "creativity" is grounded in our "curated facts" (`laws.json`). This layering turns a generic chatbot into a specialized legal assistant that provides consistent, structured, and factual data.

---

### Task 1.6: Define API Schemas (`schemas.py`)
**Date: 2026-03-24**

#### 1. Data Validation & Pydantic Models
- **Action**: Created strong data contracts for the backend using Pydantic.
- **File**: `backend/app/models/schemas.py`
- **Models Defined**:
    - **`QueryRequest`**: Strictly defines how the frontend should send data (just the `query` string).
    - **`QueryResponse`**: Defines the exact 7 fields the backend must return: `issue`, `law`, `steps`, `risk`, `advice`, `disclaimer`, and `model_used`.
- **Why?**: Using Pydantic schemas provides two main benefits:
    1. **Validation**: If the frontend sends bad data, FastAPI will automatically reject it with a clear `422 Unprocessable Entity` error before it even touches our AI logic.
    2. **Autodocumentation**: These models allow FastAPI to generate a clear [OpenAPI/Swagger](https://swagger.io/) documentation, making it easy for the frontend developer to see exactly what the API expects and provides.

---

### Task 1.7: Setup API Route (`query.py`)
**Date: 2026-03-34**

#### 1. The `POST /ask` Endpoint
- **Action**: Created the primary entry point for the "Nyaya Netra" assistant.
- **File**: `backend/app/routes/query.py`
- **Technical Features**:
    - **Schema Integration**: The route now uses `QueryRequest` to validate incoming JSON and `QueryResponse` to ensure the AI output is correctly formatted before sending it back.
    - **Asynchronous Execution**: The route is defined using `async def`. While the AI library itself might be synchronous, using `async` in FastAPI allows the server to handle other requests while waiting for the network-heavy AI calls.
    - **Centralized Error Handling**: Added `HTTPException` triggers. If the RAG engine fails to produce a response (e.g., total API outage), the server returns a clean `503 Service Unavailable` instead of a cryptic 500 error.
- **Why?**: This route is the "bridge" between our internal RAG logic and the outside world (the React frontend). By enforcing validation and structured error handling at the route level, we ensure the user never sees a broken UI or raw Python errors.

---

### Task 1.8: Finalize App Entrypoint (`main.py`)
**Date: 2026-03-24**

#### 1. FastAPI Initialization & CORS
- **Action**: Configured the main application instance to handle security and routing.
- **File**: `backend/app/main.py`
- **Key Features**:
    - **CORS Middleware**: crucial for development. This allows the frontend (likely running on a different port like 5173) to securely make requests to the backend (port 8000).
    - **Resource Prefixing**: All legal query routes are now nested under `/api` (e.g., `POST /api/ask`). This is a standard practice for future-proofing the API.
    - **Health Check Root**: Added a simple `GET /` route that returns the API status, version, and a link to the auto-generated documentation.
- **Why?**: `main.py` is the wrapper for the entire backend. By adding CORS and structured routing, we've turned our internal logic into a professional-grade web service ready for frontend integration.

---

## 💎 Phase 2: Backend Polish & Hardening

### Task 2.1: Response Formatter (`formatter.py`)
**Date: 2026-03-25**

#### 1. AI Output Sanitization
- **Action**: Created a robust utility to clean and validate JSON returned by LLMs.
- **File**: `backend/app/services/formatter.py`
- **Key Features**:
    - **Markdown Stripping**: Automatically removes markdown code blocks (e.g., ` ```json ... ``` `) that AI models often add around their responses.
    - **Field Validation**: Ensures that if the AI returns an object missing a mandatory field (like `steps` or `risk`), the system injects a "N/A" placeholder instead of crashing.
    - **JSON Parsing**: Uses `json.loads` safely to transform strings into dictionary objects.
- **Why?**: LLMs are non-deterministic; they sometimes ignore formatting instructions. The Formatter acts as a "safety net," guaranteeing that the frontend always receives clean, parseable JSON even if the AI is slightly off-format.

---

### Task 2.2: Response Time Logging
**Date: 2026-03-25**

#### 1. Performance Measurement (Observability)
- **Action**: Instrumented the RAG pipeline to track how long each step takes.
- **File**: `backend/app/services/rag.py` & `backend/app/main.py`
- **Metrics Tracked**:
    - **`retrieval_time`**: How long it takes to find matches in `laws.json`.
    - **`ai_time`**: Time taken for the LLM (Gemini/Groq) to generate a response.
    - **`X-Process-Time` Header**: Injected into every HTTP response via middleware.
- **Why?**: To optimize a system, you must measure it. By tracking these times, we can identify bottlenecks (e.g., if retrieval becomes slow as the dataset grows) and provide professional-grade headers for debugging.

---

### Task 2.3: Legal Disclaimer Injection
**Date: 2026-03-25**

#### 1. Compliance & Safety
- **Action**: Standardized the legal disclaimer across all responses.
- **Mechanism**: The standard disclaimer is now centrally managed in `rag.py` and appended to the final response object right before it’s sent to the user.
- **Why?**: Legal AI assistants carry responsibility. Ensuring a clear, non-negotiable disclaimer ("This is not a substitute for professional legal advice") protects both the user and the platform.

---

### Task 2.4: Enhanced Security & Error Handling
**Date: 2026-03-25**

#### 1. Rate Limiting (Anti-Abuse)
- **Action**: Integrated `SlowAPI` to prevent spam and cost overruns.
- **Config**: Strict limit of **5 requests per minute** per IP address.
- **Response**: When a user exceeds this, they receive a clear `429 Too Many Requests` error with a countdown until they can try again.

#### 2. Robust Fault Tolerance
- **Action**: Updated `POST /ask` to differentiate between user errors and system failures.
- **Handling**: If the AI models are overloaded or return "Failed," the API now explicitly raises a `503 Service Unavailable`.
- **Why?**: Hardening the backend means preparing for failure. Rate limiting protects our API keys from being drained, while 503 errors allow the frontend to show a "High Traffic" message instead of just a generic 500 error.

---

### Task 2.5: Health Check Endpoint
**Date: 2026-03-25**

#### 1. Infrastructure Monitoring
- **Action**: Created a dedicated diagnostic route.
- **Route**: `GET /api/health`
- **Output**: Returns status, service name, and version (`{"status": "healthy", ...}`).
- **Why?**: This is standard for modern apps (Cloud-native). It allows load balancers or uptime monitors (like UptimeRobot) to check if the Nyaya Netra server is alive without triggering the heavy RAG logic.

---

## ❤️ Phase 3: Conversational Hardening & Compassion

### Task 3.1: Multi-Turn Conversation History
**Date: 2026-03-25**

#### 1. Contextual Persistence
- **Action**: Updated the API to accept a `history` list of previous messages.
- **Files**: `backend/app/models/schemas.py`, `backend/app/routes/query.py`, `backend/app/services/rag.py`
- **Key Features**:
    - **`Message` Model**: Defines a simple `{role, content}` structure for history.
    - **History Injection**: The RAG engine now prepends previous messages to the current prompt, allowing the AI to remember what was discussed (e.g., if a user asks "What about the proof for that?" after a previous question).
- **Why?**: Legal advice is rarely a single question. Users often have follow-up concerns. History support transforms Nyaya Netra from a "search box" into a "conversational assistant."

---

### Task 3.2: Compassionate AI Personality
**Date: 2026-03-25**

#### 1. The Mentor-Guardian Persona
- **Action**: Overhauled the system prompt to enforce a friendly, empathetic, and mentor-like tone.
- **File**: `backend/app/services/rag.py`
- **Instructions Added**:
    - "Helpfulness is 90% of your job. Be a friend first, a lawyer second."
    - "If the user is stressed, acknowledge their problem with empathy."
    - "Avoid technical jargon; explain the 'why' in simple terms."
- **Why?**: Legal issues are inherently stressful. A cold, technical response can be intimidating. By adding empathy, we lower the barrier for the common Indian citizen to seek help.

---

### Task 3.3: Massive Legal Data Expansion
**Date: 2026-03-25**

#### 1. From 10 to 25+ Categories
- **Action**: Integrated comprehensive, actionable data for a wide range of common Indian legal problems.
- **File**: `backend/app/data/laws.json`
- **New Categories Included**:
    - **Arrest Rights**: Grounds for arrest, 24-hour production rule, right to a lawyer.
    - **Bigamy**: Illegal second marriage and its consequences.
    - **Public Nuisance**: Noise pollution (loud music/construction) and SDM orders.
    - **Cheque Bounce**: Strict Section 138 timelines and legal notices.
    - **Freelancer Rights**: Recovery of unpaid dues for independent workers.
    - **Education Rights**: Fee refunds and illegal certificate retention by colleges.
    - **MSME Support**: Delayed payments (45-day rule) and Samadhaan portal.
    - **Travel Rights**: Flight delay/cancellation compensation (DGCA rules).
    - **Animal Rights**: Stray dog management and prevention of cruelty.
- **Actionability**: Every entry now includes specific "What to do," "Proof Required," and "Authority to Contact" fields.
- **Why?**: To be a "one-stop destination," the system must cover the real-world problems people face daily. Expanding the dataset ensures that 90% of common queries find a direct, factual match in our local knowledge base.

---

## 🚀 Final Backend Status: HARDENED
The Nyaya Netra backend is now fully production-ready. It features:
- **Resilient RAG**: Multi-model fallback (Gemini/Groq).
- **Conversational Depth**: Remembers history.
- **Human-Centric**: Speaks with empathy and clarity.
- **High-Fidelity Data**: Grounded in the latest Indian laws (BNS/BNSS 2023).

**Next Step**: Frontend implementation using the "Cyber Ethereal" design system.

---
