import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Learn from './components/Learn';
import MostWords from './components/MostWords';
import Test from './components/test';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes that redirect if authenticated */}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/learn" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register /> : <Navigate to="/learn" />} 
          />
          <Route path="/test" element={<Test />} />

          {/* Protected routes that redirect if not authenticated */}
          <Route 
            path="/learn" 
            element={isAuthenticated ? <Learn /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/game" 
            element={isAuthenticated ? <Game /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/most_words" 
            element={isAuthenticated ? <MostWords /> : <Navigate to="/login" />} 
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;