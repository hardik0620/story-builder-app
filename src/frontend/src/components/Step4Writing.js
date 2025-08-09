// src/components/Step4Writing.js - Enhanced with Full Text Formatting
import React, { useState, useRef, useEffect, useCallback } from 'react';
import apiService from '../services/api';

const Step4Writing = ({ nextStep, previousStep, storyData, setStoryData, backendConnected }) => {
    const [userInput, setUserInput] = useState('');
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [deletedParts, setDeletedParts] = useState([]);
    const [editingPartId, setEditingPartId] = useState(null);
    const [editText, setEditText] = useState('');
    const [currentFontSize, setCurrentFontSize] = useState(16);
    const [textFormatting, setTextFormatting] = useState({
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'left',
        color: '#333333',
        fontFamily: 'inherit'
    });
    const [sceneContents, setSceneContents] = useState({});
    const [recoverTimer, setRecoverTimer] = useState(null);
    const [recoverCountdown, setRecoverCountdown] = useState(0);
    const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);

    const storyContentRef = useRef(null);
    const userInputRef = useRef(null);

    // Initialize storyParts if not exists
    useEffect(() => {
        if (!storyData.storyParts) {
            setStoryData(prev => ({ ...prev, storyParts: [] }));
        }
    }, [storyData.storyParts, setStoryData]);

    // Initialize scene contents on mount
    useEffect(() => {
        if (storyData.elementOrder && storyData.elementOrder.length > 0) {
            const initialSceneContents = {};
            storyData.elementOrder.forEach((_, index) => {
                initialSceneContents[index] = [];
            });
            setSceneContents(initialSceneContents);
        }
    }, [storyData.elementOrder]);

    // Cleanup timers on component unmount
    useEffect(() => {
        return () => {
            if (recoverTimer) clearTimeout(recoverTimer);
        };
    }, [recoverTimer]);

    const currentScene = storyData.elementOrder[currentSceneIndex];

    const addStoryPart = (type, text, formatting = null) => {
        const newPart = {
            id: Date.now() + Math.random(),
            text: text,
            type: type,
            sceneIndex: currentSceneIndex,
            formatting: formatting || textFormatting,
            timestamp: new Date().toISOString()
        };

        setStoryData(prev => ({
            ...prev,
            storyParts: [...(prev.storyParts || []), newPart]
        }));

        setSceneContents(prev => ({
            ...prev,
            [currentSceneIndex]: [...(prev[currentSceneIndex] || []), newPart]
        }));

        setTimeout(() => {
            if (storyContentRef.current) {
                storyContentRef.current.scrollTo({
                    top: storyContentRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    const handleAddUserText = () => {
        if (userInput.trim()) {
            addStoryPart('user', userInput.trim(), textFormatting);
            setUserInput('');
            resetTextFormatting();
        }
    };

    // FIXED: Generate single AI suggestion
    const generateAISuggestion = async () => {
        if (!currentScene) return;

        setIsGeneratingSuggestion(true);

        try {
            if (backendConnected) {
                // Use Gemini for suggestions via backend
                // Get all previous scenes' content
                const previousScenesParts = (storyData.storyParts || [])
                    .filter(part => part.sceneIndex < currentSceneIndex)
                    .map(part => part.text)
                    .join('\n');

                // Get current scene parts
                const currentSceneParts = (storyData.storyParts || [])
                    .filter(part => part.sceneIndex === currentSceneIndex);

                const currentSceneText = currentSceneParts.length > 0
                    ? currentSceneParts.map(part => part.text).join(' ')
                    : `Starting the ${currentScene.name} part of the story`;

                // Combine previous scenes with current scene for full context
                const storyContext = previousScenesParts
                    ? `${previousScenesParts}\n\nCurrent scene: ${currentSceneText}`
                    : currentSceneText;

                console.log('🤖 Requesting Gemini suggestion for scene:', currentScene.name);

                // Pass model: 'gemini' to backend (your backend should route to Gemini if .env is set)
                const response = await apiService.generateSuggestions(
                    {
                        id: currentScene.id,
                        name: currentScene.name,
                        description: currentScene.description,
                        model: 'gemini' // Explicitly request Gemini
                    },
                    currentSceneText,
                    storyData.theme,
                    userInput,
                    previousScenesParts // Pass the full previous scenes content
                );

                if (response.success && response.suggestions && response.suggestions.length > 0) {
                    const newSuggestion = {
                        id: Date.now(),
                        text: response.suggestions[0],
                        sceneId: currentScene.id
                    };
                    setSuggestions(prev => [newSuggestion, ...prev]);
                    console.log('✅ Got Gemini suggestion:', newSuggestion);
                }
            } else {
                // Fallback single suggestion
                setTimeout(() => {
                    const sceneBasedSuggestion = getSingleSceneBasedSuggestion(currentScene, storyData.theme);
                    const newSuggestion = {
                        id: Date.now(),
                        text: sceneBasedSuggestion,
                        sceneId: currentScene.id
                    };
                    setSuggestions(prev => [...prev, newSuggestion]);
                }, 1000);
            }
        } catch (error) {
            console.error('Gemini Suggestion Error:', error);
            const errorSuggestion = {
                id: Date.now(),
                text: `In this ${currentScene.name} scene, your hero could discover something that helps them on their ${storyData.theme || 'adventure'} journey.`,
                sceneId: currentScene.id
            };
            setSuggestions(prev => [...prev, errorSuggestion]);
        } finally {
            setIsGeneratingSuggestion(false);
        }
    };

    // Helper for single scene-based suggestion
    const getSingleSceneBasedSuggestion = (scene, theme) => {
        const sceneId = scene.id;
        const sceneName = scene.name;
        const themeWord = theme || 'adventure';
        const suggestionMap = {
            0: `Introduce your hero in their ordinary world before the ${themeWord} begins.`,
            1: `Describe a warning or prohibition that your hero receives at the start of the ${themeWord}.`,
            2: `Show how the warning or prohibition is ignored or broken, leading to trouble.`,
            3: `A villain or problem appears, threatening the hero's world.`,
            4: `The villain tries to gather information about the hero or their world.`,
            5: `The villain attempts to deceive someone, perhaps with a disguise or trick.`,
            6: `The victim is tricked and unknowingly helps the villain.`,
            7: `The villain causes harm or takes something valuable from the hero or their world.`,
            8: `A family member or friend notices the loss and asks the hero to help.`,
            9: `The hero agrees to take on the quest and sets out to fix the problem.`,
            10: `The hero prepares for the journey, gathering supplies or advice.`,
            11: `The hero leaves their familiar world to begin the ${themeWord} adventure.`,
            12: `The hero is tested or challenged by someone they meet on their journey.`,
            13: `The hero responds to the test, showing their qualities or skills.`,
            14: `A magical helper or wise advisor appears to assist the hero.`,
            15: `The hero receives a magical item, advice, or special power for their quest.`,
            16: `The villain is discovered, and the hero learns more about the challenge ahead.`,
            17: `The hero and villain directly confront each other in a major challenge.`,
            18: `The hero overcomes the main challenge through courage, cleverness, or help.`,
            19: `The villain is defeated, and the hero wins a reward or solves the problem.`,
            20: `The hero starts the journey home, but new obstacles may appear.`,
            21: `The hero is chased or faces a final test on the way home.`,
            22: `The hero escapes danger, sometimes with magical help.`,
            23: `The hero returns home, but is not immediately recognized or is disguised.`,
            24: `A false hero or rival tries to claim the reward or credit.`,
            25: `A difficult task is set to determine the true hero.`,
            26: `The hero succeeds in the final test and is recognized as the true hero.`,
            27: `The villain is punished for their actions.`,
            28: `The hero is transformed, healed, or receives a new status.`,
            29: `The hero is married, crowned, or otherwise rewarded for their bravery.`,
            30: `The story ends with the hero's world restored and peace returned.`,
            31: `Reflect on how the hero's journey changed them and their world.`
        };
        return suggestionMap[sceneId] || `In the ${sceneName} part of your ${themeWord} story, your hero could show their best qualities.`;
    };

    const acceptSuggestion = (suggestion) => {
        addStoryPart('ai', suggestion.text);
        setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    };

    const editSuggestion = (suggestion) => {
        setUserInput(suggestion.text);
        setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
        userInputRef.current?.focus();
    };

    const rejectSuggestion = (suggestion) => {
        setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    };

    // ENHANCED TEXT FORMATTING FUNCTIONS
    const toggleBold = () => {
        setTextFormatting(prev => ({
            ...prev,
            fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold'
        }));
    };

    const toggleItalic = () => {
        setTextFormatting(prev => ({
            ...prev,
            fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
        }));
    };

    const toggleUnderline = () => {
        setTextFormatting(prev => ({
            ...prev,
            textDecoration: prev.textDecoration === 'underline' ? 'none' : 'underline'
        }));
    };

    const increaseFontSize = () => {
        setCurrentFontSize(prev => Math.min(prev + 2, 32));
    };

    const decreaseFontSize = () => {
        setCurrentFontSize(prev => Math.max(10, prev - 2));
    };

    const setTextAlign = (alignment) => {
        setTextFormatting(prev => ({ ...prev, textAlign: alignment }));
    };

    const changeTextColor = (color) => {
        setTextFormatting(prev => ({ ...prev, color: color }));
    };

    const changeFontFamily = (font) => {
        setTextFormatting(prev => ({ ...prev, fontFamily: font }));
    };

    const resetTextFormatting = () => {
        setTextFormatting({
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            color: '#333333',
            fontFamily: 'inherit'
        });
        setCurrentFontSize(16);
    };

    // Keep existing functions for delete, edit, recover, navigation, etc.
    const deleteStoryPart = (partId) => {
        const partToDelete = storyData.storyParts.find(p => p.id === partId);
        if (partToDelete && window.confirm("Are you sure you want to delete this part? You can recover it later.")) {
            setDeletedParts(prev => [...prev, {
                ...partToDelete,
                deletedAt: new Date().toLocaleTimeString()
            }]);

            setStoryData(prev => ({
                ...prev,
                storyParts: prev.storyParts.filter(p => p.id !== partId)
            }));

            setSceneContents(prev => ({
                ...prev,
                [partToDelete.sceneIndex]: (prev[partToDelete.sceneIndex] || []).filter(p => p.id !== partId)
            }));

            if (recoverTimer) clearTimeout(recoverTimer);
            setRecoverCountdown(10);

            const countdownInterval = setInterval(() => {
                setRecoverCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            const timer = setTimeout(() => {
                setDeletedParts([]);
                setRecoverTimer(null);
                setRecoverCountdown(0);
                clearInterval(countdownInterval);
            }, 10000);

            setRecoverTimer(timer);
        }
    };

    const editStoryPart = (partId) => {
        const part = storyData.storyParts.find(p => p.id === partId);
        if (part) {
            setEditingPartId(partId);
            setEditText(part.text);
        }
    };

    const saveEdit = (partId) => {
        if (editText.trim()) {
            setStoryData(prev => ({
                ...prev,
                storyParts: prev.storyParts.map(p =>
                    p.id === partId ? { ...p, text: editText.trim() } : p
                )
            }));

            const part = storyData.storyParts.find(p => p.id === partId);
            if (part) {
                setSceneContents(prev => ({
                    ...prev,
                    [part.sceneIndex]: (prev[part.sceneIndex] || []).map(p =>
                        p.id === partId ? { ...p, text: editText.trim() } : p
                    )
                }));
            }
        }
        setEditingPartId(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingPartId(null);
        setEditText('');
    };

    const recoverDeletedPart = (partId) => {
        const partToRecover = deletedParts.find(p => p.id === partId);
        if (partToRecover) {
            const { deletedAt, ...cleanPart } = partToRecover;
            setStoryData(prev => ({
                ...prev,
                storyParts: [...(prev.storyParts || []), cleanPart]
            }));

            setSceneContents(prev => ({
                ...prev,
                [cleanPart.sceneIndex]: [...(prev[cleanPart.sceneIndex] || []), cleanPart]
            }));

            setDeletedParts(prev => prev.filter(p => p.id !== partId));

            if (deletedParts.length === 1 && recoverTimer) {
                clearTimeout(recoverTimer);
                setRecoverTimer(null);
            }
        }
    };

    const nextScene = () => {
        if (currentSceneIndex < storyData.elementOrder.length - 1) {
            setCurrentSceneIndex(prev => prev + 1);
        }
    };

    const previousScene = () => {
        if (currentSceneIndex > 0) {
            setCurrentSceneIndex(prev => prev - 1);
        }
    };

    const askAIForHelp = () => {
        setShowSuggestions(true);
        generateAISuggestion();
    };

    const readTextAloud = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        } else {
            alert("Text-to-speech is not supported in your browser!");
        }
    };

    const userInputStyle = {
        ...textFormatting,
        fontSize: `${currentFontSize}px`
    };

    const wordCount = (storyData.storyParts || []).reduce((acc, part) => acc + part.text.split(' ').length, 0);
    const userWordCount = (storyData.storyParts || []).filter(p => p.type === 'user').reduce((acc, part) => acc + part.text.split(' ').length, 0);
    const aiWordCount = wordCount - userWordCount;

    // Get current scene parts
    const currentSceneParts = (storyData.storyParts || []).filter(part =>
        part.sceneIndex === currentSceneIndex
    );

    // Render previous scenes
    const renderPreviousScenes = () => {
        const previousScenes = [];
        for (let i = 0; i < currentSceneIndex; i++) {
            const scene = storyData.elementOrder[i];
            const sceneParts = (storyData.storyParts || []).filter(part => part.sceneIndex === i);

            if (sceneParts.length > 0) {
                previousScenes.push(
                    <div key={i} className="scene-container">
                        <div className="scene-header">
                            📚 Scene {i + 1}: {scene.emoji} {scene.name}
                        </div>
                        <div>
                            {sceneParts.map((part) => (
                                <div key={part.id} className={part.type === 'user' ? 'user-text' : 'ai-text'} style={{ margin: '10px 0' }}>
                                    <div className="text-content">
                                        <strong>{part.type === 'user' ? 'You wrote:' : 'AI suggested:'}</strong>
                                        <div style={part.formatting || {}}>{part.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
        }
        return previousScenes;
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">✍️ Writing Together!</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '66%' }}></div>
                </div>
                <p style={{ color: '#6c5ce7', fontWeight: 'bold' }}>✨ Step 4 of 6 ✨</p>
            </div>

            {/* Story Title Display */}
            <div style={{
                background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
                color: '#2d3436',
                padding: '20px',
                borderRadius: '20px',
                border: '3px solid #333',
                margin: '20px 0',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>📖</div>
                <h2 style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.8em',
                    fontWeight: 'bold',
                    color: '#2d3436'
                }}>
                    "{storyData.title || 'Untitled Story'}"
                </h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    fontSize: '1em'
                }}>
                    <span>🎭 <strong>Theme:</strong> {storyData.theme ? storyData.theme.charAt(0).toUpperCase() + storyData.theme.slice(1) : 'Not selected'}</span>
                    <span>🧩 <strong>Elements:</strong> {storyData.selectedElements?.length || 0} Propp functions</span>
                    <span>📝 <strong>Words:</strong> {wordCount} written</span>
                    {backendConnected && <span style={{ color: '#00b894' }}>🤖 <strong>AI:</strong> Connected</span>}
                </div>
            </div>

            {/* Previous Scenes Display */}
            <div id="previous-scenes">
                {renderPreviousScenes()}
            </div>

            {/* Current Scene Display */}
            {currentScene && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(162, 155, 254, 0.1))',
                    border: '2px solid #6c5ce7',
                    borderRadius: '15px',
                    padding: '15px',
                    margin: '15px 0'
                }}>
                    <h3 style={{ color: '#6c5ce7', margin: '0 0 10px 0' }}>
                        🎭 Current Scene: {currentScene.emoji} {currentScene.name}
                    </h3>
                    <p style={{ margin: '0', fontStyle: 'italic', color: '#636e72' }}>
                        {currentScene.description}
                    </p>
                </div>
            )}

            {/* Deleted Parts Recovery Panel */}
            {deletedParts.length > 0 && (
                <div className="recover-panel show">
                    <div className="recover-header">
                        🔄 Recover Deleted Text
                        {recoverCountdown > 0 && (
                            <span style={{
                                float: 'right',
                                fontSize: '0.9em',
                                background: 'rgba(255,255,255,0.3)',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                animation: recoverCountdown <= 3 ? 'pulse 0.5s infinite' : 'none'
                            }}>
                                ⏰ {recoverCountdown}s
                            </span>
                        )}
                    </div>
                    {deletedParts.map(item => (
                        <div key={item.id} className="deleted-item">
                            <div className="deleted-text">
                                <strong>{item.type === 'user' ? 'Your text' : 'AI suggestion'}:</strong>
                                "{item.text.length > 50 ? item.text.substring(0, 50) + '...' : item.text}"
                                <br />
                                <small>Deleted at: {item.deletedAt}</small>
                            </div>
                            <button
                                className="recover-btn"
                                onClick={() => recoverDeletedPart(item.id)}
                            >
                                🔄 Recover
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Writing Interface */}
            <div className={`writing-workspace ${showSuggestions ? '' : 'suggestions-hidden'}`}>
                <div className="story-editor">
                    {/* ENHANCED TOOLBAR with all formatting options */}
                    <div className="editor-toolbar">
                        {/* Text Formatting */}
                        <button
                            className="toolbar-btn"
                            onClick={toggleBold}
                            style={{ background: textFormatting.fontWeight === 'bold' ? '#ffeaa7' : 'white' }}
                            title="Bold"
                        >
                            <strong>B</strong>
                        </button>
                        <button
                            className="toolbar-btn"
                            onClick={toggleItalic}
                            style={{ background: textFormatting.fontStyle === 'italic' ? '#ffeaa7' : 'white' }}
                            title="Italic"
                        >
                            <em>I</em>
                        </button>
                        <button
                            className="toolbar-btn"
                            onClick={toggleUnderline}
                            style={{ background: textFormatting.textDecoration === 'underline' ? '#ffeaa7' : 'white' }}
                            title="Underline"
                        >
                            <u>U</u>
                        </button>

                        {/* Font Size */}
                        <button className="toolbar-btn" onClick={decreaseFontSize} title="Decrease Font Size">
                            🔍-
                        </button>
                        <span style={{ padding: '6px 8px', background: 'white', borderRadius: '4px', fontSize: '0.8em', fontWeight: 'bold' }}>
                            {currentFontSize}px
                        </span>
                        <button className="toolbar-btn" onClick={increaseFontSize} title="Increase Font Size">
                            🔍+
                        </button>

                        {/* Text Alignment */}
                        <button
                            className="toolbar-btn"
                            onClick={() => setTextAlign('left')}
                            style={{ background: textFormatting.textAlign === 'left' ? '#ffeaa7' : 'white' }}
                            title="Align Left"
                        >
                            ⬅️
                        </button>
                        <button
                            className="toolbar-btn"
                            onClick={() => setTextAlign('center')}
                            style={{ background: textFormatting.textAlign === 'center' ? '#ffeaa7' : 'white' }}
                            title="Align Center"
                        >
                            ↔️
                        </button>
                        <button
                            className="toolbar-btn"
                            onClick={() => setTextAlign('right')}
                            style={{ background: textFormatting.textAlign === 'right' ? '#ffeaa7' : 'white' }}
                            title="Align Right"
                        >
                            ➡️
                        </button>
                        {/* <button
                            className="toolbar-btn"
                            onClick={() => setTextAlign('justify')}
                            style={{ background: textFormatting.textAlign === 'justify' ? '#ffeaa7' : 'white' }}
                            title="Justify"
                        >
                            ⬌
                        </button> */}

                        {/* Text Color */}
                        <input
                            type="color"
                            className="toolbar-color"
                            value={textFormatting.color}
                            onChange={(e) => changeTextColor(e.target.value)}
                            title="Text Color"
                        />

                        {/* Font Family */}
                        <select
                            className="toolbar-select"
                            value={textFormatting.fontFamily}
                            onChange={(e) => changeFontFamily(e.target.value)}
                            title="Font Family"
                        >
                            <option value="inherit">Default</option>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Times New Roman', serif">Times New Roman</option>
                            <option value="'Courier New', monospace">Courier New</option>
                            <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                            <option value="Verdana, sans-serif">Verdana</option>
                            <option value="Helvetica, sans-serif">Helvetica</option>
                        </select>

                        {/* Reset Formatting */}
                        <button
                            className="toolbar-btn"
                            onClick={resetTextFormatting}
                            title="Reset Formatting"
                            style={{ marginLeft: '10px', background: '#ff6b6b', color: 'white' }}
                        >
                            🔄
                        </button>
                    </div>

                    {/* Story Content */}
                    <div className="story-content" ref={storyContentRef}>
                        {currentSceneParts.map((part) => {
                            if (editingPartId === part.id) {
                                return (
                                    <div key={part.id} className="edit-mode" style={{ margin: '15px 0' }}>
                                        <textarea
                                            className="edit-textarea"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.ctrlKey) {
                                                    saveEdit(part.id);
                                                } else if (e.key === 'Escape') {
                                                    cancelEdit();
                                                }
                                            }}
                                        />
                                        <div className="edit-controls">
                                            <button
                                                className="control-btn save-btn"
                                                onClick={() => saveEdit(part.id)}
                                            >
                                                💾 Save
                                            </button>
                                            <button
                                                className="control-btn cancel-btn"
                                                onClick={cancelEdit}
                                            >
                                                ❌ Cancel
                                            </button>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div key={part.id} className={part.type === 'user' ? 'user-text' : 'ai-text'}>
                                    <div className="text-content">
                                        <button
                                            className="read-icon"
                                            onClick={() => readTextAloud(part.text)}
                                            title="Read this text aloud"
                                        >
                                            🎵
                                        </button>
                                        <strong>{part.type === 'user' ? 'You wrote:' : 'AI suggested:'}</strong>
                                        <div style={part.formatting || {}}>{part.text}</div>
                                    </div>
                                    <div className="text-controls">
                                        <button
                                            className="control-btn edit-btn"
                                            onClick={() => editStoryPart(part.id)}
                                            title="Edit this text"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="control-btn delete-btn"
                                            onClick={() => deleteStoryPart(part.id)}
                                            title="Delete this text"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Enhanced Input Area with formatting preview */}
                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            border: '3px dashed #6c5ce7',
                            borderRadius: '15px',
                            background: 'rgba(108, 92, 231, 0.1)',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <p style={{ margin: '0', fontWeight: 'bold', color: '#6c5ce7' }}>
                                    🖊 Continue writing your story here...
                                    {backendConnected && (
                                        <span style={{
                                            fontSize: '0.8em',
                                            color: '#00b894',
                                            marginLeft: '10px'
                                        }}>
                                            ✨ AI assistance enabled
                                        </span>
                                    )}
                                </p>
                                {/* <div style={{ fontSize: '0.8em', color: '#666', fontWeight: 'normal' }}>
                                    Format: {textFormatting.fontWeight === 'bold' ? '𝐁' : ''}{textFormatting.fontStyle === 'italic' ? '𝐼' : ''}{textFormatting.textDecoration === 'underline' ? '𝐔' : ''} {currentFontSize}px {textFormatting.textAlign}
                                </div> */}
                            </div>

                            <textarea
                                ref={userInputRef}
                                style={{
                                    width: '100%',
                                    height: '120px',
                                    marginTop: '10px',
                                    padding: '15px',
                                    border: '2px solid #6c5ce7',
                                    borderRadius: '10px',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    ...userInputStyle
                                }}
                                placeholder="Continue your amazing story here... Start typing and AI will help with suggestions!"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.ctrlKey) {
                                        handleAddUserText();
                                    }
                                }}
                            />

                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button className="button primary" onClick={handleAddUserText}>
                                    ✨ Add to Story
                                </button>
                                <button
                                    className="button"
                                    onClick={askAIForHelp}
                                    disabled={isGeneratingSuggestion}
                                >
                                    {isGeneratingSuggestion ? '🤔 Thinking...' : '🤖 Ask Wizard for Help'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Suggestions Panel */}
                {showSuggestions && (
                    <div className="suggestions-panel">
                        <div className="suggestions-header">
                            🤖 Story Wizard's Idea for {currentScene?.name}
                            <button
                                className="close-suggestions-btn"
                                onClick={() => setShowSuggestions(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div id="suggestions-list">
                            {isGeneratingSuggestion && (
                                <div className="suggestion-item">
                                    <div className="suggestion-text" style={{ fontStyle: 'italic' }}>
                                        🤔 Creating a perfect suggestion for {currentScene?.name}...
                                    </div>
                                </div>
                            )}

                            {suggestions.map(suggestion => (
                                <div key={suggestion.id} className="suggestion-item">
                                    <div className="suggestion-text">"{suggestion.text}"</div>
                                    <div className="suggestion-controls">
                                        {/* <button
                                            className="suggestion-btn"
                                            onClick={() => acceptSuggestion(suggestion)}
                                        >
                                            ✅ Use
                                        </button>
                                        <button
                                            className="suggestion-btn"
                                            onClick={() => editSuggestion(suggestion)}
                                        >
                                            ✏️ Edit
                                        </button> */}
                                        <button
                                            className="suggestion-btn"
                                            onClick={() => rejectSuggestion(suggestion)}
                                        >
                                            ❌ No
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '15px', textAlign: 'center' }}>
                            <button
                                className="button"
                                onClick={generateAISuggestion}
                                disabled={isGeneratingSuggestion}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: '2px dashed white',
                                    color: 'white',
                                    borderRadius: '15px'
                                }}
                            >
                                {isGeneratingSuggestion ? '🤔 Creating idea...' : '🎲 Another Idea Please!'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Scene Navigation */}
            <div className="scene-nav-buttons">
                <button
                    className="scene-nav-btn"
                    onClick={previousScene}
                    disabled={currentSceneIndex === 0}
                >
                    ⬅️ Previous Scene
                </button>
                <span style={{
                    padding: '10px 15px',
                    background: 'rgba(108, 92, 231, 0.1)',
                    borderRadius: '15px',
                    fontWeight: 'bold',
                    color: '#6c5ce7'
                }}>
                    Scene {currentSceneIndex + 1} of {storyData.elementOrder.length}
                </span>
                <button
                    className="scene-nav-btn"
                    onClick={nextScene}
                    disabled={currentSceneIndex >= storyData.elementOrder.length - 1}
                >
                    ➡️ Next Scene
                </button>
            </div>

            {/* Story Progress */}
            <div style={{
                margin: '20px 0',
                padding: '15px',
                background: 'rgba(0, 184, 148, 0.1)',
                border: '2px solid #00b894',
                borderRadius: '15px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <strong style={{ color: '#00b894' }}>📊 Story Progress</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#636e72' }}>
                            Your words: <span style={{ fontWeight: 'bold' }}>{userWordCount}</span> |
                            AI helped: <span style={{ fontWeight: 'bold' }}>{aiWordCount}</span> |
                            Total: <span style={{ fontWeight: 'bold' }}>{wordCount}</span>
                            {backendConnected && (
                                <span style={{ color: '#00b894', marginLeft: '10px' }}>
                                    | 🤖 AI Enhanced
                                </span>
                            )}
                        </p>
                    </div>
                    <div style={{ fontSize: '2em' }}>📈</div>
                </div>
            </div>

            <div className="navigation">
                <button className="nav-btn" onClick={previousStep}>← Back</button>
                <button
                    className="nav-btn"
                    onClick={() => {
                        const progressData = {
                            storyData,
                            currentSceneIndex,
                            deletedParts,
                            sceneContents
                        };
                        localStorage.setItem('storyProgress', JSON.stringify(progressData));
                    }}
                    style={{ background: 'linear-gradient(45deg, #fd79a8, #e84393)' }}
                >
                    💾 Save Progress
                </button>
                <button
                    className="nav-btn primary"
                    onClick={nextStep}
                    disabled={!storyData.storyParts || storyData.storyParts.length === 0}
                    style={{
                        opacity: (!storyData.storyParts || storyData.storyParts.length === 0) ? '0.5' : '1'
                    }}
                >
                    Finish Story →
                </button>
            </div>
        </div>
    );
};

export default Step4Writing;