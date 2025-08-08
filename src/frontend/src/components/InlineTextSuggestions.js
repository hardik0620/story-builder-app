// src/components/InlineTextSuggestions.js - Gmail-style inline suggestions
import React, { useState, useEffect, useRef, useCallback } from 'react';
import apiService from '../services/api';

const InlineTextSuggestions = ({
    value,
    onChange,
    onSuggestionAccept,
    placeholder,
    style,
    disabled,
    storyContext,
    storyTheme,
    currentScene
}) => {
    const [suggestion, setSuggestion] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false);
    const textareaRef = useRef(null);
    const suggestionTimeoutRef = useRef(null);
    const lastRequestRef = useRef(null);

    // Debounced suggestion generation
    const generateInlineSuggestion = useCallback(async (text, cursorPosition) => {
        if (!text || text.length < 10 || disabled) {
            setSuggestion('');
            setShowSuggestion(false);
            return;
        }

        // Get the text before cursor position
        const textBeforeCursor = text.substring(0, cursorPosition);
        const words = textBeforeCursor.trim().split(/\s+/);

        // Only suggest after meaningful content (at least 3 words)
        if (words.length < 3) {
            setSuggestion('');
            setShowSuggestion(false);
            return;
        }

        // Get last sentence or phrase
        const sentences = textBeforeCursor.split(/[.!?]+/);
        const currentSentence = sentences[sentences.length - 1].trim();

        // Don't suggest if sentence is already long
        if (currentSentence.length > 100) {
            setSuggestion('');
            setShowSuggestion(false);
            return;
        }

        try {
            // Cancel previous request
            if (lastRequestRef.current) {
                lastRequestRef.current = null;
            }

            const requestId = Date.now();
            lastRequestRef.current = requestId;

            const response = await apiService.generateInlineSuggestion({
                currentText: textBeforeCursor,
                lastPhrase: currentSentence,
                storyContext: storyContext || '',
                storyTheme: storyTheme || 'adventure',
                currentScene: currentScene?.name || ''
            });

            // Check if this is still the latest request
            if (lastRequestRef.current !== requestId) {
                return;
            }

            if (response.success && response.suggestion && response.suggestion.trim()) {
                const cleanSuggestion = response.suggestion.trim();

                // Make sure suggestion doesn't repeat existing text
                if (!textBeforeCursor.toLowerCase().includes(cleanSuggestion.toLowerCase().substring(0, 10))) {
                    setSuggestion(cleanSuggestion);
                    setShowSuggestion(true);
                } else {
                    setSuggestion('');
                    setShowSuggestion(false);
                }
            } else {
                setSuggestion('');
                setShowSuggestion(false);
            }
        } catch (error) {
            console.error('Inline suggestion error:', error);
            setSuggestion('');
            setShowSuggestion(false);
        }
    }, [disabled, storyContext, storyTheme, currentScene]);

    // Handle text changes with debouncing
    const handleTextChange = (e) => {
        const newValue = e.target.value;
        const cursorPosition = e.target.selectionStart;

        onChange(e);

        // Clear existing timeout
        if (suggestionTimeoutRef.current) {
            clearTimeout(suggestionTimeoutRef.current);
        }

        // Hide suggestion immediately when typing
        setShowSuggestion(false);

        // Set new timeout for suggestion generation
        suggestionTimeoutRef.current = setTimeout(() => {
            generateInlineSuggestion(newValue, cursorPosition);
        }, 800); // Wait 800ms after user stops typing
    };

    // Handle key events
    const handleKeyDown = (e) => {
        if (showSuggestion && suggestion) {
            if (e.key === 'Tab' || (e.key === 'ArrowRight' && e.ctrlKey)) {
                e.preventDefault();
                acceptSuggestion();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setSuggestion('');
                setShowSuggestion(false);
            }
        }
    };

    // Accept suggestion
    const acceptSuggestion = () => {
        if (suggestion && textareaRef.current) {
            const textarea = textareaRef.current;
            const currentValue = textarea.value;
            const cursorPosition = textarea.selectionStart;

            // Add suggestion to current text
            const newValue = currentValue.substring(0, cursorPosition) + suggestion + currentValue.substring(cursorPosition);

            // Create synthetic event
            const syntheticEvent = {
                target: {
                    value: newValue,
                    selectionStart: cursorPosition + suggestion.length,
                    selectionEnd: cursorPosition + suggestion.length
                }
            };

            onChange(syntheticEvent);

            if (onSuggestionAccept) {
                onSuggestionAccept(suggestion);
            }

            setSuggestion('');
            setShowSuggestion(false);

            // Focus and set cursor position
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(cursorPosition + suggestion.length, cursorPosition + suggestion.length);
            }, 0);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (suggestionTimeoutRef.current) {
                clearTimeout(suggestionTimeoutRef.current);
            }
        };
    }, []);

    // Calculate suggestion display position
    const getSuggestionStyle = () => {
        if (!textareaRef.current || !showSuggestion) return {};

        const textarea = textareaRef.current;
        const computedStyle = window.getComputedStyle(textarea);

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            fontSize: computedStyle.fontSize,
            fontFamily: computedStyle.fontFamily,
            lineHeight: computedStyle.lineHeight,
            padding: computedStyle.padding,
            border: 'none',
            background: 'transparent',
            color: 'transparent',
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflow: 'hidden',
            zIndex: 1
        };
    };

    return (
        <div style={{ position: 'relative', ...style }}>
            {/* Main textarea */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                style={{
                    width: '100%',
                    height: '100px',
                    padding: '15px',
                    border: '2px solid #6c5ce7',
                    borderRadius: '10px',
                    fontFamily: 'inherit',
                    fontSize: '1em',
                    resize: 'vertical',
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                    ...style
                }}
            />

            {/* Suggestion overlay */}
            {showSuggestion && suggestion && (
                <div style={getSuggestionStyle()}>
                    <span style={{ color: 'transparent' }}>{value}</span>
                    <span
                        style={{
                            color: 'rgba(0, 0, 0, 0.4)',
                            backgroundColor: 'rgba(255, 255, 0, 0.1)',
                            cursor: 'pointer'
                        }}
                        onClick={acceptSuggestion}
                    >
                        {suggestion}
                    </span>
                </div>
            )}

            {/* Suggestion hint */}
            {showSuggestion && suggestion && (
                <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    right: '5px',
                    fontSize: '0.8em',
                    color: '#6c5ce7',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: '1px solid #6c5ce7',
                    zIndex: 3
                }}>
                    Press Tab to accept or click suggestion
                </div>
            )}
        </div>
    );
};

export default InlineTextSuggestions;