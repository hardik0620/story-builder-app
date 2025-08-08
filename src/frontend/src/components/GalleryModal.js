// src/components/GalleryModal.js - Enhanced with Continue Functionality
import React, { useState, useEffect } from 'react';

const GalleryModal = ({ isOpen, onClose, onCreateNew, onContinueStory }) => {
    const [savedStories, setSavedStories] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // Load stories from localStorage
            const stories = JSON.parse(localStorage.getItem('savedStories') || '[]');
            setSavedStories(stories);
        }
    }, [isOpen]);

    // ENHANCED: Continue story functionality
    const continueStory = (storyId) => {
        const story = savedStories.find(s => s.id === storyId);
        if (story && story.fullStoryData) {
            console.log('📖 Loading story for continuation:', story.title);

            // Prepare story data for continuation
            const storyDataForContinuation = {
                ...story.fullStoryData,
                // Ensure we have the latest timestamp
                lastModified: new Date().toISOString()
            };

            // Close gallery and load story
            onClose();

            // Call the continue function passed from App.js
            if (typeof onContinueStory === 'function') {
                onContinueStory(storyDataForContinuation);
            } else {
                alert('Continue story functionality is being set up. Please use the main "Create New Story" for now.');
            }
        } else {
            alert(`Sorry, the full story data for "${story?.title || 'this story'}" is not available for continuation. This might be an older save format. You can still read the story or create a new one.`);
        }
    };

    const readStory = (storyId) => {
        const story = savedStories.find(s => s.id === storyId);
        if (story) {
            const storyDetails = `
📖 ${story.title}
🎭 Theme: ${story.theme}
📅 Created: ${story.dateCreated}
📊 ${story.wordCount} words

📚 STORY:
${story.content}

🧩 Structure Used: ${story.structure}
            `.trim();

            // Create a modal-like alert for better reading experience
            const readingWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
            if (readingWindow) {
                readingWindow.document.write(`
                    <html>
                        <head>
                            <title>${story.title} - Story Builder</title>
                            <style>
                                body {
                                    font-family: Georgia, serif;
                                    line-height: 1.6;
                                    max-width: 800px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background: #f8f9fa;
                                }
                                .header {
                                    background: linear-gradient(135deg, #74b9ff, #0984e3);
                                    color: white;
                                    padding: 20px;
                                    border-radius: 15px;
                                    margin-bottom: 20px;
                                    text-align: center;
                                }
                                .story-content {
                                    background: white;
                                    padding: 30px;
                                    border-radius: 15px;
                                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                                    margin-bottom: 20px;
                                    white-space: pre-wrap;
                                    text-align: justify;
                                    font-size: 1.1em;
                                }
                                .meta {
                                    background: rgba(108, 92, 231, 0.1);
                                    padding: 15px;
                                    border-radius: 10px;
                                    font-size: 0.9em;
                                    color: #2d3436;
                                }
                                .close-btn {
                                    position: fixed;
                                    top: 20px;
                                    right: 20px;
                                    background: #ff6b6b;
                                    color: white;
                                    border: none;
                                    padding: 10px 15px;
                                    border-radius: 25px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                                }
                            </style>
                        </head>
                        <body>
                            <button class="close-btn" onclick="window.close()">✖️ Close</button>
                            <div class="header">
                                <h1>${story.title}</h1>
                                <p>📖 A Story Builder Creation</p>
                            </div>
                            <div class="story-content">${story.content}</div>
                            <div class="meta">
                                <strong>📊 Story Details:</strong><br>
                                🎭 Theme: ${story.theme}<br>
                                📅 Created: ${story.dateCreated}<br>
                                📝 Words: ${story.wordCount}<br>
                                🧩 Structure: ${story.structure}
                            </div>
                        </body>
                    </html>
                `);
                readingWindow.document.close();
            } else {
                // Fallback for blocked popups
                alert(storyDetails);
            }
        }
    };

    const shareStoryFromGallery = (storyId) => {
        const story = savedStories.find(s => s.id === storyId);
        if (story) {
            const shareText = `Check out my story "${story.title}" created with Story Builder! 📚✨\n\n${story.preview}\n\nRead more stories at ${window.location.origin}`;

            if (navigator.share) {
                navigator.share({
                    title: story.title,
                    text: shareText,
                    url: window.location.href
                });
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('📋 Story shared! The text has been copied to your clipboard. You can paste it anywhere to share your creation!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('📋 Story text copied to clipboard! You can paste it anywhere to share.');
            }
        }
    };

    const deleteStory = (storyId) => {
        const story = savedStories.find(s => s.id === storyId);
        if (window.confirm(`Are you sure you want to delete "${story?.title || 'this story'}"? This cannot be undone.`)) {
            const updatedStories = savedStories.filter(s => s.id !== storyId);
            setSavedStories(updatedStories);
            localStorage.setItem('savedStories', JSON.stringify(updatedStories));
        }
    };

    const createNewStoryFromGallery = () => {
        onClose();
        if (typeof onCreateNew === 'function') {
            onCreateNew();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="gallery-modal" style={{ display: 'block' }}>
            <div className="gallery-content">
                <button className="close-demo" onClick={onClose}>×</button>
                <h2 style={{ color: '#2d3436', marginBottom: '20px' }}>📚 My Story Gallery</h2>

                <div id="stories-list">
                    {savedStories.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: '#636e72'
                        }}>
                            <div style={{ fontSize: '4em', marginBottom: '20px' }}>📚</div>
                            <h3>No Stories Yet!</h3>
                            <p>Start creating your first story to see it here.</p>
                        </div>
                    ) : (
                        savedStories.map(story => (
                            <div key={story.id} className="story-card" data-story-id={story.id}>
                                <div className="story-card-title">{story.title}</div>
                                <div className="story-card-preview">{story.preview}</div>
                                <div className="story-card-meta">
                                    <span>📅 {story.dateCreated}</span>
                                    <span>📊 {story.wordCount} words</span>
                                    <span>🎭 {story.theme}</span>
                                    {/* Show continue availability */}
                                    <span style={{
                                        color: story.fullStoryData ? '#00b894' : '#ff6b6b',
                                        fontWeight: 'bold'
                                    }}>
                                        {story.fullStoryData ? '✅ Can Continue' : '⚠️ Read Only'}
                                    </span>
                                </div>
                                <div className="story-actions">
                                    {/* ENHANCED: Continue button with better UX */}
                                    <button
                                        className={`story-action-btn ${story.fullStoryData ? 'continue-available' : 'continue-disabled'}`}
                                        onClick={() => continueStory(story.id)}
                                        disabled={!story.fullStoryData}
                                        title={story.fullStoryData ? 'Continue writing this story' : 'Story data not available for continuation'}
                                        style={{
                                            background: story.fullStoryData ?
                                                'linear-gradient(45deg, #00b894, #00cec9)' :
                                                '#ccc',
                                            color: 'white',
                                            opacity: story.fullStoryData ? 1 : 0.6,
                                            cursor: story.fullStoryData ? 'pointer' : 'not-allowed'
                                        }}
                                    >
                                        ✏️ Continue
                                    </button>
                                    <button
                                        className="story-action-btn"
                                        onClick={() => readStory(story.id)}
                                        style={{
                                            background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
                                            color: 'white'
                                        }}
                                    >
                                        👁️ Read
                                    </button>
                                    <button
                                        className="story-action-btn"
                                        onClick={() => shareStoryFromGallery(story.id)}
                                        style={{
                                            background: 'linear-gradient(45deg, #fd79a8, #e84393)',
                                            color: 'white'
                                        }}
                                    >
                                        📤 Share
                                    </button>
                                    <button
                                        className="story-action-btn"
                                        onClick={() => deleteStory(story.id)}
                                        style={{
                                            background: 'linear-gradient(45deg, #ff6b6b, #e84393)',
                                            color: 'white'
                                        }}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        className="button primary"
                        onClick={createNewStoryFromGallery}
                        style={{
                            background: 'linear-gradient(45deg, #00b894, #00cec9)',
                            color: 'white',
                            border: '3px solid #333',
                            borderRadius: '15px',
                            padding: '15px 30px',
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginRight: '15px'
                        }}
                    >
                        🚀 Create New Story
                    </button>
                    <button
                        className="button secondary"
                        onClick={onClose}
                        style={{
                            background: 'linear-gradient(45deg, #fd79a8, #e84393)',
                            color: 'white',
                            border: '3px solid #333',
                            borderRadius: '15px',
                            padding: '15px 30px',
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🏠 Back to Main
                    </button>
                </div>

                {/* Info about continuing stories */}
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: 'rgba(108, 92, 231, 0.1)',
                    borderRadius: '10px',
                    border: '2px solid #6c5ce7',
                    fontSize: '0.9em',
                    color: '#2d3436'
                }}>
                    <strong>💡 About Continuing Stories:</strong><br />
                    ✅ <strong>Can Continue:</strong> Stories saved with full data can be loaded back into the editor<br />
                    ⚠️ <strong>Read Only:</strong> Older stories or those without full data can only be read<br />
                    📝 All new stories saved from now on will support the continue feature!
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;