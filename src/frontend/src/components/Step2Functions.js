// src/components/Step2Functions.js
import React, { useState, useRef, useEffect } from 'react';
import { PROPP_FUNCTIONS } from '../proppFunctions'; // Fallback data

// Try to import API service
let apiService = null;
try {
    apiService = require('../services/api').default;
} catch (error) {
    console.warn('API service not available, using fallback data');
}

const Step2Functions = ({ nextStep, previousStep, storyData, setStoryData, backendConnected }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [proppFunctions, setProppFunctions] = useState(PROPP_FUNCTIONS);
    const [loading, setLoading] = useState(true);

    const tooltipRef = useRef(null);
    const selectedIds = new Set(storyData.selectedElements.map(el => el.id));

    // Load Propp functions from backend or use fallback
    useEffect(() => {
        loadProppFunctions();
    }, [backendConnected]);

    const loadProppFunctions = async () => {
        setLoading(true);

        if (backendConnected && apiService) {
            try {
                console.log('🧩 Loading Propp functions from backend...');
                const response = await apiService.getProppFunctions();
                if (response.success && response.functions) {
                    // Add species property for compatibility with existing tooltip code
                    const functionsWithSpecies = response.functions.map(func => ({
                        ...func,
                        species: func.species || [`Example of ${func.name}`, `Another ${func.shortName} case`, `More ${func.name} scenarios`]
                    }));
                    setProppFunctions(functionsWithSpecies);
                    console.log('✅ Propp functions loaded from backend:', functionsWithSpecies.length);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.warn('⚠️ Failed to load Propp functions from backend, using fallback:', error.message);
                setProppFunctions(PROPP_FUNCTIONS);
            }
        } else {
            console.log('📱 Using fallback Propp functions');
            setProppFunctions(PROPP_FUNCTIONS);
        }

        setLoading(false);
    };

    const handleSelectElement = (func) => {
        const newSelectedElements = selectedIds.has(func.id)
            ? storyData.selectedElements.filter(el => el.id !== func.id)
            : [...storyData.selectedElements, func];
        setStoryData(prev => ({ ...prev, selectedElements: newSelectedElements }));
    };

    const removeSelectedElement = (elementId) => {
        const newSelectedElements = storyData.selectedElements.filter(el => el.id !== elementId);
        setStoryData(prev => ({ ...prev, selectedElements: newSelectedElements }));
    };

    const handleQuestionMarkHover = (func, event) => {
        event.stopPropagation();
        event.preventDefault();

        const rect = event.currentTarget.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Position tooltip directly above the question mark with some padding
        setTooltipPosition({
            x: rect.left + scrollLeft + (rect.width / 2),
            y: rect.top + scrollTop - 15 // 15px above the question mark
        });

        setHoveredCard(func);
    };

    const handleQuestionMarkLeave = (event) => {
        event.stopPropagation();
        // Add a small delay to prevent flickering when moving to tooltip
        setTimeout(() => {
            setHoveredCard(null);
        }, 100);
    };

    const handleTooltipMouseEnter = () => {
        // Keep tooltip visible when hovering over it
        if (hoveredCard) {
            setHoveredCard(hoveredCard);
        }
    };

    const handleTooltipMouseLeave = () => {
        setHoveredCard(null);
    };

    const showProppHelp = (func, event) => {
        event.stopPropagation();
        const helpText = `${func.name} (Component ${func.id}): ${func.description}. Examples: ${func.species ? func.species.join(', ') : 'Classic story element'}`;
        alert(helpText);
    };

    const isNextDisabled = storyData.selectedElements.length < 3;

    const closePopup = () => {
        setShowPopup(false);
    };

    // Render tooltip with improved positioning
    const renderTooltip = () => {
        if (!hoveredCard) return null;

        const tooltipStyle = {
            position: 'absolute',
            left: tooltipPosition.x - 325, // Center the tooltip (300px width / 2)
            top: tooltipPosition.y - 460, // Position above the question mark
            width: '300px',
            background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '15px',
            border: '3px solid #333',
            boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
            zIndex: 10000,
            fontSize: '0.9em',
            fontWeight: 'bold',
            pointerEvents: 'auto', // Allow interaction with tooltip
            animation: 'bounceIn 0.3s ease',
            transform: 'translateZ(0)', // Force hardware acceleration
        };

        return (
            <div
                ref={tooltipRef}
                style={tooltipStyle}
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
            >
                <div style={{ marginBottom: '8px', fontSize: '1em', color: '#fff3cd' }}>
                    {hoveredCard.emoji} <strong>{hoveredCard.name}</strong>
                </div>
                <div style={{ marginBottom: '8px', fontSize: '0.85em', fontWeight: 'normal' }}>
                    {hoveredCard.description}
                </div>
                <div style={{ fontSize: '0.8em', fontWeight: 'normal', fontStyle: 'italic' }}>
                    <strong>Examples:</strong> {hoveredCard.species ? hoveredCard.species.slice(0, 2).join(', ') : 'Story examples'}
                    {hoveredCard.species && hoveredCard.species.length > 2 ? '...' : ''}
                </div>

                {/* Tooltip arrow pointing to question mark */}
                <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '12px solid transparent',
                    borderRight: '12px solid transparent',
                    borderTop: '12px solid #6c5ce7'
                }} />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="step-container active">
                <div className="step-header">
                    <h1 className="step-title">🧩 Loading Story Elements...</h1>
                    <p>Getting your building blocks ready...</p>
                    {backendConnected && (
                        <div style={{ fontSize: '12px', color: '#28a745', marginTop: '5px' }}>
                            ✅ Loading from backend...
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="step-container active" style={{ position: 'relative' }}>
            {/* Tooltip */}
            {renderTooltip()}

            {/* Step 2 Instructions Popup */}
            {showPopup && (
                <div className="popup-overlay" style={{ display: 'block' }}>
                    <div className="popup-content" style={{ maxWidth: '600px' }}>
                        <button className="popup-close" onClick={closePopup}>×</button>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ fontSize: '3em', marginBottom: '15px' }}>🧩✨</div>
                            <h3 style={{ color: '#2d3436', marginBottom: '15px' }}>
                                Time to Choose Your Building Blocks!
                            </h3>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '15px',
                            margin: '20px 0',
                            border: '3px solid #333'
                        }}>
                            <p style={{ margin: '0 0 15px 0', fontSize: '1.1em', lineHeight: '1.5' }}>
                                Now it's your time to choose your building blocks! Please note that every story should consist of:
                            </p>
                            <div style={{
                                margin: '15px 0',
                                padding: '10px',
                                background: 'rgba(255,255,255,0.2)',
                                borderRadius: '10px'
                            }}>
                                <ul style={{ margin: '0', paddingLeft: '20px', textAlign: 'left' }}>
                                    <li><strong>🏠 Introduction (Initial Stage):</strong> Where your hero begins their journey</li>
                                    <li><strong>📖 Body:</strong> The adventure, challenges, and main events</li>
                                    <li><strong>🏆 Conclusion:</strong> How everything gets resolved</li>
                                </ul>
                            </div>
                            <p style={{ margin: '15px 0 0 0', fontStyle: 'italic' }}>
                                Keep these elements in mind to build an awesome story that flows naturally from beginning to end!
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '25px' }}>
                            <button
                                className="button primary large"
                                onClick={closePopup}
                                style={{ width: '80%', padding: '15px', fontSize: '1.1em' }}
                            >
                                ✅ Ok, I Understood!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="step-header">
                <h1 className="step-title">🧩 Story Building Blocks</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '33%' }}></div>
                </div>
                <p style={{ color: '#6c5ce7', fontWeight: 'bold' }}>✨ Step 2 of 6 - Choose Your Story Building Blocks✨</p>
                {/* {backendConnected && (
                    <div style={{ fontSize: '12px', color: '#28a745', marginTop: '5px' }}>
                        ✅ Connected to backend - {proppFunctions.length} functions available!
                    </div>
                )} */}
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #fd79a8, #e84393)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                margin: '20px 0',
                border: '3px solid #333'
            }}>
                <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>
                    🎭 What are Propp's 31 Components?
                </h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    Vladimir Propp studied hundreds of fairy tales and found that they all use similar building blocks -
                    like pieces of a story puzzle! These 31 components are the magic ingredients that make stories exciting and memorable.
                </p>
                <details style={{ marginTop: '15px' }}>
                    <summary style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '10px'
                    }}>
                        🔍 Click to learn more about these story components!
                    </summary>
                    <div style={{
                        padding: '15px',
                        marginTop: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '10px'
                    }}>
                        <p><strong>Think of them like this:</strong></p>
                        <ul style={{ margin: '10px 0' }}>
                            <li>🏠 <strong>Initial Situation:</strong> Where your hero starts their journey</li>
                            <li>⚔️ <strong>Villainy:</strong> The problem or bad guy that appears</li>
                            <li>🗺️ <strong>Departure:</strong> When your hero leaves home to solve the problem</li>
                            <li>🎁 <strong>Receipt:</strong> Getting special help or magical items</li>
                            <li>🏆 <strong>Victory:</strong> Defeating the bad guy or solving the problem</li>
                            <li>👑 <strong>Reward:</strong> The happy ending where the hero gets something special</li>
                        </ul>
                        <p style={{ marginTop: '15px' }}>
                            <em>You don't need to use all 31 - just pick the ones that fit your story idea!
                                Each component will help make your story more engaging and complete.</em>
                        </p>
                    </div>
                </details>
            </div>

            <p style={{ fontWeight: 'bold', color: '#2d3436', textAlign: 'center', fontSize: '1.1em' }}>
                🎪 Choose from Propp's 31 Building Blocks (pick at least 3)
            </p>

            {/* Hover instruction */}
            <div style={{
                background: 'rgba(108, 92, 231, 0.1)',
                border: '2px solid #6c5ce7',
                borderRadius: '10px',
                padding: '10px',
                margin: '10px 0',
                textAlign: 'center',
                fontSize: '0.9em',
                color: '#6c5ce7',
                fontWeight: 'bold'
            }}>
                💡 Hover over the ? button on any card to see detailed information!
            </div>

            <div className="propp-elements">
                {proppFunctions.map(func => (
                    <div
                        key={func.id}
                        className={`propp-card ${selectedIds.has(func.id) ? 'selected' : ''}`}
                        onClick={() => handleSelectElement(func)}
                        style={{ position: 'relative' }}
                    >
                        <div className="function-id">{func.id}</div>
                        <button
                            className="help-btn"
                            onClick={(e) => showProppHelp(func, e)}
                            onMouseEnter={(e) => handleQuestionMarkHover(func, e)}
                            onMouseLeave={handleQuestionMarkLeave}
                            title={`Hover for details about ${func.name}`}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: '#333',
                                color: 'white',
                                border: 'none',
                                fontSize: '0.8em',
                                cursor: 'pointer',
                                zIndex: 1
                            }}
                        >
                            ?
                        </button>
                        <span className="emoji">{func.emoji}</span>
                        <div>{func.shortName}</div>
                    </div>
                ))}
            </div>

            <div className="sequence-panel">
                <strong>🎬 Your Story Recipe:</strong><br /><br />
                <div id="selected-elements">
                    {storyData.selectedElements.length > 0 ? (
                        storyData.selectedElements.map(el => (
                            <div
                                key={el.id}
                                className="sequence-item"
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    margin: '8px',
                                    padding: '10px 25px 10px 15px'
                                }}
                            >
                                <span>{el.emoji} {el.shortName} ({el.id})</span>
                                <button
                                    onClick={() => removeSelectedElement(el.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: '#ff6b6b',
                                        color: 'white',
                                        border: '2px solid #333',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title={`Remove ${el.shortName}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ margin: 0, fontStyle: 'italic' }}>
                            Click on the building blocks above to add them here!
                        </p>
                    )}
                </div>
            </div>

            <div className="navigation">
                <button className="nav-btn" onClick={previousStep}>← Back</button>
                <button
                    className="nav-btn primary"
                    onClick={nextStep}
                    disabled={isNextDisabled}
                    style={{ opacity: isNextDisabled ? '0.5' : '1' }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Step2Functions;