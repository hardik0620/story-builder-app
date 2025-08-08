// src/components/Step5Review.js
import React, { useState, useEffect } from 'react';

const Step5Review = ({ nextStep, previousStep, storyData, setStoryData }) => {
    const [finalTitle, setFinalTitle] = useState(storyData.title || '');
    const [storyStats, setStoryStats] = useState({
        totalWords: 0,
        userWords: 0,
        aiWords: 0,
        userPercentage: 0,
        aiSuggestions: 0,
        timeSpent: 1
    });

    useEffect(() => {
        // Calculate story statistics
        const storyParts = storyData.storyParts || [];
        const userParts = storyParts.filter(p => p.type === 'user');
        const aiParts = storyParts.filter(p => p.type === 'ai');

        const userWords = userParts.reduce((acc, part) => acc + part.text.split(' ').filter(word => word.trim()).length, 0);
        const aiWords = aiParts.reduce((acc, part) => acc + part.text.split(' ').filter(word => word.trim()).length, 0);
        const totalWords = userWords + aiWords;
        const userPercentage = totalWords > 0 ? Math.round((userWords / totalWords) * 100) : 0;

        // Calculate time spent (mock calculation)
        const timeSpent = Math.max(1, Math.round((new Date() - new Date(storyData.startTime || Date.now())) / 60000));

        setStoryStats({
            totalWords,
            userWords,
            aiWords,
            userPercentage,
            aiSuggestions: aiParts.length,
            timeSpent
        });
    }, [storyData]);

    const generateCompleteStory = () => {
        if (!storyData.storyParts || storyData.storyParts.length === 0) {
            return "Your amazing story will appear here once you've written it!";
        }

        // Join all story parts with a single space for continuous text
        return storyData.storyParts.map(part => part.text).join(' ');
    };

    const getStructureSummary = () => {
        if (!storyData.elementOrder || storyData.elementOrder.length === 0) {
            return 'Custom story structure';
        }
        return storyData.elementOrder.map(el => el.shortName).join(' → ');
    };

    const exportToPDF = () => {
        try {
            const title = finalTitle || storyData.title || 'My Amazing Story';
            const story = generateCompleteStory();
            const structure = getStructureSummary();

            const content = `
STORY TITLE: ${title}
Created by: Guest User
Date: ${new Date().toLocaleDateString()}

STORY STRUCTURE USED:
${structure}

COMPLETE STORY:
${story}

STATISTICS:
Total Words: ${storyStats.totalWords}
Your Contribution: ${storyStats.userPercentage}%
AI Suggestions Used: ${storyStats.aiSuggestions}
Time Spent: ${storyStats.timeSpent} minutes

Created with Story Builder - AI-Powered Storytelling using Propp's Morphology
            `;

            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            alert("Your story has been downloaded as a text file! PDF feature will be available soon!");
        } catch (error) {
            console.error('Export error:', error);
            alert("There was an issue creating your download. Please try copying your story text instead!");
        }
    };

    const shareStory = () => {
        const title = finalTitle || storyData.title || 'My Amazing Story';
        const shareText = `Check out my story "${title}" created with Story Builder! 📚✨`;

        if (navigator.share) {
            navigator.share({
                title: title,
                text: shareText,
                url: window.location.href
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Story link copied to clipboard! You can now paste it anywhere to share.');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Story text copied to clipboard!');
        }
    };

    const saveToGallery = () => {
        const title = finalTitle || storyData.title || 'Untitled Story';
        const story = generateCompleteStory();
        const preview = story.substring(0, 150) + (story.length > 150 ? '...' : '');

        const storyToSave = {
            id: Date.now(),
            title: title,
            theme: storyData.theme,
            content: story,
            preview: preview,
            structure: getStructureSummary(),
            dateCreated: new Date().toLocaleDateString(),
            wordCount: storyStats.totalWords,
            userContribution: storyStats.userPercentage,
            author: 'Guest User'
        };

        const savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
        savedStories.unshift(storyToSave);
        localStorage.setItem('savedStories', JSON.stringify(savedStories));

        alert("Your masterpiece has been saved to your gallery!");

        setTimeout(() => {
            if (window.confirm("Would you like to visit your story gallery and see all your creations? You can also continue writing this story later!")) {
                // Trigger gallery view in parent component
                window.dispatchEvent(new CustomEvent('showGallery'));
            }
        }, 1500);
    };

    const printStory = () => {
        const printWindow = window.open('', '_blank');
        const story = generateCompleteStory();
        const printContent = `
            <html>
                <head>
                    <title>${finalTitle || storyData.title || 'My Story'}</title>
                    <style>
                        body { 
                            font-family: Georgia, serif; 
                            padding: 20px; 
                            line-height: 1.8; 
                            max-width: 800px; 
                            margin: 0 auto;
                            color: #333;
                        }
                        h1 { 
                            color: #2d3436; 
                            text-align: center; 
                            margin-bottom: 30px;
                            font-size: 2.5em;
                        }
                        .story-content { 
                            margin: 30px 0; 
                            padding: 30px; 
                            font-size: 1.2em;
                            text-align: justify;
                            line-height: 1.8;
                            text-indent: 30px;
                        }
                        .meta { 
                            text-align: center; 
                            color: #666; 
                            margin-bottom: 20px;
                            font-style: italic;
                        }
                        .stats { 
                            background: #f8f9fa; 
                            padding: 20px; 
                            border-radius: 8px; 
                            margin-top: 40px; 
                            border: 1px solid #ddd;
                        }
                        hr { 
                            margin: 30px 0; 
                            border: none; 
                            border-top: 2px solid #ddd;
                        }
                    </style>
                </head>
                <body>
                    <h1>${finalTitle || storyData.title || 'My Amazing Story'}</h1>
                    <div class="meta">
                        <strong>Created:</strong> ${new Date().toLocaleDateString()}<br>
                        <strong>Structure:</strong> ${getStructureSummary()}
                    </div>
                    <hr>
                    <div class="story-content">${story}</div>
                    <div class="stats">
                        <h3>Story Statistics</h3>
                        <p><strong>Total Words:</strong> ${storyStats.totalWords}</p>
                        <p><strong>Your Contribution:</strong> ${storyStats.userPercentage}%</p>
                        <p><strong>AI Suggestions Used:</strong> ${storyStats.aiSuggestions}</p>
                        <p><strong>Time Spent:</strong> ${storyStats.timeSpent} minutes</p>
                    </div>
                </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">🎊 Your Masterpiece!</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '83%' }}></div>
                </div>
                <p style={{ color: '#00b894', fontWeight: 'bold' }}>🎉 Step 5 of 6 - Almost Done! 🎉</p>
            </div>

            <div className="input-group">
                <label className="label">📝 Final Story Title</label>
                <input
                    type="text"
                    className="text-input"
                    value={finalTitle}
                    onChange={(e) => setFinalTitle(e.target.value)}
                    placeholder="Enter your story title"
                />
            </div>

            <div className="story-preview">
                <h4 style={{ margin: '0 0 15px 0' }}>📚 Your Complete Story:</h4>
                <div
                    style={{
                        minHeight: '100px',
                        background: '#f8f9fa',
                        borderRadius: '10px',
                        padding: '25px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        border: '2px solid #ddd',
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.1em',
                        lineHeight: '1.8',
                        color: '#2d3436',
                        textAlign: 'justify',
                        textIndent: '20px' // Indent first line like a book
                    }}
                >
                    {generateCompleteStory()}
                </div>

                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: 'rgba(108, 92, 231, 0.1)',
                    borderRadius: '10px'
                }}>
                    <small>
                        <strong>Story Structure Used:</strong> {getStructureSummary()}
                    </small>
                </div>
            </div>

            {/* Story Statistics */}
            <div style={{
                margin: '20px 0',
                padding: '20px',
                background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
                borderRadius: '20px',
                color: 'white'
            }}>
                <h4 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>📊 Your Amazing Story Stats!</h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '15px',
                    textAlign: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.totalWords}</div>
                        <div style={{ fontSize: '0.9em' }}>Total Words</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.userPercentage}%</div>
                        <div style={{ fontSize: '0.9em' }}>Your Ideas</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.aiSuggestions}</div>
                        <div style={{ fontSize: '0.9em' }}>AI Suggestions Used</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.timeSpent}</div>
                        <div style={{ fontSize: '0.9em' }}>Minutes Writing</div>
                    </div>
                </div>
            </div>

            <div className="export-options">
                <button className="button primary large" onClick={exportToPDF}>
                    📄 Download PDF
                </button>
                <button className="button large" onClick={shareStory}>
                    📤 Share Story
                </button>
                <button className="button secondary large" onClick={saveToGallery}>
                    💾 Save to Gallery
                </button>
                <button className="button large" onClick={printStory}>
                    🖨️ Print Story
                </button>
            </div>

            <div className="navigation">
                <button className="nav-btn" onClick={previousStep}>← Back to Editing</button>
                <button className="nav-btn primary" onClick={nextStep}>Give Feedback →</button>
            </div>
        </div>
    );
};

export default Step5Review;