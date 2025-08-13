// src/components/AIWizard.js - Complete Fixed Version
import React, { useState, useRef, useEffect } from 'react';
import apiService from '../services/api';

const AIWizard = ({ currentStep, storyData, backendConnected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'wizard',
            text: 'Hello! I\'m your AI Story Wizard powered by Gemini! 🧙‍♂️ I\'m here to help you create amazing stories using Propp\'s narrative functions. Ask me anything about storytelling, writing techniques, or story elements! ✨📚'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: inputValue.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsThinking(true);
        setErrorMessage('');

        try {
            if (backendConnected) {
                // FIXED: Use real API call instead of always falling back
                console.log('🧙‍♂️ Your AI buddy is thinking...', userMessage.text);

                const response = await apiService.chatWithWizard(
                    userMessage.text,
                    currentStep,
                    storyData
                );

                if (response.success && response.response) {
                    const aiResponse = {
                        id: Date.now() + 1,
                        sender: 'wizard',
                        text: response.response,
                        timestamp: new Date().toISOString()
                    };
                    setMessages(prev => [...prev, aiResponse]);
                } else {
                    throw new Error(response.error || 'No response from AI');
                }
            } else {
                // Only use fallback when backend is NOT connected
                await new Promise(resolve => setTimeout(resolve, 1500));
                const fallbackResponse = getContextualFallbackResponse(userMessage.text);

                const aiResponse = {
                    id: Date.now() + 1,
                    sender: 'wizard',
                    text: fallbackResponse + "\n\n(Using offline mode - connect to backend for AI-powered responses)"
                };
                setMessages(prev => [...prev, aiResponse]);
            }
        } catch (error) {
            console.error('AI Wizard Error:', error);

            // Provide helpful fallback even on error
            const fallbackResponse = getContextualFallbackResponse(userMessage.text);
            const aiResponse = {
                id: Date.now() + 1,
                sender: 'wizard',
                text: `${fallbackResponse}\n\n💭 (I had trouble connecting to my AI brain, but I'm still here to help!)`
            };
            setMessages(prev => [...prev, aiResponse]);
        } finally {
            setIsThinking(false);
        }
    };

    // IMPROVED fallback function
    const getContextualFallbackResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        // Context-aware responses based on current step
        if (currentStep === 1 && (lowerMessage.includes('theme') || lowerMessage.includes('title'))) {
            return "For theme selection, pick what excites you most! Fantasy gives you magic and dragons 🐉, Adventure offers exciting quests 🗺️, Mystery lets you solve puzzles 🔍. Your title should hint at the adventure ahead! What kind of world draws you in?";
        }

        if (currentStep === 2 && lowerMessage.includes('propp')) {
            return "Propp's functions are story building blocks! 🧩 Start with 'Initial Situation' (where your hero begins), 'Villainy' (the problem), and 'Victory' (solving it). Pick at least 3 that fit your theme. Which ones sound interesting for your story?";
        }

        if (currentStep === 4 && (lowerMessage.includes('write') || lowerMessage.includes('stuck'))) {
            return `You're in the writing phase! ✍️ For the ${storyData.theme || 'adventure'} theme, start by describing what your hero sees, feels, or discovers. Don't worry about perfection - just let your imagination flow! What happens next in your story?`;
        }

        // General story help
        if (lowerMessage.includes('story') || lowerMessage.includes('write')) {
            return "Every great story needs three things: a hero we care about, a problem to solve, and an adventure to get there! 📚 Focus on what makes your hero special and what challenge they'll face. What's your story about?";
        }

        if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
            return "I'm here to help! 🌟 Try asking about: story themes, Propp's functions, character ideas, or writing techniques. What specific part of storytelling would you like to explore?";
        }

        // Default encouraging response
        return "That's a great question about storytelling! 🎭 I love helping with creative adventures. Whether it's about plot, characters, or writing techniques, I'm here to guide you. What aspect of your story can we work on together?";
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const clearChat = () => {
        if (window.confirm('Clear all chat messages?')) {
            setMessages([{
                id: 1,
                sender: 'wizard',
                text: 'Chat cleared! I\'m ready to help you with your storytelling adventure! What would you like to know about creating amazing stories? 🌟📚'
            }]);
        }
    };

    if (!isOpen) {
        return (
            <div className="ai-story-wizard">
                <div className="wizard-trigger" onClick={handleToggle} title="Chat with AI Story Wizard">
                    🧙‍♂️
                    {backendConnected && (
                        <div style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#00b894',
                            borderRadius: '50%',
                            border: '2px solid white'
                        }} title="Gemini AI Connected" />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="ai-story-wizard">
            <div className="wizard-trigger" onClick={handleToggle}>
                🧙‍♂️
                {backendConnected && (
                    <div style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#00b894',
                        borderRadius: '50%',
                        border: '2px solid white'
                    }} />
                )}
            </div>

            <div className="wizard-chat-popup">
                <div className="wizard-chat-header">
                    <div>
                        <h3 style={{ margin: 0, color: 'white' }}>
                            🧙‍♂️ AI Story Wizard
                        </h3>
                        <small style={{ opacity: 0.8 }}>
                            {backendConnected ? '🟢 Connected' : '🔴 Offline Mode'}
                        </small>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="wizard-action-btn"
                            onClick={clearChat}
                            title="Clear chat"
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                fontSize: '0.8em'
                            }}
                        >
                            🗑️
                        </button>
                        <button className="wizard-close" onClick={handleToggle}>×</button>
                    </div>
                </div>

                <div className="wizard-chat-messages">
                    {messages.map(message => (
                        <div key={message.id} className={message.sender === 'user' ? 'user-message' : 'wizard-message'}>
                            <div className={message.sender === 'user' ? 'user-avatar' : 'wizard-avatar'}>
                                {message.sender === 'user' ? '👤' : '🧙‍♂️'}
                            </div>
                            <div className="message-content">
                                {message.text}
                                {message.timestamp && (
                                    <div style={{
                                        fontSize: '0.7em',
                                        opacity: 0.6,
                                        marginTop: '5px',
                                        fontStyle: 'italic'
                                    }}>
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isThinking && (
                        <div className="wizard-message">
                            <div className="wizard-avatar">🧙‍♂️</div>
                            <div className="message-content" style={{
                                fontStyle: 'italic',
                                background: 'linear-gradient(-45deg, #74b9ff, #0984e3, #74b9ff, #0984e3)',
                                backgroundSize: '400% 400%',
                                animation: 'gradient 2s ease infinite'
                            }}>
                                🤔 Thinking with {backendConnected ? 'Gemini AI' : 'my storytelling knowledge'}...
                            </div>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="wizard-message">
                            <div className="wizard-avatar">⚠️</div>
                            <div className="message-content" style={{
                                background: 'rgba(255, 107, 107, 0.1)',
                                border: '1px solid #ff6b6b',
                                color: '#d63031'
                            }}>
                                {errorMessage}
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="wizard-chat-input">
                    <textarea
                        ref={inputRef}
                        placeholder="Ask me about storytelling, Propp's functions, writing tips, or anything else!"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        rows={2}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: '2px solid #333',
                            borderRadius: '10px',
                            fontFamily: 'inherit',
                            fontSize: '0.9em',
                            outline: 'none',
                            resize: 'none',
                            maxHeight: '100px'
                        }}
                        disabled={isThinking}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isThinking || !inputValue.trim()}
                        style={{
                            padding: '10px 15px',
                            border: '2px solid #333',
                            background: isThinking || !inputValue.trim() ? '#ccc' : 'linear-gradient(45deg, #74b9ff, #0984e3)',
                            color: 'white',
                            borderRadius: '10px',
                            cursor: isThinking || !inputValue.trim() ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {isThinking ? '🤔' : '📤'}
                    </button>
                </div>

                {isThinking && (
                    <div className="wizard-status">
                        <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                            🧠 {backendConnected ? 'Processing with Gemini AI' : 'Thinking with storytelling knowledge'}...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIWizard;