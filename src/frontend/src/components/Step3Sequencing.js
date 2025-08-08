// src/components/Step3Sequencing.js
import React, { useState, useEffect } from 'react';

const Step3Sequencing = ({ nextStep, previousStep, storyData, setStoryData }) => {
    const [draggedElement, setDraggedElement] = useState(null);

    // Initialize elementOrder when component mounts or selectedElements changes
    useEffect(() => {
        if (storyData.elementOrder.length === 0 && storyData.selectedElements.length > 0) {
            setStoryData(prev => ({
                ...prev,
                elementOrder: [...prev.selectedElements]
            }));
        }
    }, [storyData.selectedElements, storyData.elementOrder.length, setStoryData]);

    const autoSort = () => {
        const sorted = [...storyData.elementOrder].sort((a, b) => a.id - b.id);
        setStoryData(prev => ({ ...prev, elementOrder: sorted }));
    };

    const resetOrder = () => {
        setStoryData(prev => ({ ...prev, elementOrder: [...prev.selectedElements] }));
    };

    const handleDragStart = (e, element) => {
        setDraggedElement(element);
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '';
        setDraggedElement(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetElement) => {
        e.preventDefault();

        if (!draggedElement || draggedElement.id === targetElement.id) {
            return;
        }

        const currentOrder = [...storyData.elementOrder];
        const draggedIndex = currentOrder.findIndex(el => el.id === draggedElement.id);
        const targetIndex = currentOrder.findIndex(el => el.id === targetElement.id);

        // Remove dragged element and insert at target position
        const [removed] = currentOrder.splice(draggedIndex, 1);
        currentOrder.splice(targetIndex, 0, removed);

        setStoryData(prev => ({ ...prev, elementOrder: currentOrder }));
    };

    const moveElement = (elementId, direction) => {
        const currentOrder = [...storyData.elementOrder];
        const currentIndex = currentOrder.findIndex(el => el.id === elementId);

        if (currentIndex === -1) return;

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= currentOrder.length) return;

        // Swap elements
        [currentOrder[currentIndex], currentOrder[newIndex]] =
            [currentOrder[newIndex], currentOrder[currentIndex]];

        setStoryData(prev => ({ ...prev, elementOrder: currentOrder }));
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">🔄 Perfect Order</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '50%' }}></div>
                </div>
                <p style={{ color: '#6c5ce7', fontWeight: 'bold' }}>✨ Step 3 of 6 ✨</p>
            </div>

            <p style={{ fontWeight: 'bold', color: '#2d3436', textAlign: 'center', fontSize: '1.1em' }}>
                🎪 Sort your story building blocks to put them in the best order
            </p>

            <div style={{
                background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                margin: '20px 0',
                border: '3px solid #333',
                textAlign: 'center'
            }}>
                <h4 style={{ margin: '0 0 15px 0' }}>💡 Sequencing Tips</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
                        <strong>🏠 Start</strong><br />
                        <small>Initial Situation, Absence</small>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
                        <strong>⚔️ Problem</strong><br />
                        <small>Villainy, Lack, Departure</small>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
                        <strong>🎯 Journey</strong><br />
                        <small>Test, Receipt, Struggle</small>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
                        <strong>🏆 Resolution</strong><br />
                        <small>Victory, Return, Reward</small>
                    </div>
                </div>
            </div>

            <div className="sequence-panel" id="sequence-area">
                <strong>🎬 Drag to rearrange your story:</strong><br /><br />
                <div id="sortable-elements" style={{ minHeight: '100px' }}>
                    {storyData.elementOrder.map((el, index) => (
                        <div
                            key={el.id}
                            className="sequence-item"
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, el)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, el)}
                            style={{
                                cursor: 'move',
                                position: 'relative',
                                display: 'inline-block',
                                margin: '8px',
                                padding: '10px 60px 10px 15px',
                                userSelect: 'none'
                            }}
                        >
                            <span style={{ fontSize: '0.8em', color: '#666', marginRight: '8px' }}>
                                {index + 1}.
                            </span>
                            {el.emoji} {el.shortName} ({el.id})

                            {/* Arrow controls for mobile/accessibility */}
                            <div style={{
                                position: 'absolute',
                                right: '5px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px'
                            }}>
                                <button
                                    onClick={() => moveElement(el.id, 'up')}
                                    disabled={index === 0}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '1px solid #333',
                                        background: 'white',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: index === 0 ? '0.3' : '1'
                                    }}
                                    title="Move up"
                                >
                                    ↑
                                </button>
                                <button
                                    onClick={() => moveElement(el.id, 'down')}
                                    disabled={index === storyData.elementOrder.length - 1}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '1px solid #333',
                                        background: 'white',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: index === storyData.elementOrder.length - 1 ? '0.3' : '1'
                                    }}
                                    title="Move down"
                                >
                                    ↓
                                </button>
                            </div>
                        </div>
                    ))}

                    {storyData.elementOrder.length === 0 && (
                        <p style={{ margin: 0, fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
                            Your selected elements will appear here for ordering...
                        </p>
                    )}
                </div>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button className="button secondary" onClick={autoSort}>
                    🪄 Sort Automatically
                </button>
                <button className="button" onClick={resetOrder} style={{ marginLeft: '10px' }}>
                    🔄 Reset Order
                </button>
            </div>

            <div style={{
                background: 'rgba(0, 184, 148, 0.1)',
                border: '2px solid #00b894',
                borderRadius: '15px',
                padding: '15px',
                margin: '20px 0',
                textAlign: 'center'
            }}>
                <strong>🎯 Pro Tip:</strong> A good story usually flows from setup → problem → journey → resolution.
                Drag elements to create the most logical sequence for your adventure!
            </div>

            <div className="navigation">
                <button className="nav-btn" onClick={previousStep}>← Back</button>
                <button className="nav-btn primary" onClick={nextStep}>Next →</button>
            </div>
        </div>
    );
};

export default Step3Sequencing;