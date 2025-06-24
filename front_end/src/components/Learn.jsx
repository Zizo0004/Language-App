import React from 'react';
import './Learn.css';
import './Auth.css'; // Reusing auth styles for background

const Learn = ({ navigateTo }) => {
  return (
    <div className="learn-container">
      <div className="auth-background">
        <div className="grain-overlay"></div>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="learn-content">
        <h1 className="learn-title">Learn</h1>
        <p className="learn-subtitle">Choose a category to start learning</p>

        <div className="learn-sections">
  <div className="learn-section-card" onClick={() => navigateTo('game')}>
    <h2>Most commonly used words</h2>
    <p>These are the most commonly used words.</p>
    <div className="progress-container">
      <span>0/2000 completed</span>
      <div className="progress-bar">
        <div className="progress" style={{ width: '0%' }}></div>
      </div>
    </div>
  </div>

  <div className="learn-section-card" onClick={() => navigateTo('most_words')}>
    <h2>Understanding sentences</h2>
    <p>Learn how to form and understand sentences.</p>
    </div>
  </div>      
</div>
    </div>
  );
};

export default Learn; 