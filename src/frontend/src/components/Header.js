// src/components/Header.js 
import React, { useState, useEffect, useRef } from 'react';

const Header = ({
    showDemoModal,
    toggleBigText,
    adjustContrast,
    handleLogout,
    isBigText = false,
    contrast = 100,
    currentUser = { name: 'Guest' },
    backendConnected = false
}) => {
    const [helpOpen, setHelpOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [theme, setTheme] = useState('default');
    const helpRef = useRef(null);
    const userRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (helpRef.current && !helpRef.current.contains(event.target)) {
                setHelpOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme') || 'default';
        setTheme(savedTheme);
        if (savedTheme !== 'default') {
            changeTheme(savedTheme);
        }
    }, []);

    const closeMenus = () => {
        setHelpOpen(false);
        setUserOpen(false);
    };

    const handleHelpToggle = () => {
        setUserOpen(false);
        setHelpOpen(!helpOpen);
    };

    const handleUserToggle = () => {
        setHelpOpen(false);
        setUserOpen(!userOpen);
    };

    const handleContrastChange = (e) => {
        const value = e.target.value;
        adjustContrast(value);
    };

    const changeTheme = (newTheme) => {
        document.body.className = document.body.className.replace(/\b\w+-theme\b/g, '');

        if (newTheme !== 'default') {
            document.body.classList.add(newTheme + '-theme');
        }

        setTheme(newTheme);
        localStorage.setItem('selectedTheme', newTheme);
        closeMenus();
    };

    const handleBigTextToggle = () => {
        toggleBigText();
        closeMenus();
    };

    const openSettings = () => {
        alert('Settings panel coming soon! You can change themes from the User menu for now.');
        closeMenus();
    };

    const switchUser = () => {
        if (window.confirm('Switch to a different user account?')) {
            alert('User switching functionality would be implemented here');
        }
        closeMenus();
    };

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to log out? Any unsaved progress may be lost.')) {
            handleLogout();
        }
        closeMenus();
    };

    const getUserDisplayName = () => {
        if (!currentUser) return 'Guest';

        if (currentUser.name && currentUser.name !== 'Guest') {
            return currentUser.name;
        }

        if (currentUser.firstName && currentUser.lastName) {
            return `${currentUser.firstName} ${currentUser.lastName}`;
        }

        if (currentUser.firstName) {
            return currentUser.firstName;
        }

        if (currentUser.email) {
            return currentUser.email.split('@')[0];
        }

        switch (currentUser.type) {
            case 'google':
                return 'Google User';
            case 'apple':
                return 'Apple User';
            case 'email':
                return 'Story Creator';
            default:
                return 'Guest Explorer';
        }
    };

    const getUserGreeting = () => {
        const displayName = getUserDisplayName();
        const isGuest = currentUser.type === 'guest' || displayName === 'Guest Explorer';

        if (isGuest) {
            return `Welcome, ${displayName}!`;
        } else {
            return `Hello, ${displayName}!`;
        }
    };

    const getUserAccountType = () => {
        switch (currentUser.type) {
            case 'email':
                return '📧 Email Account';
            case 'google':
                return '📧 Google Account';
            case 'apple':
                return '🍎 Apple Account';
            case 'guest':
                return '👤 Guest Session';
            default:
                return '👤 User Account';
        }
    };

    return (
        <div className="header-nav" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '15px',
            background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
            borderRadius: '15px',
            border: '3px solid #333'
        }}>
            <div style={{ display: 'flex', gap: '15px' }}>
                <div className="dropdown-container" ref={helpRef}>
                    <button className="header-btn" onClick={handleHelpToggle}>
                        ❓ Help
                    </button>
                    {helpOpen && (
                        <div className="dropdown-menu" style={{ display: 'block' }}>
                            <button
                                className="dropdown-item"
                                onClick={() => { showDemoModal(); closeMenus(); }}
                            >
                                👀 Show Me How It Works
                            </button>
                            <button
                                className="dropdown-item"
                                onClick={handleBigTextToggle}
                            >
                                🔍 {isBigText ? 'Small Text' : 'Big Text'}
                            </button>
                            <div className="contrast-dropdown-section">
                                <label style={{
                                    color: '#333',
                                    fontWeight: 'bold',
                                    padding: '8px 12px',
                                    display: 'block'
                                }}>
                                    🎨 Contrast
                                </label>
                                <div style={{ padding: '8px 12px' }}>
                                    <input
                                        type="range"
                                        min="50"
                                        max="200"
                                        value={contrast}
                                        step="10"
                                        onChange={handleContrastChange}
                                        style={{ width: '100%', marginBottom: '5px' }}
                                    />
                                    <div style={{
                                        textAlign: 'center',
                                        fontSize: '0.8em',
                                        color: '#666'
                                    }}>
                                        {contrast}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Backend Status Indicator */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{
                    fontSize: '0.8em',
                    color: backendConnected ? '#00b894' : '#ff6b6b',
                    fontWeight: 'bold'
                }}>
                    {/* {backendConnected ? '🟢 API' : '🔴 API'} */}
                </div>
            )}

            <div style={{ display: 'flex', gap: '15px' }}>
                <div className="dropdown-container" ref={userRef}>
                    <button className="header-btn" onClick={handleUserToggle}>
                        👤 User
                    </button>
                    {userOpen && (
                        <div className="dropdown-menu" style={{
                            display: 'block',
                            right: 0,
                            left: 'auto',
                            minWidth: '250px'
                        }}>
                            {/* User Info Section */}
                            <div className="dropdown-item user-info" style={{
                                fontWeight: 'bold',
                                color: '#6c5ce7',
                                borderBottom: '2px solid #ddd',
                                cursor: 'default',
                                padding: '12px 15px'
                            }}>
                                <div style={{ fontSize: '1em', marginBottom: '5px' }}>
                                    {getUserGreeting()}
                                </div>
                                <div style={{
                                    fontSize: '0.8em',
                                    color: '#636e72',
                                    fontWeight: 'normal'
                                }}>
                                    {getUserAccountType()}
                                </div>
                                {currentUser.email && (
                                    <div style={{
                                        fontSize: '0.75em',
                                        color: '#636e72',
                                        fontWeight: 'normal',
                                        marginTop: '3px'
                                    }}>
                                        {currentUser.email}
                                    </div>
                                )}
                            </div>

                            <div className="dropdown-section">
                                <label style={{
                                    color: '#333',
                                    fontWeight: 'bold',
                                    padding: '8px 12px',
                                    display: 'block'
                                }}>
                                    🎨 Themes
                                </label>
                                <button
                                    className={`dropdown-item theme-option ${theme === 'default' ? 'active' : ''}`}
                                    onClick={() => changeTheme('default')}
                                >
                                    🌟 Default
                                </button>
                                <button
                                    className={`dropdown-item theme-option ${theme === 'dark' ? 'active' : ''}`}
                                    onClick={() => changeTheme('dark')}
                                >
                                    🌙 Dark Mode
                                </button>
                                <button
                                    className={`dropdown-item theme-option ${theme === 'nature' ? 'active' : ''}`}
                                    onClick={() => changeTheme('nature')}
                                >
                                    🌿 Nature
                                </button>
                            </div>

                            <button className="dropdown-item" onClick={openSettings}>
                                ⚙️ Settings
                            </button>

                            {currentUser.type !== 'guest' && (
                                <button className="dropdown-item" onClick={switchUser}>
                                    🔄 Switch User
                                </button>
                            )}

                            <button className="dropdown-item logout-btn" onClick={handleLogoutClick}>
                                🚪 {currentUser.type === 'guest' ? 'Exit Guest Mode' : 'Log Out'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
