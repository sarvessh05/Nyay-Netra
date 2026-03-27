import React from 'react';
import './Disclaimer.css'; // Reuse disclaimer styles

const Privacy = () => {
  return (
    <div className="disclaimer-view">
      <div className="disclaimer-card">
        <div className="disclaimer-header">
          <span className="material-symbols-outlined icon-warning" style={{color: 'var(--primary-dim)'}}>shield_lock</span>
          <h2 className="gradient-text">Privacy Policy</h2>
        </div>
        
        <div className="disclaimer-body">
          <section className="disclaimer-section">
            <h3>Our Commitment</h3>
            <p>
              At <strong>न्याय Netra</strong>, we prioritize your legal privacy. We believe that seeking legal guidance 
              should be secure and confidential. Our systems are designed to minimize data footprint while 
              maximizing helpful analysis.
            </p>
          </section>

          <section className="disclaimer-section">
            <h3>Data Collection</h3>
            <p>
              We do not permanently store your personal legal queries or chat histories on our servers. 
              Conversation data is held temporarily in your browser session for contextual continuity and 
              is cleared upon ending the session.
            </p>
          </section>

          <section className="disclaimer-section">
            <h3>AI Processing</h3>
            <p>
              Your queries are processed using advanced language models (Google Gemini / Llama 3). 
              While these providers have their own privacy safeguards, we recommend 
              <strong> avoiding the use of specific names, addresses, or private identification numbers </strong> 
               within the chat for maximum anonymity.
            </p>
          </section>

          <div className="disclaimer-glow-divider"></div>

          <section className="disclaimer-section highlight-box">
            <p>
              By using न्याय Netra, you agree to our data handling practices designed to protect your 
              identity while providing cognitive legal support.
            </p>
          </section>
        </div>

        <div className="disclaimer-footer">
          <p className="label">© 2026 Nyaya Netra Technologies • Secure Protocol Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
