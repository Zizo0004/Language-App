import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import './test.css';

export default function Login() {
  const [formData, setFormData] = useState({ firstName: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!agreeToTerms) newErrors.terms = 'Please accept our terms to continue';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setFormData({ firstName: '', password: '' });
        setAgreeToTerms(false);
        setShowSuccess(false);
      }, 4000);
    }, 2000);
  };

  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className={`signup-container ${isLoaded ? 'move-signup-page' : ''}`}>
      <div className="background-overlay">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      <div className="grid-pattern"></div>
      <div className="content-wrapper">
        <div className="form-container">
          
          <div className="main-card">
            <div className="header-section">
              <h1 className="main-title">Sign In</h1>
              <p className="subtitle">For a better user experience</p>
            </div>
            <div className="form-section">
              <div className="name-fields">
                <div className="input-group">
                  <label className="input-label">Username</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a secure password"
                    className={`form-input password-input ${errors.password ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="terms-section">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="terms-checkbox"
                  />
                </div>
                <label htmlFor="terms" className="terms-label">
                  I agree to the{' '}
                  <a href="#" className="terms-link">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="terms-link">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && <p className="error-message">{errors.terms}</p>}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`submit-button ${isLoading ? 'submit-loading' : ''}`}
              >
                <div className="button-content">
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={18} className="arrow-icon" />
                    </>
                  )}
                </div>
              </button>
            </div>
            <div className="signin-section">
              <p className="signin-text">Don't have an account?{' '}
                <a href="/test" className="signin-link">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 