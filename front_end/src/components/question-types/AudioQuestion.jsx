import React, { useState, useRef } from 'react';
import '../Game.css';

const AudioQuestion = ({ question, audioUrl, options, onAnswer, correctAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = useRef(null);
  const correctSoundRef = useRef(null);

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
      // Play correct sound
      if (correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(e => console.log('Error playing sound:', e));
      }
    } else {
      setFeedbackMessage(`Incorrect. The correct answer is "${correctAnswer}".`);
      setFeedbackType('incorrect');
    }
    
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    onAnswer(selectedOption);
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
      {/* Sound effect for correct answer */}
      <audio ref={correctSoundRef} src="/sounds/correct-answer.mp3" preload="auto" />
      
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
      
      {!isAnswered && (
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Check Answer
        </button>
      )}
      
      {isAnswered && (
        <div className={`feedback-message ${feedbackType} visible`}>
          <div className="feedback-message-text">{feedbackMessage}</div>
          <button className="feedback-next-button" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioQuestion; 