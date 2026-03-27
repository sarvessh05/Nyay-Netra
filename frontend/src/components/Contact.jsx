import React from 'react';
import './Disclaimer.css';
import './Contact.css';

const Contact = () => {
  return (
    <div className="disclaimer-view">
      <div className="disclaimer-card contact-card-styled">
        <div className="disclaimer-header">
          <span className="material-symbols-outlined icon-warning" style={{color: 'var(--secondary)'}}>alternate_email</span>
          <h2 className="gradient-text">Contact Our Team</h2>
        </div>
        
        <div className="disclaimer-body">
          <p className="contact-description">
            Have questions about <strong>न्याय Netra</strong> or need technical support? 
            Send us a message and our development team will get back to you securely.
          </p>

          <form action="https://formspree.io/f/xvzvgper" method="POST" className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Tatya Vinchu" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="tatya@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">How can we help?</label>
              <textarea id="message" name="message" rows="4" placeholder="Your message here..." required></textarea>
            </div>

            <button type="submit" className="submit-btn-glow">
              Send Message
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

        <div className="disclaimer-footer">
          <p className="label">© 2026 Nyaya Netra • Secure Inbox Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
