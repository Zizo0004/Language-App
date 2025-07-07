import { useState } from 'react';
import ProgressBar from './ProgressBar';
import MultipleChoice from './question-types/MultipleChoice';
import Pairing from './question-types/Pairing';
import AudioQuestion from './question-types/AudioQuestion';
import './Game.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  axios.get('http://127.0.0.1:8000/most_words/')
  .then(respone => {
    console.log(respone.data);
  })

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is "hello" in Spanish?',
      options: ['Hola', 'Adiós', 'Gracias', 'Buenos días'],
      correctAnswer: 'Hola',
      points: 10
    },
    {
      id: 2,
      type: 'pairing',
      question: 'Match the words with their translations',
      pairs: [
        { id: 1, term: 'Dog', translation: 'Perro' },
        { id: 2, term: 'Cat', translation: 'Gato' },
        { id: 3, term: 'House', translation: 'Casa' },
        { id: 4, term: 'Car', translation: 'Coche' }
      ],
      points: 20
    },
    {
      id: 3,
      type: 'audio',
      question: 'Listen and select the correct word',
      audioUrl: '/src/assets/sounds/bonjour.mp3',
      options: ['Hello', 'Goodbye', 'Thank you', 'Good morning'],
      correctAnswer: 'Hello',
      points: 15
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'What is "thank you" in French?',
      options: ['Merci', 'Bonjour', 'Au revoir', 'S\'il vous plaît'],
      correctAnswer: 'Merci',
      points: 10
    },
    {
      id: 5,
      type: 'pairing',
      question: 'Match the numbers with their French translations',
      pairs: [
        { id: 1, term: 'One', translation: 'Un' },
        { id: 2, term: 'Two', translation: 'Deux' },
        { id: 3, term: 'Three', translation: 'Trois' },
        { id: 4, term: 'Four', translation: 'Quatre' }
      ],
      points: 20
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    // Check if answer is correct based on question type
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'audio') {
      isCorrect = answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'pairing') {
      // For pairing, answer should be an array of matched pairs
      // We'll check if all pairs are correct
      isCorrect = answer.every(pair => 
        currentQuestion.pairs.some(
          correctPair => correctPair.term === pair.term && correctPair.translation === pair.translation
        )
      );
    }

    // Save user's answer
    setUserAnswers([...userAnswers, {
      questionId: currentQuestion.id,
      answer,
      isCorrect
    }]);

    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setUserAnswers([]);
  };

  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  // Render the current question based on its type
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    
    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoice 
            question={question.question}
            options={question.options}
            onAnswer={handleAnswer}
            correctAnswer={question.correctAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            progressPercentage={progressPercentage}
          />
        );
      case 'pairing':
        return (
          <Pairing 
            question={question.question}
            pairs={question.pairs}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            progressPercentage={progressPercentage}
          />
        );
      case 'audio':
        return (
          <AudioQuestion 
            question={question.question}
            audioUrl={question.audioUrl}
            options={question.options}
            onAnswer={handleAnswer}
            correctAnswer={question.correctAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            progressPercentage={progressPercentage}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="game-container">
      {!gameCompleted ? (
        renderQuestion()
      ) : (
        <div className="game-completed">
          <h2>Completed!</h2>
          <p>You've completed all the questions.</p>
          <button className="restart-button" onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game; 