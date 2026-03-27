import React from 'react';
import './Landing.css';

const Landing = ({ onStartChat, setView }) => {
  return (
    <div className="landing-wrapper">
      {/* Top Navigation Streamlined */}
      <nav className="landing-nav">
        <div className="nav-branding">
          <div className="nav-logo gradient-text">न्याय Netra</div>
          <span className="nav-tagline">Legal Help for Everyone</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow primary-glow"></div>
        <div className="hero-glow secondary-glow"></div>
        <h1 className="hero-title gradient-text">न्याय Netra</h1>
        <p className="hero-subtitle">See the Law Clearly.</p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={onStartChat}>Start Consultation</button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="features-section">
        <div className="feature-card glass-panel">
          <div className="card-inner">
            <div className="feature-icon primary"><span className="material-symbols-outlined">gavel</span></div>
            <h3>Legal Understanding</h3>
            <p>Translate complex BNS/BNSS statutes into plain language. Our AI deciphers legal jargon in seconds.</p>
          </div>
        </div>
        <div className="feature-card glass-panel">
          <div className="card-inner">
            <div className="feature-icon secondary"><span className="material-symbols-outlined">psychology</span></div>
            <h3>Smart Reasoning</h3>
            <p>Logical cross-referencing of case law to find precedents that matter to your specific situation.</p>
          </div>
        </div>
        <div className="feature-card glass-panel">
          <div className="card-inner">
            <div className="feature-icon tertiary"><span className="material-symbols-outlined">assignment_turned_in</span></div>
            <h3>Actionable Advice</h3>
            <p>Receive structured roadmaps and draft templates for your next legal steps with confidence.</p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="demo-section">
        <div className="section-labels">
          <span className="label-accent">INTERACTIVE DEMO</span>
          <h2 className="section-title">Instant Clarity in Action</h2>
        </div>

        <div className="demo-grid">
          {/* Browser Mockup */}
          <div className="browser-frame glass-panel lg-col-8">
            <div className="browser-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-url">nyayanetra-session.ai</div>
            </div>
            
            <div className="browser-content">
              {/* User Message */}
              <div className="demo-msg user-msg">
                <div className="bubble">
                  What should I do about a landlord dispute? They are refusing to return my security deposit because of normal wear and tear.
                </div>
              </div>

              {/* AI Message */}
              <div className="demo-msg ai-msg">
                <div className="ai-pfp"><span className="material-symbols-outlined text-white text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span></div>
                <div className="ai-response-container">
                  <div className="bubble no-bg">
                    Based on standard rental regulations, normal wear and tear is not a valid ground for withholding a deposit. Here is your structured analysis:
                  </div>
                    <div className="demo-analysis-grid">
                      <div className="analysis-card">
                         <h4 className="text-secondary-accent"><span className="material-symbols-outlined text-sm">balance</span> Legal Right</h4>
                         <p>Section 14-B protects tenants from arbitrary deductions for routine depreciation.</p>
                      </div>
                      <div className="analysis-card">
                         <h4 className="text-primary-accent"><span className="material-symbols-outlined text-sm">near_me</span> Next Step</h4>
                         <p>Send a formal 'Demand Notice' via registered post before pursuing small claims.</p>
                      </div>
                    </div>
                  <div className="demo-actions">
                    <button className="btn-pill"><span className="material-symbols-outlined text-sm">description</span> Draft Demand Letter</button>
                    <button className="btn-pill"><span className="material-symbols-outlined text-sm">find_in_page</span> View Similar Cases</button>
                  </div>
                </div>
              </div>

              {/* Fake Input */}
              <div className="demo-input-mock">
                <div className="input-field">Ask follow up question...</div>
                <button className="input-btn"><span className="material-symbols-outlined">arrow_upward</span></button>
              </div>
            </div>
          </div>

          {/* Demo Aside Stats */}
          <div className="demo-aside lg-col-4">
             <div className="stats-card glass-panel">
                <div className="card-inner">
                  <span className="label-tiny">QUICK INSIGHT</span>
                  <p>92% of security deposit disputes are resolved via formal demand notices.</p>
                </div>
             </div>
             <div className="glass-panel context-card">
                <div className="card-inner">
                  <h4>Trust Indicator</h4>
                  <div className="stat-row"><span>Groundwork</span><strong>Indian Constitution</strong></div>
                  <div className="stat-row"><span>Knowledge Base</span><strong className="text-secondary-accent">500+ Bare Acts</strong></div>
                  <div className="stat-row"><span>Precedents</span><strong className="text-tertiary-accent">1M+ Case Records</strong></div>
                </div>
             </div>
             <div className="image-card glass-panel">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_tbO1Kvp9lc04g0yewhsw2h9mi1nuyEs06oMmTYzuij431yiUJ5TwW27zTiGF8Z6_7LRtRU8HVmY7wzLoKvt46YRFuEZfVYgEF6zdhax_Jbc5JzRE1nUV-BsDKa2yKOnDruGk4JU0tp3dlSH_zZwivh78m65EFE445_Fj_JXmcUB2vrYUaLBaWWUcckTYFPbK9P_kw6o2XFPNU0ryJjt5Sl9nGsP8Vskcq6T_HnCDWeb7tYjkujZv0eTOdPkfjhPvt4ZT1XoVzDQ" 
                  alt="Legal AI Engine" 
                  className="card-img"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x200/060e20/dee5ff?text=AI+Legal+Engine'} 
                />
                <div className="img-overlay">
                  <h4>Built with Indian Laws</h4>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="cta-final-section">
        <h2 className="cta-title">Ready to see your case clearly?</h2>
        <p className="cta-tagline"><i>Get instant legal guidance in seconds. No confusion, no jargon.</i></p>
        <button className="btn-cta-launch" onClick={onStartChat}>
          Get Legal Help
        </button>
      </section>

      {/* Detailed Footer */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-logo gradient-text">न्याय Netra</div>
          <div className="footer-nav">
            <button className="footer-link-btn" onClick={() => setView('privacy')}>PRIVACY POLICY</button>
            <button className="footer-link-btn" onClick={() => setView('terms')}>TERMS OF SERVICE</button>
            <button className="footer-link-btn" onClick={() => setView('contact')}>CONTACT</button>
          </div>
        </div>
        <div className="footer-bottom">
           <p className="footer-disclaimer">
             AI-generated content for informational purposes only. Consult a lawyer for actual legal advice. न्याय Netra is a cognitive support tool and does not constitute a lawyer-client relationship.
           </p>
           <p className="copyright">
             © 2026 Nyay Netra Technologies • Built by <a href="https://sarveshghotekar.in" target="_blank" rel="noopener noreferrer">Sarvesh Ghotekar</a>
           </p>
        </div>
      </footer>
    </div>
  );
};


export default Landing;
