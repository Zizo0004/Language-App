import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, CheckCircle, Sparkles, ArrowRight, Shield, Zap } from 'lucide-react';
import './test.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'Please accept our terms to continue';
    }
    
    return newErrors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setAgreeToTerms(false);
        setShowSuccess(false);
      }, 4000);
    }, 2000);
  };
  useEffect(() => {
    console.log("page loaded");
    setIsLoaded(true);
  }, []);

  return (
    <div className={`signup-container ${isLoaded ? 'move-signup-page' : ''}`}>
      {/* Animated Background Elements */}
      <div className="background-overlay">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-pattern"></div>

      <div className="content-wrapper">
        <div className="form-container">
          {/* Success Animation */}
          {showSuccess && (
            <div className="success-notification">
              <div className="success-content">
                <div className="success-icon">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <p className="success-title">Welcome aboard! 🎉</p>
                  <p className="success-subtitle">Your account has been created successfully</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="main-card">
            {/* Header */}
            <div className="header-section">
              <h1 className="main-title">Sign Up</h1>
              <p className="subtitle">For a better user experience</p>
            </div>


            {/* Form */}
            <div className="form-section">
              {/* Name Fields */}
              <div className="name-fields">
                <div className="input-group">
                  <label className="input-label">Username</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John"
                      className={`form-input ${errors.firstName ? 'input-error' : ''} ${focusedField === 'firstName' ? 'input-focused' : ''}`}
                    />
                    {focusedField === 'firstName' && (
                      <div className="input-glow"></div>
                    )}
                  </div>
                  {errors.firstName && (
                    <p className="error-message">{errors.firstName}</p>
                  )}
                </div>


              </div>

              {/* Email */}
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john@example.com"
                    className={`form-input ${errors.email ? 'input-error' : ''} ${focusedField === 'email' ? 'input-focused' : ''}`}
                  />
                  {focusedField === 'email' && (
                    <div className="input-glow"></div>
                  )}
                </div>
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Create a strong password"
                    className={`form-input password-input ${errors.password ? 'input-error' : ''} ${focusedField === 'password' ? 'input-focused' : ''}`}
                  />
                  <button
                    type="button"
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {focusedField === 'password' && (
                    <div className="input-glow"></div>
                  )}
                </div>
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm your password"
                    className={`form-input password-input ${errors.confirmPassword ? 'input-error' : ''} ${focusedField === 'confirmPassword' ? 'input-focused' : ''}`}
                  />
                  <button
                    type="button"
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {focusedField === 'confirmPassword' && (
                    <div className="input-glow"></div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
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
              {errors.terms && (
                <p className="error-message">{errors.terms}</p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`submit-button ${isLoading ? 'submit-loading' : ''}`}
              >
                <div className="button-content">
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Creating your account...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight size={18} className="arrow-icon" />
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Sign In Link */}
            <div className="signin-section">
              <p className="signin-text">
                Already have an account?{' '}
                <a href="#" className="signin-link">Sign in</a>
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}