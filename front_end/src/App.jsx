import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Learn from './components/Learn';
import MostWords from './components/MostWords';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateTo('learn');
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <>
          {currentPage === 'login' && <Login navigateTo={navigateTo} onLogin={handleLogin} />}
          {currentPage === 'register' && <Register navigateTo={navigateTo} />}
        </>
      ) : (
        <>
          {currentPage === 'learn' && <Learn navigateTo={navigateTo} />}
          {currentPage === 'game' && <Game />}
          {currentPage === 'most_words' && <MostWords />}
        </>
      )}
    </div>
  );
}

export default App;
