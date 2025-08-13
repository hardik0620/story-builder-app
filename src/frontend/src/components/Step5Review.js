// src/components/Step5Review.js
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { badges, calculateEarnedBadges, analyzeEnglishQuality } from '../utils/badgeSystem';

const Step5Review = ({ nextStep, previousStep, storyData, setStoryData }) => {
    const [finalTitle, setFinalTitle] = useState(storyData.title || '');
    const [storyStats, setStoryStats] = useState({
        totalWords: 0,
        userWords: 0,
        aiWords: 0,
        userPercentage: 0,
        aiSuggestions: 0,
        timeSpent: 1,
        englishQuality: 0,
        earnedBadges: []
    });

    useEffect(() => {
        const calculateStats = async () => {
            // Calculate story statistics
            const storyParts = storyData.storyParts || [];
            const userParts = storyParts.filter(p => p.type === 'user');
            const aiParts = storyParts.filter(p => p.type === 'ai');
            const completeStory = generateCompleteStory();

            const userWords = userParts.reduce((acc, part) => acc + part.text.split(' ').filter(word => word.trim()).length, 0);
            const aiWords = aiParts.reduce((acc, part) => acc + part.text.split(' ').filter(word => word.trim()).length, 0);
            const totalWords = userWords + aiWords;
            const userPercentage = totalWords > 0 ? Math.round((userWords / totalWords) * 100) : 0;

            // Calculate time spent (using actual start time)
            const timeSpent = Math.max(1, Math.round((new Date() - new Date(storyData.startTime || Date.now())) / 60000));

            // Analyze English quality (now async)
            let englishQuality = 50; // Default fallback score
            try {
                const englishAnalysis = await analyzeEnglishQuality(completeStory);
                englishQuality = englishAnalysis.score || 50;
                console.log('English analysis result:', englishAnalysis);
            } catch (error) {
                console.error('Error analyzing English quality:', error);
            }

            const stats = {
                totalWords,
                userWords,
                aiWords,
                userPercentage,
                aiSuggestions: storyData.aiSuggestionsUsed || aiParts.length,
                timeSpent,
                englishQuality
            };

            console.log('Calculated stats:', stats);

            // Calculate earned badges
            const newEarnedBadges = calculateEarnedBadges(stats);
            console.log('Earned badges:', newEarnedBadges);

            setStoryStats({
                ...stats,
                earnedBadges: newEarnedBadges
            });
        };

        if (storyData && storyData.storyParts && storyData.storyParts.length > 0) {
            calculateStats();
        }
    }, [storyData.storyParts]);

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

    const exportToPDF = async () => {
        try {
            const storyElement = document.querySelector('.story-preview');
            const canvas = await html2canvas(storyElement);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add title
            const title = finalTitle || storyData.title || 'My Amazing Story';
            pdf.setFontSize(24);
            pdf.text(title, pdfWidth / 2, 20, { align: 'center' });

            // Add story content
            pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);

            // Add statistics page
            pdf.addPage();
            pdf.setFontSize(18);
            pdf.text('Story Statistics', pdfWidth / 2, 20, { align: 'center' });

            pdf.setFontSize(12);
            const stats = [
                `Total Words: ${storyStats.totalWords}`,
                `English Quality Score: ${storyStats.englishQuality}%`,
                `AI Suggestions Used: ${storyStats.aiSuggestions}`,
                `Time Spent: ${storyStats.timeSpent} minutes`,
                `\nEarned Badges:`,
                ...storyStats.earnedBadges.map(badge => `${badge.title} - ${badge.description}`)
            ];

            let yPos = 40;
            stats.forEach(stat => {
                pdf.text(stat, 20, yPos);
                yPos += 10;
            });

            // Save the PDF
            pdf.save(`${title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
        } catch (error) {
            console.error('PDF export error:', error);
            alert("There was an issue creating your PDF. Please try again!");
        }
    };

    const shareStory = async () => {
        const title = finalTitle || storyData.title || 'My Amazing Story';
        const shareText = `Check out my story "${title}" created with Story Weaver! 📚✨\n\nStats:\n- ${storyStats.totalWords} words\n- ${storyStats.englishQuality}% English quality score\n- ${storyStats.earnedBadges.length} badges earned!`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: shareText,
                    url: window.location.href
                });
            } else {
                const shareDialog = document.createElement('div');
                shareDialog.className = 'share-dialog';
                shareDialog.innerHTML = `
                    <div class="share-options">
                        <button onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}')">
                            Share on Twitter
                        </button>
                        <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}')">
                            Share on Facebook
                        </button>
                        <button onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}')">
                            Share on LinkedIn
                        </button>
                        <button id="copyLink">Copy Link</button>
                    </div>
                `;

                document.body.appendChild(shareDialog);

                document.getElementById('copyLink').onclick = () => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                };
            }
        } catch (error) {
            console.error('Share error:', error);
            alert("There was an issue sharing your story. Please try copying the link instead!");
        }
    };

    const saveToGallery = () => {
        try {
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
                author: 'Guest User',
                fullStoryData: {
                    ...storyData,
                    title: title,
                    lastModified: new Date().toISOString(),
                    currentStats: storyStats,
                    storyParts: storyData.storyParts || [],
                    elementOrder: storyData.elementOrder || [],
                    selectedElements: storyData.selectedElements || []
                }
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
        } catch (error) {
            console.error('Error saving story:', error);
            alert('There was an error saving your story. Please try again.');
        }
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
            <div className="step-header" style={{
                background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                padding: '30px',
                borderRadius: '20px',
                color: 'white',
                marginBottom: '30px',
                boxShadow: '0 4px 15px rgba(108, 92, 231, 0.2)'
            }}></div>
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
                        fontFamily: storyData.fontFamily,
                        fontSize: '1.1em',
                        lineHeight: '1.8',
                        color: storyData.color || '#010e11ff',
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
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.englishQuality}%</div>
                        <div style={{ fontSize: '0.9em' }}>English Quality</div>
                    </div>
                    {/* <div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.aiSuggestions}</div>
                        <div style={{ fontSize: '0.9em' }}>AI Assists Used</div>
                    </div> */}
                    <div>
                        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{storyStats.timeSpent}</div>
                        <div style={{ fontSize: '0.9em' }}>Minutes Writing</div>
                    </div>
                </div>
            </div>

            {/* Badges Section */}
            {/* Badges Section */}
            <div style={{
                margin: '20px 0',
                padding: '20px',
                background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
                borderRadius: '20px',
                color: '#2d3436'
            }}>
                <h4 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>🏆 Earned Badges</h4>
                {storyStats.earnedBadges && storyStats.earnedBadges.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px'
                    }}>
                        {storyStats.earnedBadges.map((badge) => (
                            <div key={badge.id} style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                padding: '15px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ fontSize: '2em' }}>{badge.title.split(' ')[0]}</div>
                                <div style={{ fontWeight: 'bold', margin: '5px 0' }}>{badge.title.split(' ').slice(1).join(' ')}</div>
                                <div style={{ fontSize: '0.9em', color: '#666' }}>{badge.description}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '15px',
                        color: '#666'
                    }}>
                        <div style={{ fontSize: '2em', marginBottom: '10px' }}>🎯</div>
                        <div>Keep writing to earn badges!</div>
                        <div style={{ fontSize: '0.9em', marginTop: '5px' }}>
                            Badges unlock as you reach milestones in your story.
                        </div>
                    </div>
                )}
            </div>            <div className="export-options">
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
        </div >
    );
};

export default Step5Review;