import { useState } from 'react';
import './Auth.css';
import axios from 'axios';

const Register = ({ navigateTo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Handle registration logic here
    console.log('Registration attempt with:', { name, email, password });
    setError('');
    axios.post('http://127.0.0.1:8000/create_user/',{username:name,email:email,password:password})
  .then(response => {
    console.log(response.data);
  })
    // Navigate back to login page after successful registration
    navigateTo('login');
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="grain-overlay"></div>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h1 className="auth-title">Create Account</h1>
          {/* <p className="auth-subtitle">Join our community today</p> */}
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">I agree to the Terms & Conditions</label>
              </div>
            </div>
            
            <button type="submit" className="auth-button">Create Account</button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="auth-link">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 