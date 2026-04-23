<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Architecture-Clean-blueviolet?style=for-the-badge" alt="Clean Arch" />
  <img src="https://img.shields.io/badge/AI-Retrieval_Augmented_Generation-FF5722?style=for-the-badge" alt="RAG" />
</div>

<br/>

<div align="center">
  <h1>⚖️ न्याय Netra — See the Law Clearly</h1>
  <p><strong>An advanced AI-powered legal consultation engine designed to demystify Indian statutes.</strong></p>
</div>

---

<div align="center">
  <i>"Bridging the gap between legacy laws and the modern Indian citizen through high-precision AI and breathtaking UI."</i>
</div>

---

## ✨ The Vision: A Cyber Ethereal Experience

**Nyaya Netra** (translated: The Eye of Justice) isn't just a chatbot—it's an interactive, highly-optimized legal compass that guides users through the intricate maze of Indian laws (specifically incorporating the **BNS/BNSS 2023** framework). 

It embraces a **"Cyber Ethereal"** aesthetic: combining the clinical precision of legal tech with glassmorphism, dynamic cursor physics, and buttery-smooth micro-animations. 

---

## 🔥 Key Features

| Feature | Description | Impact |
| :--- | :--- | :--- |
| 🧠 **Context-Aware RAG Logic** | Grounded in a meticulously built local corpus of Bare Acts and Case Records. | Ensures hallucinatory-free, factual reliability. |
| ⚛️ **Dual-Model Fallback Engine** | Runs primarily on **Gemini 1.5 Flash**, gracefully falling back to **Groq (Llama 3.3)** on failure. | Guarantees unyielding uptime and speed. |
| 🚀 **Structured Action Plans** | Automatically converts dense legal jargon into digestible bullet points ("Next Steps," "Proof Required"). | High actionability for the common man. |
| 🛡️ **Clean Architecture** | Separated domains, abstracted API gateways, and rigorous Python structuring. | Easy to scale, highly testable. |
| 🎨 **High-Fidelity UI** | React-powered UI featuring reactive physics, glass panels, and gradients. | Captivating, "WOW" user experience. |

---

## 🛠️ Technology Stack

<table align="center">
  <tr>
    <td align="center" width="25%">
      <h3>Frontend</h3>
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
      <br/><br/>Vite.js<br/>Vanilla Custom CSS
    </td>
    <td align="center" width="25%">
      <h3>Backend</h3>
      <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
      <br/><br/>Python 3.10+<br/>Uvicorn ASGI
    </td>
    <td align="center" width="25%">
      <h3>AI Engine</h3>
      <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
      <br/><br/>Groq Fallback
    </td>
    <td align="center" width="25%">
      <h3>Data Pipeline</h3>
      <img src="https://img.shields.io/badge/JSON_Corpus-000000?style=for-the-badge&logo=json&logoColor=white" />
      <br/><br/>Custom Semantic Retrieval
    </td>
  </tr>
</table>

---

## 🏗️ System Architecture

Our newly refactored system embraces **Clean Architecture**. For in-depth reads, refer to our comprehensive internal documentation:

📂 **[System Documents](./documents/)**
- 📖 [API Documentation](./documents/API_DOCUMENTATION.md)
- 🏗️ [Architecture & Design Docs](./documents/ARCHITECTURE.md)
- 💻 [Code Conventions](./documents/CODE_DOCUMENTATION.md)
- 🧪 [Testing Protocols](./documents/TESTING.md)

---

## 🚀 Getting Started

To launch Nyaya Netra locally, follow these precise steps:

### Prerequisites
- `Python 3.10+`
- `Node.js 18+`
- API Keys: Google Gemini (Required), Groq (Optional for Fallback)

### Backend Deployment
1. Navigate: `cd backend`
2. Create Vault: `python -m venv venv`
3. Activate: `source venv/bin/activate` *(Windows: `.\venv\Scripts\activate`)*
4. Install dependencies: `pip install -r requirements.txt`
5. Configure Environment: Create a `.env` file referencing `.env.example` and insert keys.
6. Ignite Engine: `uvicorn app.main:app --reload`

### Frontend Deployment
1. Navigate: `cd frontend`
2. Install packages: `npm install`
3. Launch UI: `npm run dev`

---

## 📜 License
This project is secured under the **MIT License**. Check out the [LICENSE](./LICENSE) file for complete details.

---

<div align="center">
  <i>Empowering every citizen with the knowledge to stand for justice.</i>
  <br/>
  <b>Engineered by Sarvesh Ghotekar</b>
</div>
