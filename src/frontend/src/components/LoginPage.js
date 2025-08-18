// src/components/LoginPage.js 
import React, { useState, useEffect } from 'react';

const LoginPage = ({ onLogin }) => {
    const [currentView, setCurrentView] = useState('login'); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        age: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signupStep, setSignupStep] = useState(1); 

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

        if (currentView === 'signup') {
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last name is required';
            }
            if (!formData.age || formData.age < 6 || formData.age > 100) {
                newErrors.age = 'Age must be between 6 and 100';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (!formData.agreeTerms) {
                newErrors.agreeTerms = 'You must agree to the terms and conditions';
            }
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (currentView === 'signup' && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (type = 'email', socialUserData = null) => {
        if (type === 'email' && !validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            let userData = {};

            switch (type) {
                case 'email':
                    userData = {
                        type: 'email',
                        name: currentView === 'signup' ? `${formData.firstName} ${formData.lastName}` : formData.email.split('@')[0],
                        email: formData.email,
                        firstName: formData.firstName || formData.email.split('@')[0],
                        lastName: formData.lastName || '',
                        age: formData.age || null,
                        isNewUser: currentView === 'signup'
                    };
                    break;
                case 'google':
                    userData = socialUserData || {
                        type: 'google',
                        name: 'Google User',
                        email: 'user@gmail.com',
                        firstName: 'Google',
                        lastName: 'User',
                        isNewUser: false
                    };
                    break;
                case 'apple':
                    userData = socialUserData || {
                        type: 'apple',
                        name: 'Apple User',
                        email: 'user@icloud.com',
                        firstName: 'Apple',
                        lastName: 'User',
                        isNewUser: false
                    };
                    break;
                case 'guest':
                    userData = {
                        type: 'guest',
                        name: 'Guest Explorer',
                        firstName: 'Guest',
                        lastName: 'Explorer',
                        isNewUser: false
                    };
                    break;
            }

            if (currentView === 'signup' && type === 'email') {
                alert(`🎉 Welcome to Story Weaver, ${userData.name}! Your account has been created successfully.`);
            }

            console.log('🔐 Login successful with user data:', userData);

            if (typeof onLogin === 'function') {
                onLogin(userData);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign-In with better error handling
    const handleGoogleLogin = () => {
        console.log('🔵 Google login initiated');

        if (window.location.hostname === 'localhost') {
            console.log('🔧 Development mode - Using demo Google login');
            const userConfirm = window.confirm(
                '🔧 Development Mode\n\n' +
                'This is a demo of Google Sign-In. In production, this would:\n' +
                '1. Open real Google OAuth popup\n' +
                '2. Let you sign in with your Google account\n' +
                '3. Return your actual Google profile\n\n' +
                'For now, we\'ll simulate a successful login.\n\n' +
                'Continue with demo?'
            );

            if (userConfirm) {
                setIsLoading(true);
                setTimeout(() => {
                    const demoGoogleUser = {
                        type: 'google',
                        name: 'Demo Google User',
                        email: 'demo@gmail.com',
                        firstName: 'Demo',
                        lastName: 'User',
                        picture: 'https://via.placeholder.com/150',
                        isNewUser: false
                    };
                    handleLogin('google', demoGoogleUser);
                }, 2000);
            }
            return;
        }

        if (window.google && window.google.accounts) {
            try {
                window.google.accounts.id.prompt((notification) => {
                    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        console.log('🔧 Google prompt not displayed, trying manual flow');
                        handleManualGoogleLogin();
                    }
                });
            } catch (error) {
                console.error('Google Sign-In error:', error);
                alert('Google Sign-In is not available. Please try email login or continue as guest.');
            }
        } else {
            console.log('🔧 Google APIs not loaded, using manual flow');
            handleManualGoogleLogin();
        }
    };

    const handleManualGoogleLogin = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

        if (!clientId || clientId === 'your-google-client-id') {
            alert(
                '🔧 Google Sign-In Setup Required\n\n' +
                'To use real Google Sign-In:\n' +
                '1. Get a Google OAuth Client ID\n' +
                '2. Add it to your .env file as REACT_APP_GOOGLE_CLIENT_ID\n' +
                '3. Configure authorized domains\n\n' +
                'For now, using demo mode...'
            );

            setIsLoading(true);
            setTimeout(() => {
                const demoUser = {
                    type: 'google',
                    name: 'Demo Google User',
                    email: 'demo@gmail.com',
                    firstName: 'Demo',
                    lastName: 'User',
                    isNewUser: false
                };
                handleLogin('google', demoUser);
            }, 2000);
            return;
        }

        const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=email profile&response_type=code&prompt=select_account`;

        const popup = window.open(
            googleAuthUrl,
            'google-signin',
            'width=500,height=600,scrollbars=yes,resizable=yes'
        );

        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                console.log('Google OAuth popup closed');
            }
        }, 1000);
    };

    const handleAppleLogin = () => {
        console.log('🍎 Apple login initiated');

        const userConfirm = window.confirm(
            '🍎 Apple Sign-In Demo\n\n' +
            'This is a demo of Apple Sign-In. In production, this would:\n' +
            '1. Open Apple authentication popup\n' +
            '2. Let you sign in with your Apple ID\n' +
            '3. Return your Apple account info\n\n' +
            'Continue with demo?'
        );

        if (userConfirm) {
            setIsLoading(true);
            setTimeout(() => {
                const demoAppleUser = {
                    type: 'apple',
                    name: 'Demo Apple User',
                    email: 'demo@icloud.com',
                    firstName: 'Demo',
                    lastName: 'User',
                    isNewUser: false
                };
                handleLogin('apple', demoAppleUser);
            }, 2000);
        }
    };

    const handleGoogleResponse = (response) => {
        try {
            const userInfo = JSON.parse(atob(response.credential.split('.')[1]));

            const userData = {
                type: 'google',
                name: userInfo.name,
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
                picture: userInfo.picture,
                isNewUser: false
            };

            console.log('🔵 Google user info received:', userData);
            handleLogin('google', userData);
        } catch (error) {
            console.error('Google sign-in error:', error);
            const demoUser = {
                type: 'google',
                name: 'Google User',
                email: 'user@gmail.com',
                firstName: 'Google',
                lastName: 'User',
                isNewUser: false
            };
            handleLogin('google', demoUser);
        }
    };

    const handleForgotPassword = () => {
        if (!formData.email.trim()) {
            setErrors({ email: 'Please enter your email address' });
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            alert(`Password reset link sent to ${formData.email}! Check your inbox.`);
            setCurrentView('login');
        }, 2000);
    };

    const renderSignupStep = () => {
        switch (signupStep) {
            case 1:
                return (
                    <div className="signup-step">
                        <h3 style={{ color: '#6c5ce7', marginBottom: '20px' }}>📝 Step 1: Basic Information</h3>

                        <div className="form-row">
                            <div className="form-field">
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`login-input ${errors.firstName ? 'error' : ''}`}
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                            </div>
                            <div className="form-field">
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`login-input ${errors.lastName ? 'error' : ''}`}
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                            </div>
                        </div>

                        <div className="form-field">
                            <input
                                type="number"
                                name="age"
                                className={`login-input ${errors.age ? 'error' : ''}`}
                                placeholder="Age (6-100)"
                                min="6"
                                max="100"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                            {errors.age && <div className="error-message">{errors.age}</div>}
                        </div>

                        <button
                            type="button"
                            className="login-btn primary"
                            onClick={() => {
                                const step1Errors = {};
                                if (!formData.firstName.trim()) step1Errors.firstName = 'First name is required';
                                if (!formData.lastName.trim()) step1Errors.lastName = 'Last name is required';
                                if (!formData.age || formData.age < 6 || formData.age > 100) step1Errors.age = 'Age must be between 6 and 100';

                                if (Object.keys(step1Errors).length > 0) {
                                    setErrors(step1Errors);
                                } else {
                                    setErrors({});
                                    setSignupStep(2);
                                }
                            }}
                        >
                            Next: Account Details →
                        </button>
                    </div>
                );

            case 2:
                return (
                    <div className="signup-step">
                        <h3 style={{ color: '#6c5ce7', marginBottom: '20px' }}>🔐 Step 2: Account Security</h3>

                        <div className="form-field">
                            <input
                                type="email"
                                name="email"
                                className={`login-input ${errors.email ? 'error' : ''}`}
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>

                        <div className="form-field password-field">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className={`login-input ${errors.password ? 'error' : ''}`}
                                placeholder="Password (min 6 characters)"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>

                        <div className="form-field">
                            <input
                                type="password"
                                name="confirmPassword"
                                className={`login-input ${errors.confirmPassword ? 'error' : ''}`}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>

                        <div className="form-navigation">
                            <button
                                type="button"
                                className="login-btn secondary"
                                onClick={() => setSignupStep(1)}
                            >
                                ← Back
                            </button>
                            <button
                                type="button"
                                className="login-btn primary"
                                onClick={() => {
                                    if (validateStep2()) {
                                        setSignupStep(3);
                                    }
                                }}
                            >
                                Next: Agreement →
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="signup-step">
                        <h3 style={{ color: '#6c5ce7', marginBottom: '20px' }}>✅ Step 3: Terms & Agreement</h3>

                        <div className="terms-section">
                            <div className="terms-content">
                                <h4>📜 Story Weaver Terms of Service</h4>
                                <ul>
                                    <li>✅ Your stories and creations belong to you</li>
                                    <li>✅ We protect your privacy and data</li>
                                    <li>✅ Family-friendly content only</li>
                                    <li>✅ Use AI assistance responsibly</li>
                                    <li>✅ Be kind and respectful to other creators</li>
                                </ul>
                            </div>

                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                            {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
                        </div>

                        <div className="form-navigation">
                            <button
                                type="button"
                                className="login-btn secondary"
                                onClick={() => setSignupStep(2)}
                            >
                                ← Back
                            </button>
                            <button
                                type="button"
                                className="login-btn primary"
                                onClick={() => handleLogin('email')}
                                disabled={!formData.agreeTerms || isLoading}
                            >
                                {isLoading ? '🔄 Creating Account...' : '🎉 Create Account'}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">📚✨</div>
            <h1 className="login-title">Story Weaver</h1>
            <p className="login-subtitle">Create magical stories with AI and Propp's morphology!</p>

            {/* Navigation Tabs */}
            <div className="auth-tabs">
                <button
                    className={`auth-tab ${currentView === 'login' ? 'active' : ''}`}
                    onClick={() => {
                        setCurrentView('login');
                        setSignupStep(1);
                        setErrors({});
                    }}
                >
                    🔐 Login
                </button>
                <button
                    className={`auth-tab ${currentView === 'signup' ? 'active' : ''}`}
                    onClick={() => {
                        setCurrentView('signup');
                        setSignupStep(1);
                        setErrors({});
                    }}
                >
                    📝 Sign Up
                </button>
            </div>

            {/* Login Form */}
            {currentView === 'login' && (
                <div className="auth-form">
                    <div className="login-instructions">
                        <h3>🎯 Welcome Back!</h3>
                        <p>Sign in to continue your storytelling journey and access your saved stories.</p>
                    </div>

                    <div className="login-form">
                        <input
                            type="email"
                            name="email"
                            className={`login-input ${errors.email ? 'error' : ''}`}
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}

                        <div className="password-field">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className={`login-input ${errors.password ? 'error' : ''}`}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin('email')}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.password && <div className="error-message">{errors.password}</div>}

                        <button
                            className="login-btn primary"
                            onClick={() => handleLogin('email')}
                            disabled={isLoading}
                        >
                            {isLoading ? '🔄 Signing In...' : '🚀 Login'}
                        </button>

                        <button
                            type="button"
                            className="forgot-password-btn"
                            onClick={() => setCurrentView('forgot')}
                        >
                            Forgot Password?
                        </button>
                    </div>
                </div>
            )}

            {/* Signup Form */}
            {currentView === 'signup' && (
                <div className="auth-form">
                    <div className="signup-progress">
                        <div className="progress-dots">
                            {[1, 2, 3].map(step => (
                                <div
                                    key={step}
                                    className={`progress-dot ${signupStep >= step ? 'active' : ''}`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                        <p>Step {signupStep} of 3</p>
                    </div>

                    {renderSignupStep()}
                </div>
            )}

            {/* Forgot Password */}
            {currentView === 'forgot' && (
                <div className="auth-form">
                    <div className="login-instructions">
                        <h3>🔑 Reset Password</h3>
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    <div className="login-form">
                        <input
                            type="email"
                            name="email"
                            className={`login-input ${errors.email ? 'error' : ''}`}
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}

                        <button
                            className="login-btn primary"
                            onClick={handleForgotPassword}
                            disabled={isLoading}
                        >
                            {isLoading ? '🔄 Sending...' : '📧 Send Reset Link'}
                        </button>

                        <button
                            type="button"
                            className="forgot-password-btn"
                            onClick={() => setCurrentView('login')}
                        >
                            ← Back to Login
                        </button>
                    </div>
                </div>
            )}

            {/* Social Login & Guest Options */}
            {(currentView === 'login' || currentView === 'signup') && (
                <>
                    <div style={{ margin: '20px 0', color: '#636e72', fontWeight: 'bold' }}>or</div>

                    <div className="social-login">
                        <button
                            className="login-btn secondary social-btn"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <span className="social-icon">📧</span>
                            Continue with Google
                        </button>
                        <button
                            className="login-btn secondary social-btn"
                            onClick={handleAppleLogin}
                            disabled={isLoading}
                        >
                            <span className="social-icon">🍎</span>
                            Continue with Apple
                        </button>
                    </div>

                    <button
                        className="login-btn guest"
                        onClick={() => handleLogin('guest')}
                        disabled={isLoading}
                    >
                        👤 Continue as Guest
                    </button>
                </>
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner">🔄</div>
                    <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                        {currentView === 'signup' ? 'Creating your account...' : 'Signing you in...'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
