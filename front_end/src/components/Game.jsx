import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import MultipleChoice from './question-types/MultipleChoice';
import './Game.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Game = () => {
  const [questionSet, setQuestionSet] = useState([]);
  const [gameQuestions, setGameQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/most_words/')
      .then(response => {
        setQuestionSet(response.data);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  useEffect(() => {
    if (questionSet.length > 0) {
      const generatedQuestions = questionSet.map((word, index) => {
        const correctAnswer = word.translation;
        
        let otherOptions = questionSet
          .map(w => w.translation)
          .filter(t => t !== correctAnswer);
        
        otherOptions = shuffleArray(otherOptions);
        
        const options = shuffleArray([correctAnswer, ...otherOptions.slice(0, 3)]);

        return {
          id: index + 1,
          type: 'multiple-choice',
          question: `What is the translation of "${word.word}"?`,
          options: options,
          correctAnswer: correctAnswer,
          points: 10,
        };
      });
      setGameQuestions(generatedQuestions);
    }
  }, [questionSet]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleAnswerSelection = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const newUserAnswers = [...userAnswers];
    const answerIndex = newUserAnswers.findIndex(a => a.questionId === currentQuestion.id);

    const newAnswer = {
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      isCorrect
    };

    if (answerIndex > -1) {
      newUserAnswers[answerIndex] = newAnswer;
    } else {
      newUserAnswers.push(newAnswer);
    }
    setUserAnswers(newUserAnswers);
    setIsAnswered(true);

    if (isCorrect) {
      setFeedback({ message: 'Correct!', type: 'correct' });
    } else {
      setFeedback({ message: `The correct answer is: ${currentQuestion.correctAnswer}`, type: 'incorrect' });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback({ message: '', type: '' });
    } else {
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedback({ message: '', type: '' });
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback({ message: '', type: '' });
    }
  };

  const goToHomepage = () => {
    navigate('/learn');
  };

  const progressPercentage = ((currentQuestionIndex) / (gameQuestions.length || 1)) * 100;

  const renderQuestion = () => {
    if (gameQuestions.length === 0) {
      return <div className="loading">Loading questions...</div>;
    }

    const question = gameQuestions[currentQuestionIndex];
    
    const questionComponent = () => {
        switch (question.type) {
            case 'multiple-choice':
                return (
                <MultipleChoice 
                    question={question.question}
                    options={question.options}
                    onAnswer={handleAnswerSelection}
                    correctAnswer={question.correctAnswer}
                    selectedAnswer={selectedAnswer}
                    isAnswered={isAnswered}
                />
                );
            default:
                return <div>Unknown question type</div>;
        }
    }

    return (
        <div className="question-container-wrapper" key={currentQuestionIndex}>
            <ProgressBar
                percentage={progressPercentage}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={gameQuestions.length}
            />
            {questionComponent()}
        </div>
    )
  };

  return (
    <div className="signup-container">
      <div className="background-overlay">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      <div className="grid-pattern"></div>
      
      <div className="content-wrapper">
        <div className="game-content-area">
          {!gameCompleted ? (
            <>
              {renderQuestion()}
              <div className="navigation-buttons">
                <button onClick={goToHomepage} className="homepage-button-svg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </button>
                <button onClick={goToPrevious} disabled={currentQuestionIndex === 0}>
                  Back
                </button>
                {!isAnswered && (
                  <button className="check-button" onClick={checkAnswer} disabled={!selectedAnswer}>
                    Check
                  </button>
                )}
                <button className="next-button" onClick={handleNext}>
                  {currentQuestionIndex === gameQuestions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            <div className="game-completed">
              <h2>Game Completed!</h2>
              <p>You've completed all the questions.</p>
              <button className="restart-button" onClick={restartGame}>Play Again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game; 