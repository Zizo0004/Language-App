import React, { useState, useRef } from 'react';
import ProgressBar from '../ProgressBar';
import '../Game.css';

const AudioQuestion = ({ 
  question, 
  audioUrl, 
  options, 
  onAnswer, 
  correctAnswer,
  currentQuestion, 
  totalQuestions, 
  progressPercentage 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef(null);

  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) {
      // If already answered, proceed to next question
      if (isAnswered) {
        onAnswer(selectedOption);
      }
      return;
    }
    
    const correct = selectedOption === correctAnswer;
    setIsCorrect(correct);
    
    // Show feedback
    if (correct) {
      setFeedbackMessage('Correct! Great job!');
      setFeedbackType('correct');
    } else {
      setFeedbackMessage(`Incorrect. The correct answer is "${correctAnswer}".`);
      setFeedbackType('incorrect');
    }
    
    setIsAnswered(true);
  };

  const getOptionClass = (option) => {
    if (!isAnswered) {
      return selectedOption === option ? 'selected' : '';
    }
    
    if (option === correctAnswer) {
      return 'correct';
    }
    
    if (option === selectedOption && option !== correctAnswer) {
      return 'incorrect';
    }
    
    return '';
  };

  return (
    <div className="question-type audio-question">
      {/* Progress Bar */}
      <ProgressBar 
        percentage={progressPercentage} 
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
      
      <h3 className="question-text">{question}</h3>
      
      <div className="audio-player">
        <audio 
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnd}
        />
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlayAudio}
        >
          {isPlaying ? 'Pause' : 'Play Audio'}
        </button>
      </div>
      
      <div className="options-container">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`option ${getOptionClass(option)}`}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="option-letter">{String.fromCharCode(65 + index)}</div>
            <div className="option-text">{option}</div>
          </div>
        ))}
      </div>
      
      <div className="feedback-button-container">
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedOption && !isAnswered}
        >
          {isAnswered ? 'Next Question' : 'Check Answer'}
        </button>
        
        {feedbackMessage && (
          <div className={`feedback-message ${feedbackType} ${isAnswered ? 'visible' : ''}`}>
            {feedbackMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioQuestion; 