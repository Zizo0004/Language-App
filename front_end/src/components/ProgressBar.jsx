import React from 'react';
import './Game.css';

const ProgressBar = ({ percentage, currentQuestion, totalQuestions }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        >
        </div>
      </div>
      <div className="question-counter">
        {currentQuestion} / {totalQuestions}
      </div>
    </div>
  );
};

export default ProgressBar; 