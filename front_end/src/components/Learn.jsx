import React from 'react';
import './test.css'; // Using test.css for styling
import './Learn.css';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const navigate = useNavigate(); 
  return (
    <div className="signup-container">
      <div className="background-overlay">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      <div className="grid-pattern"></div>

      <div className="content-wrapper">
        <div className="learn-sections-new">
          <div className="learn-card-new" onClick={() => navigate('/game')}>
            <h2 className="learn-card-title">Commonly used words</h2>
            <p className="learn-card-description"> The most frequent words in Arabic.</p>
            <div className="progress-container">
              <div className="progress-bar-new">
                <div className="progress-new" style={{ width: '0%' }}></div>
              </div>
              <span>0/200</span>
            </div>
          </div>

          <div className="learn-card-new disabled-card">
            <h2 className="learn-card-title">Basic Sentences</h2>
            <p className="learn-card-description">Learn to form and understand elementary level sentences.</p>
            <span className="soon-text">Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn; 