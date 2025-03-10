import React from 'react';
import MultipleChoice from './question-types/MultipleChoice';
import Pairing from './question-types/Pairing';
import AudioQuestion from './question-types/AudioQuestion';
import './Game.css';

const QuestionContainer = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  // Render different question components based on question type
  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoice 
            question={question.question}
            options={question.options}
            onAnswer={onAnswer}
          />
        );
      case 'pairing':
        return (
          <Pairing 
            question={question.question}
            pairs={question.pairs}
            onAnswer={onAnswer}
          />
        );
      case 'audio':
        return (
          <AudioQuestion 
            question={question.question}
            audioUrl={question.audioUrl}
            options={question.options}
            onAnswer={onAnswer}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="question-counter">
          {questionNumber} / {totalQuestions}
        </div>
      </div>
      
      {renderQuestion()}
    </div>
  );
};

export default QuestionContainer; 