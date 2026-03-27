import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentView, setView }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
        <h1 className="sidebar-logo">न्याय Netra</h1>
        <p className="secondary-text">AI Legal Visionary</p>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
        >
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'chat' ? 'active' : ''}`}
          onClick={() => setView('chat')}
        >
          <span className="material-symbols-outlined">add_comment</span>
          <span>New Chat</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'disclaimer' ? 'active' : ''}`}
          onClick={() => setView('disclaimer')}
        >
          <span className="material-symbols-outlined">gavel</span>
          <span>Disclaimer</span>
        </button>
      </nav>



      <div className="sidebar-footer">
        <p className="footer-version">PERSISTENT ENGINE</p>
      </div>
    </aside>
  );
};

export default Sidebar;
