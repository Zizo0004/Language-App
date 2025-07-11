import React from 'react';
import '../Game.css';

const MultipleChoice = ({ 
  question, 
  options, 
  onAnswer,
  selectedAnswer,
  correctAnswer,
  isAnswered
}) => {

  const getOptionClass = (option) => {
    if (!isAnswered) {
      return selectedAnswer === option ? 'selected' : '';
    }
    
    if (option === correctAnswer) {
      return 'correct';
    }
    
    if (option === selectedAnswer && option !== correctAnswer) {
      return 'incorrect';
    }
    
    return '';
  };

  return (
    <div className="question-type multiple-choice">
      <h3 className="question-text">{question}</h3>
      
      <div className="options-container">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`option ${getOptionClass(option)}`}
            onClick={() => !isAnswered && onAnswer(option)}
          >
            <div className="option-letter">{String.fromCharCode(65 + index)}</div>
            <div className="option-text">{option}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice; 