// src/components/Step1Theme.js (Debug Version)
import React, { useEffect } from 'react';
import apiService from '../services/api';

const Step1Theme = ({ nextStep, previousStep, storyData, setStoryData }) => {
    console.log('🎭 Step1Theme rendering with props:', {
        nextStep: typeof nextStep,
        previousStep: typeof previousStep,
        storyData: storyData,
        setStoryData: typeof setStoryData
    });

    // Debug effect to track when component mounts
    useEffect(() => {
        console.log('🎭 Step1Theme mounted successfully');
        console.log('📊 Current story data:', storyData);

        // Check if required functions are available
        if (typeof nextStep !== 'function') {
            console.error('❌ nextStep is not a function in Step1Theme');
        }
        if (typeof setStoryData !== 'function') {
            console.error('❌ setStoryData is not a function in Step1Theme');
        }
    }, []);

    const isNextDisabled = !storyData.title.trim();
    console.log('🔒 Next button disabled?', isNextDisabled, 'Title:', storyData.title);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log('📝 Input changed:', id, '=', value);

        if (typeof setStoryData === 'function') {
            setStoryData(prevData => {
                const newData = { ...prevData, [id]: value };
                console.log('💾 Story data updated:', newData);
                return newData;
            });
        } else {
            console.error('❌ setStoryData function not available');
        }
    };

    const generateRandomTitle = async () => {
        console.log('🎲 Generate random title clicked for theme:', storyData.theme);

        if (!storyData.theme) {
            alert("Please select a theme first, then I'll suggest a perfect title!");
            return;
        }

        try {
            const data = await apiService.generateTitles(storyData.theme);
            const randomTitle = data.title || '';
            console.log('✨ Gemini generated title:', randomTitle);

            if (typeof setStoryData === 'function') {
                setStoryData(prevData => ({ ...prevData, title: randomTitle }));
            } else {
                console.error('❌ setStoryData function not available for title generation');
            }
        } catch (error) {
            console.error('❌ Error generating title:', error);
            alert('Could not generate a title. Please try again.');
        }
    };

    const handleNextStep = () => {
        console.log('➡️ Next button clicked in Step1Theme');
        console.log('📊 Story data before next:', storyData);

        if (typeof nextStep === 'function') {
            nextStep();
        } else {
            console.error('❌ nextStep function not available');
            alert('Navigation function not available. Please check console for errors.');
        }
    };

    const handlePreviousStep = () => {
        console.log('⬅️ Previous button clicked in Step1Theme');

        if (typeof previousStep === 'function') {
            previousStep();
        } else {
            console.error('❌ previousStep function not available');
            alert('Navigation function not available. Please check console for errors.');
        }
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">🎯 Your Story's Heart</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '16%' }}></div>
                </div>
                <p style={{ color: '#6c5ce7', fontWeight: 'bold' }}>✨ Step 1 of 6 ✨</p>
            </div>

            <div className="input-group">
                <label className="label">🎭 Pick your story's world</label>
                <select
                    className="dropdown"
                    id="theme"
                    value={storyData.theme}
                    onChange={handleInputChange}
                >
                    <option value="">Choose your adventure...</option>
                    <option value="fantasy">🏰 Fantasy Kingdom</option>
                    <option value="adventure">🗺️ Epic Adventure</option>
                    <option value="mystery">🔍 Mystery Solver</option>
                    <option value="animals">🐾 Animal Friends</option>
                    <option value="friendship">👫 Friendship Magic</option>
                    <option value="space">🚀 Space Explorer</option>
                    <option value="underwater">🌊 Ocean Adventure</option>
                    <option value="superhero">🦸‍♀️ Superhero Stories</option>
                    <option value="pirate">🏴‍☠️ Pirate Adventures</option>
                    <option value="fairytale">🧚‍♀️ Fairy Tale Magic</option>
                    <option value="robot">🤖 Robot Friends</option>
                    <option value="dinosaur">🦕 Dinosaur World</option>
                    <option value="magic_school">🎓 Magic School</option>
                    <option value="time_travel">⏰ Time Travel</option>
                    <option value="jungle">🌴 Jungle Adventure</option>
                    <option value="winter">❄️ Winter Wonderland</option>
                    <option value="sports">⚽ Sports Heroes</option>
                    <option value="music">🎵 Musical Journey</option>
                </select>
            </div>

            <div className="input-group">
                <label className="label tooltip">
                    🏷️ Give your story a magical title
                    <span className="tooltip-text">
                        A magical title captures the essence of your story and makes readers excited to read it!
                        Think of something that hints at adventure, mystery, or wonder.
                    </span>
                </label>
                <input
                    type="text"
                    className="text-input"
                    id="title"
                    style={{ fontStyle: 'italic' }}
                    placeholder="E.g...The Adventures of Captain Sparkle"
                    value={storyData.title}
                    onChange={handleInputChange}
                />
            </div>

            <button
                className="button secondary"
                onClick={generateRandomTitle}
                style={{ margin: '20px auto', display: 'block' }}
            >
                🎲 Give Me a Magical Title!
            </button>

            {/* Debug info panel for development */}
            {/* {process.env.NODE_ENV === 'development' && (
                <div style={{
                    background: 'rgba(255,255,0,0.1)',
                    border: '2px solid orange',
                    padding: '10px',
                    margin: '20px 0',
                    borderRadius: '8px',
                    fontSize: '12px'
                }}>
                    <strong>Debug Info:</strong><br />
                    Theme: {storyData.theme || 'Not selected'}<br />
                    Title: {storyData.title || 'Empty'}<br />
                    Next Disabled: {isNextDisabled.toString()}<br />
                    Functions Available: nextStep={typeof nextStep}, setStoryData={typeof setStoryData}
                </div>
            )} */}

            <div className="navigation">
                <button className="nav-btn" onClick={handlePreviousStep}>← Back</button>
                <button
                    className="nav-btn primary"
                    onClick={handleNextStep}
                    disabled={isNextDisabled}
                    style={{ opacity: isNextDisabled ? '0.5' : '1' }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Step1Theme;