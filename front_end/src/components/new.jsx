import React from 'react';
import './new.css';

// This is the SVG Logo component for LangShare.
const LangShareLogo = () => (
    <svg className="branding__logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 9.5L14 11L15.5 12.5L14 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 9.5L10 11L8.5 12.5L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2.5C14.251 4.893 15.502 7.893 15.5 11C15.5 14.107 14.251 17.107 12 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2.5C9.749 4.893 8.498 7.893 8.5 11C8.5 14.107 9.749 17.107 12 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// The main Sign Up Page component.
const SignUpPage = () => {
    // This function would handle the form submission logic.
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // In a real app, you would handle form data here.
        console.log("Form submitted!");
    };

    return (
        <>
            <SignupStyles />
            <div className="signup-page">
                
                {/* Left Column: Branding & Logo */}
                <div className="branding-container">
                    <div className="branding-content">
                        <LangShareLogo />
                        <h1 className="branding__title">LangShare</h1>
                        <p className="branding__subtitle">Connecting the world, one word at a time.</p>
                    </div>
                </div>

                {/* Right Column: Sign-up Form */}
                <div className="form-container">
                    <div className="form-wrapper">
                        
                        {/* Header */}
                        <div className="form__header">
                            <h1 className="form__title">Create an Account</h1>
                            <p className="form__subtitle">Join us and start your journey!</p>
                        </div>

                        {/* Sign-up Form */}
                        <form className="form" onSubmit={handleFormSubmit}>
                            {/* Full Name Input */}
                            <div className="form__group">
                                <label htmlFor="full-name" className="form__label">Full Name</label>
                                <input 
                                    id="full-name" 
                                    name="full-name" 
                                    type="text" 
                                    required
                                    className="form__input"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="form__group">
                                <label htmlFor="email" className="form__label">Email Address</label>
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    autoComplete="email" 
                                    required
                                    className="form__input"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form__group">
                                <label htmlFor="password" className="form__label">Password</label>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    autoComplete="new-password" 
                                    required
                                    className="form__input"
                                />
                            </div>
                            
                            {/* Submit Button */}
                            <div className="form__group--submit">
                                <button type="submit" className="form__button">
                                    Create Account
                                </button>
                            </div>
                        </form>

                        {/* Sign In Link */}
                        <div className="signin-link__container">
                            <p className="signin-link__text">
                                Already have an account?
                                <a href="#" className="signin-link__anchor">
                                    Sign In
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

// The main App component to render the SignUpPage.
export default function App() {
  return (
    <SignUpPage />
  );
}
