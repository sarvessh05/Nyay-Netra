import React from 'react';
import './AnalysisPanel.css';

const AnalysisPanel = ({ results }) => {
  // Extract results with fallbacks for UI persistence
  const lawReferences = results?.law_references || [];
  const actions = results?.actions || [];
  const proofRequired = results?.proof_required || [];
  const authority = results?.authority || (results ? "Consulting Jurisdictional Databases..." : "Awaiting analysis...");
  const hasData = !!results;
  const progress = hasData ? 100 : 35;

  return (
    <div className="analysis-panel">
      <div className="panel-header">
        <span className="material-symbols-outlined">analytics</span>
        <span>Analytical Intelligence</span>
      </div>

      <div className="analysis-main-card">
        <div className="status-badge">
          <div className="status-dot"></div>
          <span>{hasData ? 'Verification Complete' : 'System Scanning'}</span>
        </div>
        <h3 className="analysis-title">
          {hasData ? 'Case Strategy Formulated' : 'Identifying Legal Precedents...'}
        </h3>
        
        <div className="progress-section">
          <div className="progress-label">
            <span>VERIFICATION PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="analysis-grid">
        {/* Action Plan Tile */}
        <div className="analysis-tile">
          <div className="tile-header">
            <span className="material-symbols-outlined tile-icon">assignment</span>
            <span className="tile-title">Action Plan</span>
          </div>
          <div className="tile-content">
            {actions.length > 0 ? (
              actions.map((item, i) => (
                <div key={i} className="list-item">
                  <span className="material-symbols-outlined list-marker">chevron_right</span>
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="empty-state-text">Awaiting input for tactical breakdown...</p>
            )}
          </div>
        </div>

        {/* law References Tile */}
        <div className="analysis-tile">
          <div className="tile-header">
            <span className="material-symbols-outlined tile-icon">menu_book</span>
            <span className="tile-title">Law References</span>
          </div>
          <div className="tile-content">
            {lawReferences.length > 0 ? (
              lawReferences.map((law, i) => (
                <div key={i} className="list-item">
                  <span className="material-symbols-outlined list-marker">gavel</span>
                  <span>{typeof law === 'string' ? law : (law.title || "Legal Provision")}</span>
                </div>
              ))
            ) : (
              <p className="empty-state-text">Scoping relevant legal codes...</p>
            )}
          </div>
        </div>

        {/* Required Evidence Tile */}
        <div className="analysis-tile">
          <div className="tile-header">
            <span className="material-symbols-outlined tile-icon">shield</span>
            <span className="tile-title">Required Evidence</span>
          </div>
          <div className="tile-content">
            {proofRequired.length > 0 ? (
              proofRequired.map((proof, i) => (
                <div key={i} className="list-item">
                  <span className="material-symbols-outlined list-marker">done_all</span>
                  <span>{proof}</span>
                </div>
              ))
            ) : (
              <p className="empty-state-text">Identifying burden of proof factors...</p>
            )}
          </div>
        </div>

        {/* Jurisdiction Tile */}
        <div className="analysis-tile">
           <div className="tile-header">
             <span className="material-symbols-outlined tile-icon">account_balance</span>
             <span className="tile-title">Jurisdictional Authority</span>
           </div>
           <div className="tile-content">
              <p style={{ marginBottom: '1rem' }}>{authority}</p>
              {hasData && (
                <button 
                  className="contact-btn"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    background: 'var(--primary)', 
                    border: 'none', 
                    borderRadius: '0.5rem',
                    color: '#000',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(authority)}`, '_blank')}
                >
                  Locate Authority
                </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
