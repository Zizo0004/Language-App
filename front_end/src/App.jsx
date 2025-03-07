import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      {currentPage === 'login' && <Login navigateTo={navigateTo} />}
      {currentPage === 'register' && <Register navigateTo={navigateTo} />}
    </div>
  );
}

export default App;
