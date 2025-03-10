import React, { useState, useEffect, useRef } from 'react';
import '../Game.css';

const Pairing = ({ question, pairs, onAnswer }) => {
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
      const newMatchedPairs = [...matchedPairs, { 
        term: term.term, 
        translation: translation.translation 
      }];
      
      setMatchedPairs(newMatchedPairs);
      
      // Play correct sound
      if (correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(e => console.log('Error playing sound:', e));
      }

      // Check if all pairs are matched
      if (newMatchedPairs.length === pairs.length) {
        setFeedbackMessage('Great job! You matched all pairs correctly!');
        setFeedbackType('correct');
        setIsAnswered(true);
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

  const handleNextQuestion = () => {
    onAnswer(matchedPairs);
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
      {/* Sound effects */}
      <audio ref={correctSoundRef} src="/sounds/correct-answer.mp3" preload="auto" />
      <audio ref={wrongSoundRef} src="/sounds/wrong-answer.mp3" preload="auto" />
      
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
      
      <div className="pairing-progress">
        {matchedPairs.length} of {pairs.length} pairs matched
      </div>
      
      {allPairsMatched && !isAnswered && (
        <button 
          className="submit-button"
          onClick={() => setIsAnswered(true)}
        >
          Next Question
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

export default Pairing; 