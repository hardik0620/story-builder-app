// src/components/Step6Feedback.js
import React, { useState } from 'react';

const Step6Feedback = ({ resetStory, storyData, currentUser, showGallery }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [nextStoryChoice, setNextStoryChoice] = useState('');
    const [showBadge, setShowBadge] = useState(true);

    const handleRatingClick = (stars) => {
        setRating(stars);

        const messages = [
            '',
            "Thanks for the feedback! We'll work on making it better! 🌟",
            "Thank you! We're glad you tried our story builder! 😊",
            "Wonderful! We're happy you enjoyed the experience! 🎉",
            "Amazing! We're so glad you loved writing with us! ✨",
            "Fantastic! You're an amazing story creator! 🏆⭐"
        ];

        if (messages[stars]) {
            // Could trigger a toast notification here
            console.log(messages[stars]);
        }
    };

    const handleFeedbackChoice = (choice) => {
        setNextStoryChoice(choice);

        const messages = {
            'yes': "Yay! I can't wait to help you write more amazing stories using Propp's functions! 🚀📚",
            'maybe': "That's okay! I'll be here whenever you're ready for another adventure! 😊",
            'no': "No problem! Thanks for trying Story Builder. Maybe next time! 🌟"
        };

        console.log(messages[choice]);
    };

    const createNewStory = () => {
        resetStory();
    };

    const viewGallery = () => {
        // Use the showGallery function passed from parent or trigger custom event
        if (showGallery) {
            showGallery();
        } else {
            // Fallback: trigger custom event that App.js listens for
            window.dispatchEvent(new CustomEvent('showGallery'));
        }
    };

    const shareSuccess = () => {
        const successText = `I just created an amazing story using Story Builder and Propp's morphology! 🏆📚 Check out this AI-powered storytelling tool!`;

        if (navigator.share) {
            navigator.share({
                title: 'Story Builder Success!',
                text: successText,
                url: window.location.href
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(successText).then(() => {
                alert('Success message copied to clipboard! Share your achievement!');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = successText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Success message copied to clipboard!');
        }
    };

    const goHome = () => {
        resetStory();
    };

    const submitFeedback = () => {
        // Here you would typically send feedback to a server
        const feedbackData = {
            rating: rating,
            feedback: feedback,
            nextStoryChoice: nextStoryChoice,
            storyStats: {
                title: storyData.title,
                theme: storyData.theme,
                elementsUsed: storyData.selectedElements?.length || 0,
                wordsWritten: storyData.storyParts?.reduce((acc, part) => acc + part.text.split(' ').length, 0) || 0
            },
            user: currentUser,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage as a demo (in real app, send to server)
        const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));

        alert("Thank you for your feedback! It helps us make Story Builder even better! 🌟");
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">🌟 Congratulations!</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '100%' }}></div>
                </div>
                <p style={{ color: '#00b894', fontWeight: 'bold' }}>🎉 You're a Real Author Now! 🎉</p>
            </div>

            <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <div style={{ fontSize: '4em', marginBottom: '20px' }}>🏆✨🎊</div>
                <p style={{
                    fontSize: '1.2em',
                    color: '#2d3436',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    You've created an amazing story using the selected Building Blocks! You're a true storyteller,
                    and we hope you had as much fun writing it with your AI Story Wizard!
                </p>
            </div>

            {/* Achievement Badge */}
            {showBadge && (
                <div style={{
                    margin: '30px 0',
                    padding: '25px',
                    background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
                    border: '4px solid #333',
                    borderRadius: '25px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    <button
                        onClick={() => setShowBadge(false)}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '15px',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5em',
                            cursor: 'pointer',
                            color: '#636e72'
                        }}
                    >
                        ×
                    </button>
                    <h3 style={{ margin: '0 0 15px 0', color: '#2d3436' }}>🏅 You Earned a Badge!</h3>
                    <div style={{ fontSize: '4em', margin: '15px 0' }}>🏆</div>
                    <h4 style={{ margin: '0 0 10px 0', color: '#2d3436' }}>First Story Creator</h4>
                    <p style={{ margin: '0', color: '#636e72' }}>
                        You completed your first collaborative story with AI using Propp's functions!
                    </p>
                </div>
            )}

            {/* Feedback Section */}
            <div style={{
                margin: '30px 0',
                padding: '25px',
                background: 'linear-gradient(135deg, #fd79a8, #e84393)',
                borderRadius: '20px',
                color: 'white',
                textAlign: 'center'
            }}>
                <h3 style={{ margin: '0 0 20px 0' }}>💭 Tell Us About Your Experience!</h3>

                <div style={{ margin: '20px 0' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        How much did you enjoy writing with the Story Wizard?
                    </p>
                    <div className="star-rating" style={{
                        fontSize: '2.5em',
                        margin: '15px 0',
                        cursor: 'pointer'
                    }}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                onClick={() => handleRatingClick(star)}
                                style={{
                                    color: star <= rating ? '#ffd700' : 'white',
                                    transition: 'color 0.3s ease',
                                    margin: '0 5px'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                ⭐
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        What was the best part of creating your story?
                    </p>
                    <textarea
                        style={{
                            width: '100%',
                            height: '80px',
                            padding: '15px',
                            border: 'none',
                            borderRadius: '15px',
                            fontFamily: 'inherit',
                            fontSize: '1em',
                            color: '#333',
                            resize: 'vertical'
                        }}
                        placeholder="Tell us what you loved most about your story adventure..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                <div style={{ margin: '20px 0' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        Would you like to write another story?
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            className={`button ${nextStoryChoice === 'yes' ? 'primary' : ''}`}
                            onClick={() => handleFeedbackChoice('yes')}
                            style={{
                                background: nextStoryChoice === 'yes' ? 'rgba(0, 184, 148, 0.8)' : 'rgba(255,255,255,0.2)',
                                border: '2px solid white',
                                color: 'white'
                            }}
                        >
                            ✅ Yes, absolutely!
                        </button>
                        <button
                            className={`button ${nextStoryChoice === 'maybe' ? 'primary' : ''}`}
                            onClick={() => handleFeedbackChoice('maybe')}
                            style={{
                                background: nextStoryChoice === 'maybe' ? 'rgba(0, 184, 148, 0.8)' : 'rgba(255,255,255,0.2)',
                                border: '2px solid white',
                                color: 'white'
                            }}
                        >
                            🤔 Maybe later
                        </button>
                        <button
                            className={`button ${nextStoryChoice === 'no' ? 'primary' : ''}`}
                            onClick={() => handleFeedbackChoice('no')}
                            style={{
                                background: nextStoryChoice === 'no' ? 'rgba(0, 184, 148, 0.8)' : 'rgba(255,255,255,0.2)',
                                border: '2px solid white',
                                color: 'white'
                            }}
                        >
                            ❌ Not right now
                        </button>
                    </div>
                </div>

                <button
                    className="button"
                    onClick={submitFeedback}
                    style={{
                        marginTop: '15px',
                        background: 'rgba(255,255,255,0.3)',
                        border: '2px solid white',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    📝 Submit Feedback
                </button>
            </div>

            {/* Action Buttons */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                margin: '30px 0'
            }}>
                <button className="button primary large" onClick={createNewStory}>
                    🚀 Write Another Story
                </button>
                <button className="button large" onClick={viewGallery}>
                    🏆 View My Stories
                </button>
                <button className="button secondary large" onClick={shareSuccess}>
                    📤 Share My Success
                </button>
                <button className="button large" onClick={goHome}>
                    🏠 Back to Home
                </button>
            </div>

            {/* Story Summary */}
            <div style={{
                margin: '30px 0',
                padding: '20px',
                background: 'rgba(0, 184, 148, 0.1)',
                border: '2px solid #00b894',
                borderRadius: '15px'
            }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#00b894', textAlign: 'center' }}>
                    📊 Your Story Journey Summary
                </h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    textAlign: 'center'
                }}>
                    <div>
                        <strong>📖 Story Title:</strong><br />
                        {storyData.title || 'Untitled Story'}
                    </div>
                    <div>
                        <strong>🎭 Theme:</strong><br />
                        {storyData.theme || 'Custom'}
                    </div>
                    <div>
                        <strong>🧩 Elements Used:</strong><br />
                        {storyData.selectedElements?.length || 0} Propp Functions
                    </div>
                    <div>
                        <strong>📝 Words Written:</strong><br />
                        {storyData.storyParts?.reduce((acc, part) => acc + part.text.split(' ').length, 0) || 0} words
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step6Feedback;