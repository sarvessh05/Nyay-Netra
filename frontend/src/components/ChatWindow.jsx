import React, { useState, useEffect, useRef } from 'react';
import apiService from '../api/apiService';
import './ChatWindow.css';

const ChatWindow = ({ onResponse }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await apiService.askLegalQuery(input, messages.map(m => ({ role: m.role, content: m.content })));

      // Extract details for the Side Panel (Analytical View)
      const analysisData = {
        law_references: [data.law_citation], // Backend returns string, side panel wants array
        actions: data.action_plan,
        proof_required: data.documents_needed,
        authority: data.where_to_go
      };

      // AI message for the Chat Bubble
      const aiMsg = { 
        role: "assistant", 
        content: data.explanation || "I have analyzed your situation." 
      };
      
      setMessages(prev => [...prev, aiMsg]);
      
      // Pass the analytical part (structured data) to parent for side panel
      if (onResponse) onResponse(analysisData);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble connecting to the legal database right now. Please try again soon." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <div className="header-info">
          <div className="gavel-icon">
            <span className="material-symbols-outlined">gavel</span>
          </div>
          <div className="header-text">
            <h2>Nyaya Netra Counsel</h2>
            <div className="header-status-pill">
              <div className="status-dot-mini"></div>
              <span className="secondary-info">SECURE LOGIC ENGINE</span>
            </div>
          </div>
        </div>

      </header>
      
      <div className="chat-messages">
        {messages.length === 0 && !loading && (
          <div className="chat-empty-state">
             <div className="vision-cube">
                <div className="cube-inner">
                  <span className="material-symbols-outlined">gavel</span>
                </div>
                <div className="cube-glow"></div>
             </div>
             <h2 className="gradient-text">How can I assist your legal rights today?</h2>
             <p className="vision-subtitle">Your AI Legal Guardian is ready. Describe your situation for high-precision analytical advice.</p>
             <div className="suggestion-chips">
                <button className="chip" onClick={() => setInput("Tell me about Property Dispute laws.")}>Property Dispute</button>
                <button className="chip" onClick={() => setInput("What are my Consumer Rights?")}>Consumer Rights</button>
                <button className="chip" onClick={() => setInput("Explain Labor Law in simple terms.")}>Labor Law</button>
             </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}>
              <div className={`message-bubble ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="ai-meta">
                    <div className="ai-pulse"></div>
                    <span className="ai-label">Nyaya AI</span>
                  </div>
                )}
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
          </div>
        ))}
        {loading && (
          <div className="message-row assistant-row">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form className="chat-input-wrapper" onSubmit={handleSubmit}>
        <div className="input-glow-container">
           <div className="input-inner">
             <span className="material-symbols-outlined" style={{ color: 'rgba(222, 229, 255, 0.4)', fontSize: '1.25rem', paddingLeft: '0.5rem' }}>
               attachment
             </span>
             <input 
               type="text" 
               placeholder="Query any law, penal code or case file..." 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               disabled={loading}
             />
             <div className="input-controls">
                <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
                  <span className="material-symbols-outlined">send</span>
                </button>
             </div>
           </div>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
