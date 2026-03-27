import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AnalysisPanel from './components/AnalysisPanel';
import Landing from './components/Landing';
import Disclaimer from './components/Disclaimer';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [analysis, setAnalysis] = useState(null);
  const auraRef = useRef(null);
  const dotRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const auraPos = useRef({ x: 0, y: 0 });

  const hasMoved = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!hasMoved.current) {
        auraPos.current = { x: e.clientX, y: e.clientY };
        hasMoved.current = true;
      }
      
      // Update dot immediately for snappiness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        dotRef.current.style.opacity = '1';
      }
    };

    const animateAura = () => {
      // Smooth LERP implementation
      const ease = 0.12; // Slightly more fluid
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * ease;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * ease;

      if (auraRef.current) {
        // Center the 400x400 aura
        auraRef.current.style.transform = `translate3d(${auraPos.current.x - 200}px, ${auraPos.current.y - 200}px, 0)`;
        auraRef.current.style.opacity = '1';
      }
      requestAnimationFrame(animateAura);
    };

    const rafId = requestAnimationFrame(animateAura);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleResponse = (data) => {
    if (data && (data.law_references || data.actions || data.proof_required || data.authority)) {
      setAnalysis(data);
      // Ensure we switch to chat if a response comes back while on a policy page
      if (currentView !== 'chat') setCurrentView('chat');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Landing onStartChat={() => setCurrentView('chat')} setView={setCurrentView} />;
      case 'disclaimer':
        return <Disclaimer />;
      case 'privacy':
        return <Privacy />;
      case 'terms':
        return <Terms />;
      case 'contact':
        return <Contact />;
      case 'chat':
        return (
          <div className="chat-layout">
            <ChatWindow onResponse={handleResponse} />
            <AnalysisPanel results={analysis} />
          </div>
        );
      default:
        return <Landing onStartChat={() => setCurrentView('chat')} setView={setCurrentView} />;
    }
  };

  return (
    <div className={`app-container ${currentView === 'home' ? 'landing-mode' : ''}`}>
      <div className="cursor-aura" ref={auraRef} />
      <div className="cursor-dot" ref={dotRef} />
      
      {currentView !== 'home' && (
        <Sidebar currentView={currentView} setView={setCurrentView} />
      )}
      <div className="main-content">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
