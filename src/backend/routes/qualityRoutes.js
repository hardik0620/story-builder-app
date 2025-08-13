// Quality analysis routes
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Fallback basic English quality analysis
const basicEnglishQualityAnalysis = (text) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);

    if (words.length === 0) return 30; // Minimum encouraging score

    // Average sentence length (ideal is between 10-15 for young writers)
    const avgSentenceLength = words.length / Math.max(sentences.length, 1);
    const sentenceLengthScore = Math.min(100, 100 - Math.abs(12.5 - avgSentenceLength) * 3);

    // Vocabulary diversity (unique words ratio)
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^\w]/g, '')));
    const vocabularyScore = Math.min(100, (uniqueWords.size / words.length) * 150);

    // Story length bonus (encourage longer stories)
    const lengthBonus = Math.min(20, words.length / 50);

    // Final score (weighted average with bonuses)
    const finalScore = Math.round(
        (sentenceLengthScore * 0.3 + vocabularyScore * 0.5 + lengthBonus + 20) // +20 base encouragement score
    );

    return Math.min(100, Math.max(30, finalScore)); // Minimum 30 to be encouraging
};

// POST /api/quality/analyze - Analyze English quality using Gemini
router.post('/analyze', async (req, res) => {
    try {
        const { storyText } = req.body;

        if (!storyText || storyText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Story text is required'
            });
        }

        console.log('🎯 Analyzing English quality for story...');

        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        const prompt = `Please analyze the English quality of this story written by a young writer. Consider their age-appropriate language level and creative expression.

Story to analyze:
"${storyText}"

Please evaluate based on these criteria suitable for young writers:
1. Grammar and sentence structure (age-appropriate)
2. Vocabulary usage and variety
3. Story coherence and flow
4. Creative expression and imagination
5. Basic punctuation and spelling

Provide a score between 0-100 where:
- 0-30: Needs significant improvement
- 31-50: Shows promise, needs practice
- 51-70: Good effort with room to grow
- 71-85: Well done for a young writer
- 86-100: Exceptional writing for any age

Be encouraging and consider this is a young, learning writer. Focus on creativity and effort as much as technical accuracy.

Please respond with ONLY a number between 0-100, nothing else.`;

        let score;
        let message;
        let fallback = false;

        if (apiKey) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                const payload = {
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 100,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                    ]
                };

                const geminiRes = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const geminiData = await geminiRes.json();
                console.log('Gemini response:', geminiData);

                if (geminiData?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const response = geminiData.candidates[0].content.parts[0].text.trim();
                    
                    // Extract just the number from the response
                    const scoreMatch = response.match(/\b(\d{1,3})\b/);
                    score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1]))) : 75;
                    
                    console.log(`✅ Gemini analysis complete. Score: ${score}/100`);
                } else {
                    throw new Error('Invalid response from Gemini API');
                }
            } catch (error) {
                console.error('❌ Gemini analysis failed, using fallback:', error.message);
                score = basicEnglishQualityAnalysis(storyText);
                fallback = true;
            }
        } else {
            // Use basic analysis as fallback
            score = basicEnglishQualityAnalysis(storyText);
            fallback = true;
        }

        // Generate encouraging message based on score
        if (score >= 85) {
            message = 'Exceptional writing!';
        } else if (score >= 71) {
            message = 'Great job! Keep writing!';
        } else if (score >= 51) {
            message = 'Good effort! You are improving!';
        } else if (score >= 31) {
            message = 'Nice try! Keep practicing!';
        } else {
            message = 'Great start! Every writer begins somewhere!';
        }

        res.json({
            success: true,
            score: score,
            message: message,
            fallback: fallback,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('English quality analysis error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze English quality',
            details: error.message
        });
    }
});

module.exports = router;
