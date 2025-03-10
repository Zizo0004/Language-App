import React from 'react';

const ProgressBar = ({ percentage, currentQuestion, totalQuestions }) => {
  const containerStyle = {
    width: '100%',
    position: 'relative',
    marginBottom: '40px',
    paddingBottom: '10px',
    display: 'block'
  };

  const barStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(240, 240, 240, 0.6)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'block'
  };

  const fillStyle = {
    height: '100%',
    width: `${percentage}%`,
    background: 'linear-gradient(90deg, #c16630, #e8935a)',
    borderRadius: '20px',
    transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow: '0 1px 3px rgba(193, 102, 48, 0.3)',
    minWidth: '5px'
  };

  const counterStyle = {
    position: 'absolute',
    right: '0',
    top: '16px',
    fontSize: '15px',
    color: '#888',
    fontWeight: '600',
    letterSpacing: '0.5px'
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}>
        <div 
          style={fillStyle}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        ></div>
      </div>
      <div style={counterStyle}>
        {currentQuestion} / {totalQuestions}
      </div>
    </div>
  );
};

export default ProgressBar; 