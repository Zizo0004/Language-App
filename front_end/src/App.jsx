import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateTo('game');
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <>
          {currentPage === 'login' && <Login navigateTo={navigateTo} onLogin={handleLogin} />}
          {currentPage === 'register' && <Register navigateTo={navigateTo} />}
        </>
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
