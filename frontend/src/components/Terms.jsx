import React from 'react';
import './Disclaimer.css'; // Reuse disclaimer styles

const Terms = () => {
  return (
    <div className="disclaimer-view">
      <div className="disclaimer-card">
        <div className="disclaimer-header">
          <span className="material-symbols-outlined icon-warning" style={{color: 'var(--tertiary-dim)'}}>description</span>
          <h2 className="gradient-text">Terms of Service</h2>
        </div>
        
        <div className="disclaimer-body">
          <section className="disclaimer-section">
            <h3>Usage Policy</h3>
            <p>
              By accessing <strong>न्याय Netra</strong>, you agree to use our AI Legal Visionary system 
              for <strong>lawful, educational, and cognitive assistance purposes only</strong>. 
              Misuse for illegal activities or automated scraping is strictly prohibited.
            </p>
          </section>

          <section className="disclaimer-section">
            <h3>License to Use</h3>
            <p>
              न्याय Netra grants you a limited, non-exclusive license to use the AI legal reasoning 
              system for informational purposes. This platform does not provide legal representation. 
              The analysis is meant to help you understand legal concepts and navigate basic statutes.
            </p>
          </section>

          <section className="disclaimer-section">
            <h3>Statutory Updates</h3>
            <p>
              Laws change frequently. While we aim to update our knowledge base regularly with the latest 
              Indian Penal Codes (including BNS/BNSS 2023), it's the user's responsibility to verify the 
              output with current official gazettes before taking action.
            </p>
          </section>

          <div className="disclaimer-glow-divider"></div>

          <section className="disclaimer-section highlight-box">
            <p>
              These Terms safeguard both our users and our technology. 
              Your continued use of न्याय Netra implies full acceptance of these terms.
            </p>
          </section>
        </div>

        <div className="disclaimer-footer">
          <p className="label">© 2026 Nyaya Netra Technologies • Final Protocol Active</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
