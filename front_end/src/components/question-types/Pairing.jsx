import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '../ProgressBar';
import '../Game.css';
// Import the sound files
import correctSound from '../../assets/sounds/correct.mp3';
import wrongSound from '../../assets/sounds/wrong.mp3';

const Pairing = ({ 
  question, 
  pairs, 
  onAnswer,
  currentQuestion, 
  totalQuestions, 
  progressPercentage 
}) => {
  const [terms, setTerms] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  // Shuffle the terms and translations on component mount
  useEffect(() => {
    const shuffledTerms = [...pairs].sort(() => Math.random() - 0.5);
    const shuffledTranslations = [...pairs].sort(() => Math.random() - 0.5);
    
    setTerms(shuffledTerms);
    setTranslations(shuffledTranslations);
  }, [pairs]);

  const handleTermSelect = (term) => {
    if (isAnswered) return;
    
    // Check if this term is already matched
    if (matchedPairs.some(pair => pair.term === term.term)) {
      return;
    }
    
    setSelectedTerm(term);
    
    // If a translation is already selected, check for a match
    if (selectedTranslation) {
      checkForMatch(term, selectedTranslation);
    }
  };

  const handleTranslationSelect = (translation) => {
    if (isAnswered) return;
    
    // Check if this translation is already matched
    if (matchedPairs.some(pair => pair.translation === translation.translation)) {
      return;
    }
    
    setSelectedTranslation(translation);
    
    // If a term is already selected, check for a match
    if (selectedTerm) {
      checkForMatch(selectedTerm, translation);
    }
  };

  const checkForMatch = (term, translation) => {
    // Find the correct translation for the selected term
    const correctTranslation = pairs.find(p => p.id === term.id);
    
    if (correctTranslation.translation === translation.translation) {
      // It's a match!
      setMatchedPairs([...matchedPairs, { 
        term: term.term, 
        translation: translation.translation 
      }]);
      
      // Play correct sound
      if (correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(e => console.log('Error playing sound:', e));
      }
      
      // Check if all pairs are matched
      const newMatchedPairs = [...matchedPairs, { term: term.term, translation: translation.translation }];
      if (newMatchedPairs.length === pairs.length) {
        setFeedbackMessage('Great job! All pairs matched correctly!');
        setFeedbackType('correct');
      }
    } else {
      // Wrong match - show shake animation
      setWrongPair({
        term: term.term,
        translation: translation.translation
      });
      
      // Play wrong sound
      if (wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(e => console.log('Error playing sound:', e));
      }
      
      // Remove the wrong pair class after animation completes
      setTimeout(() => {
        setWrongPair(null);
      }, 500);
    }
    
    // Reset selections after a short delay
    setTimeout(() => {
      setSelectedTerm(null);
      setSelectedTranslation(null);
    }, 300);
  };

  const handleSubmit = () => {
    if (matchedPairs.length !== pairs.length && !isAnswered) return;
    
    if (isAnswered) {
      // If already answered, proceed to next question
      onAnswer(matchedPairs);
    } else {
      setIsAnswered(true);
    }
  };

  const isTermSelected = (term) => {
    return selectedTerm && selectedTerm.term === term.term;
  };

  const isTranslationSelected = (translation) => {
    return selectedTranslation && selectedTranslation.translation === translation.translation;
  };

  const isTermWrong = (term) => {
    return wrongPair && wrongPair.term === term.term;
  };

  const isTranslationWrong = (translation) => {
    return wrongPair && wrongPair.translation === translation.translation;
  };

  // Determine if all pairs are matched
  const allPairsMatched = matchedPairs.length === pairs.length;

  return (
    <div className="question-type pairing">
      {/* Progress Bar */}
      <ProgressBar 
        percentage={progressPercentage} 
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
      
      {/* Sound effects */}
      <audio ref={correctSoundRef} src={correctSound} preload="auto" />
      <audio ref={wrongSoundRef} src={wrongSound} preload="auto" />
      
      <h3 className="question-text">{question}</h3>
      
      <div className="pairing-container">
        <div className="terms-column">
          <h4>Terms</h4>
          {terms.map((term, index) => {
            const isMatched = matchedPairs.some(pair => pair.term === term.term);
            const isSelected = isTermSelected(term);
            const isWrong = isTermWrong(term);
            
            return (
              <div 
                key={index}
                className={`pairing-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => handleTermSelect(term)}
              >
                {term.term}
              </div>
            );
          })}
        </div>
        
        <div className="translations-column">
          <h4>Translations</h4>
          {translations.map((translation, index) => {
            const isMatched = matchedPairs.some(pair => pair.translation === translation.translation);
            const isSelected = isTranslationSelected(translation);
            const isWrong = isTranslationWrong(translation);
            
            return (
              <div 
                key={index}
                className={`pairing-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => handleTranslationSelect(translation)}
              >
                {translation.translation}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="feedback-button-container">
        {feedbackMessage && (
          <div className={`feedback-message ${feedbackType} ${allPairsMatched ? 'visible' : ''}`}>
            {feedbackMessage}
          </div>
        )}
        
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={matchedPairs.length !== pairs.length && !isAnswered}
        >
          {isAnswered || allPairsMatched ? 'Next Question' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Pairing; 