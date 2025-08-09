// backend/controllers/aiController.js - Enhanced with Knowledge Database
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { PROPP_KNOWLEDGE_DATABASE, PROPP_HELPER_FUNCTIONS } = require('../data/proppKnowledgeDatabase');
const fetch = require('node-fetch');

// Initialize Gemini client
let genAI = null;
let geminiModel = null;

if (process.env.GOOGLE_GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    geminiModel = genAI.getGenerativeModel({
        model: "gemini-pro",
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
        ],
        generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
        }
    });
    console.log('✅ Google Gemini initialized successfully');
} else {
    console.warn('⚠️  Google Gemini API key not found. Using knowledge database fallback.');
}

// ENHANCED: AI Chat Handler with Knowledge Database
exports.handleChat = async (req, res) => {
    try {
        const { message, currentStep = 0, storyData = {} } = req.body;

        console.log('🧙‍♂️ Processing chat request:', {
            message: message.substring(0, 50) + '...',
            currentStep,
            theme: storyData.theme,
            currentScene: storyData.elementOrder?.[0]?.id
        });

        // Get current scene for context
        const currentSceneId = getCurrentSceneId(storyData, currentStep);

        // Try to get response from knowledge database first
        const knowledgeResponse = PROPP_HELPER_FUNCTIONS.findRelevantResponse(
            message,
            currentSceneId,
            storyData.theme
        );

        let finalResponse;

        if (geminiModel && shouldUseAI(message)) {
            try {
                // Create enhanced prompt with knowledge base context
                const enhancedPrompt = createEnhancedPrompt(message, currentStep, storyData, knowledgeResponse);

                console.log('🤖 Sending enhanced prompt to Gemini');
                const aiResponse = await geminiModel.generateContent(enhancedPrompt);
                const aiText = await aiResponse.response.text();

                // Combine AI response with knowledge base tip
                finalResponse = {
                    success: true,
                    response: aiText,
                    tip: knowledgeResponse.tip,
                    writingPrompt: knowledgeResponse.writingPrompt,
                    sceneContext: knowledgeResponse.sceneContext,
                    source: 'ai_enhanced'
                };

            } catch (aiError) {
                console.log('🔄 AI failed, using knowledge base:', aiError.message);
                finalResponse = formatKnowledgeResponse(knowledgeResponse);
            }
        } else {
            // Use knowledge database response
            finalResponse = formatKnowledgeResponse(knowledgeResponse);
        }

        res.json({
            ...finalResponse,
            timestamp: new Date().toISOString(),
            sceneId: currentSceneId
        });

    } catch (error) {
        console.error('AI Chat Error:', error);

        // Fallback to simple knowledge response
        const fallbackResponse = PROPP_HELPER_FUNCTIONS.getGenericResponse(
            req.body.message || '',
            req.body.storyData?.theme || 'adventure'
        );

        res.json({
            success: true,
            response: fallbackResponse.response + " 🌟",
            tip: fallbackResponse.tip,
            writingPrompt: fallbackResponse.writingPrompt,
            timestamp: new Date().toISOString(),
            source: 'fallback'
        });
    }
};

// FIXED: Generate single contextual suggestion
exports.generateSuggestions = async (req, res) => {
    try {
        const { currentScene, currentSceneContent, storyTheme, storySoFar, previousScenes } = req.body;
        console.log('💡 Generating suggestion for scene:', currentScene?.name, 'theme:', storyTheme);
        console.log('Story so far:', storySoFar);

        if (!currentScene) {
            return res.json({
                success: true,
                suggestions: ["Continue your story by showing what your hero does next!"],
                source: 'generic'
            });
        }

        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const prompt = `You are helping a young writer create a ${storyTheme || 'adventure'} story. They are working on the "${currentScene.name}" part of their story.

Previous scenes:
${previousScenes || 'This is the first scene.'}

Scene being written: ${currentScene.name} - ${currentScene.description}

Current scene written so far:
${currentSceneContent || 'Nothing'}

Current scene being written now:
${storySoFar || 'Nothing'}

Based on all the previous scenes, the current scene, and where we are in the story, give ONE specific, encouraging writing suggestion (1-2 sentences) that:
1. Fits the "${currentScene.name}" function perfectly
2. Continues naturally from all previous scenes
3. Is age-appropriate and inspiring
4. Gives a specific action or idea that builds on what came before

Respond with exactly one suggestion, or, if you think that the contents of the scene so far is good enough for the young writer, ask them to proceed to the next scene, or simply complement their work`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }]
        };
        let suggestion;
        try {
            console.log('🔍 Sending suggestion request to Gemini');
            console.log('payload:', JSON.stringify(payload));
            const geminiRes = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log('Gemini response status:', geminiRes.status);
            const geminiData = await geminiRes.json();
            console.log('Gemini response:', geminiData);
            suggestion = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        } catch (aiError) {
            console.log('🔄 AI suggestion failed, using knowledge base');
            const sceneData = PROPP_KNOWLEDGE_DATABASE[currentScene.id];
            suggestion = getKnowledgeBaseSuggestion(sceneData, storyTheme);
        }

        res.json({
            success: true,
            suggestions: [suggestion],
            sceneId: currentScene.id,
            sceneName: currentScene.name,
            timestamp: new Date().toISOString(),
            source: suggestion ? 'ai_enhanced' : 'knowledge_base'
        });

    } catch (error) {
        console.error('Suggestion Generation Error:', error);
        const fallbackSuggestion = "Show what your hero discovers or decides to do next in this part of the adventure!";
        res.json({
            success: true,
            suggestions: [fallbackSuggestion],
            timestamp: new Date().toISOString(),
            source: 'fallback'
        });
    }
};

// Helper Functions
function getCurrentSceneId(storyData, currentStep) {
    // Try to get from current writing context
    if (storyData.elementOrder && storyData.elementOrder.length > 0) {
        // Find the scene user is currently working on
        const currentSceneIndex = getCurrentSceneIndex(storyData);
        return storyData.elementOrder[currentSceneIndex]?.id || 0;
    }

    // Fallback based on step
    const stepToSceneMap = {
        0: 0,  // Welcome -> Initial
        1: 0,  // Theme -> Initial  
        2: 0,  // Elements -> Initial
        3: 0,  // Sequencing -> Initial
        4: 0,  // Writing -> depends on current scene
        5: 31, // Review -> Reward
        6: 31  // Feedback -> Reward
    };

    return stepToSceneMap[currentStep] || 0;
}

function getCurrentSceneIndex(storyData) {
    if (!storyData.storyParts || storyData.storyParts.length === 0) {
        return 0;
    }

    // Find the scene with the most recent writing
    const sceneCounts = {};
    storyData.storyParts.forEach(part => {
        sceneCounts[part.sceneIndex] = (sceneCounts[part.sceneIndex] || 0) + 1;
    });

    // Return the scene being worked on most recently
    const sceneIndices = Object.keys(sceneCounts).map(Number).sort((a, b) => b - a);
    return sceneIndices[0] || 0;
}

function shouldUseAI(message) {
    // Use AI for complex questions, specific writing help, or detailed queries
    const complexIndicators = [
        'how do i', 'what should', 'can you help', 'i need', 'stuck',
        'not sure', 'what happens', 'character', 'plot', 'story'
    ];

    const lowerMessage = message.toLowerCase();
    return complexIndicators.some(indicator => lowerMessage.includes(indicator)) && message.length > 20;
}

function createEnhancedPrompt(message, currentStep, storyData, knowledgeResponse) {
    return `You are the Story Wizard, a helpful AI assistant for young writers using Propp's narrative functions.

CONTEXT:
- User is on step ${currentStep} of story creation
- Story theme: ${storyData.theme || 'Not selected'}
- Current scene: ${knowledgeResponse.sceneContext}
- User asked: "${message}"

KNOWLEDGE BASE SUGGESTION: "${knowledgeResponse.response}"

Respond as the Story Wizard:
1. Be encouraging and enthusiastic about storytelling
2. Use 1-2 emojis maximum
3. Keep response to 2-3 sentences
4. Be specific and actionable
5. Build on the knowledge base suggestion but make it personal
6. Focus on the current scene: ${knowledgeResponse.sceneContext}

Response:`;
}

function formatKnowledgeResponse(knowledgeResponse) {
    return {
        success: true,
        response: knowledgeResponse.response + " ✨",
        tip: "💡 " + knowledgeResponse.tip,
        writingPrompt: "📝 Try this: " + knowledgeResponse.writingPrompt,
        sceneContext: knowledgeResponse.sceneContext,
        source: 'knowledge_base'
    };
}

function getKnowledgeBaseSuggestion(sceneData, storyTheme) {
    if (!sceneData) {
        return `Continue your ${storyTheme || 'adventure'} story by showing what your hero does next!`;
    }

    // Get a random response from the scene's available responses
    const randomIndex = Math.floor(Math.random() * sceneData.responses.length);
    return sceneData.responses[randomIndex];
}

// Keep existing functions for title generation, story completion, etc.
exports.generateTitle = async (req, res) => {
    try {
        const { theme, selectedElements } = req.body;

        if (geminiModel) {
            const prompt = `Generate exactly 3 creative, family-friendly story titles for a ${theme} story using these story elements: ${selectedElements?.map(el => el.shortName).join(', ') || 'classic elements'}.

Requirements:
- Each title should be 2-6 words long
- Appropriate for children aged 8-16
- Exciting and engaging
- Match the ${theme} theme

Respond with exactly 3 titles, each on a separate line:`;

            const response = await geminiModel.generateContent(prompt);
            const aiResponse = await response.response;
            const titles = aiResponse.text().split('\n')
                .filter(line => line.trim())
                .map(line => line.replace(/^\d+\.?\s*/, '').trim())
                .slice(0, 3);

            return res.json({
                success: true,
                titles: titles,
                theme: theme,
                timestamp: new Date().toISOString(),
                source: 'ai_generated'
            });
        }

        // Fallback title generation based on theme
        const themeBasedTitles = {
            fantasy: ["The Magical Quest", "Kingdom of Wonders", "The Enchanted Adventure"],
            adventure: ["The Great Journey", "Quest for Treasure", "The Brave Explorer"],
            mystery: ["The Secret Discovery", "Clues and Friends", "The Hidden Truth"],
            animals: ["Friends of the Forest", "The Animal Kingdom", "Wild Adventures"],
            friendship: ["Friends Forever", "The Power of Friendship", "Together We Win"],
            space: ["Galactic Heroes", "Journey to the Stars", "Space Adventures"],
            underwater: ["Ocean Treasures", "The Deep Sea Quest", "Underwater Friends"],
            superhero: ["The Young Hero", "Powers of Good", "Super Friends"],
            pirate: ["Treasure Island Quest", "The Friendly Pirates", "Adventure on the Seas"],
            fairytale: ["A New Fairy Tale", "Magic and Wonder", "The Kind Princess"],
            robot: ["Robot Friends", "The Helpful Android", "Mechanical Hearts"],
            dinosaur: ["Dinosaur Adventures", "The Friendly T-Rex", "Prehistoric Friends"],
            magic_school: ["Magic Academy", "Learning Spells", "The Young Wizard"],
            time_travel: ["Through Time", "The Time Adventurers", "Past and Future"],
            jungle: ["Jungle Explorers", "The Green Adventure", "Wild Discovery"],
            winter: ["Winter Magic", "The Snow Adventure", "Frosty Friends"],
            sports: ["The Championship", "Team Spirit", "Victory Together"],
            music: ["The Musical Journey", "Harmony and Friends", "Songs of Adventure"]
        };

        const titles = themeBasedTitles[theme] || ["The Amazing Story", "A Wonderful Tale", "The Great Adventure"];

        res.json({
            success: true,
            titles: titles,
            theme: theme,
            timestamp: new Date().toISOString(),
            source: 'theme_based'
        });

    } catch (error) {
        console.error('Title Generation Error:', error);
        const safeTitles = ["The Amazing Adventure", "Friends Forever", "The Great Quest"];
        res.json({
            success: true,
            titles: safeTitles,
            theme: req.body.theme,
            timestamp: new Date().toISOString(),
            source: 'fallback'
        });
    }
};

exports.completeStory = async (req, res) => {
    try {
        const { storyParts, targetLength } = req.body;
        const currentStory = storyParts.map(part => part.text).join(' ');
        const currentWordCount = currentStory.split(' ').length;
        const remainingWords = (targetLength || 500) - currentWordCount;

        if (remainingWords <= 0) {
            return res.json({
                success: true,
                completion: "Your story is already complete! Consider adding a satisfying conclusion that shows what your hero learned.",
                wordCount: currentWordCount
            });
        }

        if (geminiModel) {
            const prompt = `You are helping complete a family-friendly story for children. 

CURRENT STORY: "${currentStory}"

Write approximately ${remainingWords} words to complete this story. The completion should:
- Flow naturally from the existing text
- Provide a satisfying, happy conclusion
- Resolve conflicts through kindness and friendship
- Include positive life lessons
- End on an uplifting, hopeful note

Write only the completion text:`;

            const response = await geminiModel.generateContent(prompt);
            const completion = await response.response.text();

            return res.json({
                success: true,
                completion: completion,
                originalWordCount: currentWordCount,
                completionWordCount: completion.split(' ').length,
                timestamp: new Date().toISOString(),
                source: 'ai_generated'
            });
        }

        // Fallback completion
        const safeCompletion = "Through their courage, kindness, and friendship, they discovered that the greatest adventures come from helping others and working together. They learned valuable lessons and lived happily, ready for whatever wonderful adventure might come next! 🌟";

        res.json({
            success: true,
            completion: safeCompletion,
            timestamp: new Date().toISOString(),
            source: 'template'
        });

    } catch (error) {
        console.error('Story Completion Error:', error);
        const safeCompletion = "And they all lived happily ever after, having learned that friendship and kindness can overcome any challenge! 🌟";
        res.json({
            success: true,
            completion: safeCompletion,
            timestamp: new Date().toISOString(),
            source: 'fallback'
        });
    }
};

exports.evaluateStory = async (req, res) => {
    try {
        const { storyText, proppStructure } = req.body;

        if (geminiModel) {
            const prompt = `You are analyzing a family-friendly story created by a young writer using Propp's narrative functions. Provide constructive, encouraging feedback.

STORY: "${storyText}"
PROPP STRUCTURE USED: ${proppStructure?.join(', ') || 'Not specified'}

Provide analysis in this JSON format:
{
  "strengths": ["list 2-3 specific story strengths - be encouraging"],
  "improvements": ["list 1-2 gentle suggestions for enhancement"],
  "proppAnalysis": "How well the story uses narrative structure - be positive",
  "overallRating": "4 or 5",
  "encouragement": "Highly positive, motivating message about their storytelling"
}

Focus on celebrating creativity while providing gentle guidance. Respond with only the JSON:`;

            const response = await geminiModel.generateContent(prompt);
            const aiText = await response.response.text();

            try {
                const cleanResponse = aiText.replace(/```json|```/g, '').trim();
                const analysis = JSON.parse(cleanResponse);

                return res.json({
                    success: true,
                    analysis: analysis,
                    wordCount: storyText.split(' ').length,
                    timestamp: new Date().toISOString(),
                    source: 'ai_analysis'
                });
            } catch (parseError) {
                throw new Error('Failed to parse AI response');
            }
        }

        // Fallback analysis
        const fallbackAnalysis = {
            strengths: [
                "Wonderful creativity and imagination in your storytelling!",
                "Great use of story elements to create an engaging narrative!",
                "Your characters show real heart and personality!"
            ],
            improvements: [
                "Consider adding more descriptive details to help readers picture the scenes",
                "Try showing more of your characters' feelings and emotions"
            ],
            proppAnalysis: "Your story demonstrates excellent understanding of narrative structure and creates an engaging, positive tale that readers will love!",
            overallRating: "4",
            encouragement: "Amazing work! You're a talented storyteller who creates wonderful, positive stories. Keep writing and let your imagination soar! 🌟"
        };

        res.json({
            success: true,
            analysis: fallbackAnalysis,
            wordCount: storyText.split(' ').length,
            timestamp: new Date().toISOString(),
            source: 'template_analysis'
        });

    } catch (error) {
        console.error('Story Evaluation Error:', error);

        const safeAnalysis = {
            strengths: ["Excellent creativity and imagination!", "Wonderful storytelling effort!", "Positive and uplifting narrative!"],
            improvements: ["Keep practicing your amazing writing skills!", "Continue exploring new story ideas!"],
            proppAnalysis: "Your story shows great potential and wonderful use of storytelling techniques!",
            overallRating: "4",
            encouragement: "You're doing fantastic work! Your creativity and storytelling skills are wonderful. Keep writing amazing stories! 🌟"
        };

        res.json({
            success: true,
            analysis: safeAnalysis,
            wordCount: req.body.storyText?.split(' ').length || 0,
            timestamp: new Date().toISOString(),
            source: 'fallback_analysis'
        });
    }
};

exports.explainProppFunction = async (req, res) => {
    try {
        const { functionId, context } = req.body;
        const sceneData = PROPP_KNOWLEDGE_DATABASE[functionId];

        if (!sceneData) {
            return res.status(404).json({
                success: false,
                error: 'Propp function not found'
            });
        }

        let explanation;

        if (geminiModel && context) {
            try {
                const prompt = `Explain Propp's narrative function "${sceneData.name}" for young writers.

Function: ${sceneData.name} - ${sceneData.description}
Context: ${context}

Provide a friendly, educational explanation (2-3 sentences) that:
1. Is easy for children to understand
2. Focuses on positive, family-friendly applications
3. Gives a concrete example
4. Encourages creativity

Response:`;

                const response = await geminiModel.generateContent(prompt);
                explanation = await response.response.text();
            } catch (aiError) {
                explanation = getKnowledgeBaseExplanation(sceneData);
            }
        } else {
            explanation = getKnowledgeBaseExplanation(sceneData);
        }

        res.json({
            success: true,
            function: {
                id: functionId,
                name: sceneData.name,
                shortName: sceneData.shortName,
                emoji: sceneData.emoji,
                description: sceneData.description
            },
            explanation: explanation,
            examples: sceneData.species || [],
            timestamp: new Date().toISOString(),
            source: geminiModel && context ? 'ai_explanation' : 'knowledge_base'
        });

    } catch (error) {
        console.error('Function Explanation Error:', error);

        const safeExplanations = {
            0: "The Initial Situation sets up your story world and introduces your hero. It's like the beginning of a great adventure where we meet the main character!",
            8: "Villainy introduces a problem or challenge that your hero needs to solve. This creates excitement and gives your hero a chance to show their courage and kindness!",
            18: "Victory is when your hero overcomes the challenge through bravery, kindness, or cleverness. It's the exciting moment when good triumphs!",
            31: "Reward is the happy ending where your hero receives recognition for their good deeds. It shows that kindness and courage are always rewarded!"
        };

        res.json({
            success: true,
            explanation: safeExplanations[req.body.functionId] || "This narrative function helps create engaging, positive stories that readers love!",
            timestamp: new Date().toISOString(),
            source: 'fallback_explanation'
        });
    }
};

function getKnowledgeBaseExplanation(sceneData) {
    const randomResponse = sceneData.responses[Math.floor(Math.random() * sceneData.responses.length)];
    const randomTip = sceneData.tips[Math.floor(Math.random() * sceneData.tips.length)];

    return `${sceneData.name}: ${randomResponse} Pro tip: ${randomTip}`;
}

// Health check endpoint for testing
exports.healthCheck = (req, res) => {
    res.json({
        success: true,
        message: 'AI Controller is running with enhanced knowledge database',
        features: {
            geminiAI: !!geminiModel,
            knowledgeDatabase: true,
            proppFunctions: Object.keys(PROPP_KNOWLEDGE_DATABASE).length
        },
        timestamp: new Date().toISOString()
    });
};

console.log('✅ Enhanced AI Controller loaded with comprehensive knowledge database');
// Note: Ensure to handle the case where Google Gemini is not initialized
if (!genAI) {
    console.warn('⚠️ Google Gemini not initialized. Some AI features will be limited to knowledge database responses.');
}
// This allows the application to run without Gemini while still providing useful responses from the knowledge database.
// This file is now ready to be used in the backend with enhanced AI capabilities and a comprehensive knowledge database.
module.exports = {
    handleChat: exports.handleChat,
    generateSuggestions: exports.generateSuggestions,
    generateTitle: exports.generateTitle,
    completeStory: exports.completeStory,
    evaluateStory: exports.evaluateStory,
    explainProppFunction: exports.explainProppFunction,
    healthCheck: exports.healthCheck
};
// Ensure to export all functions for use in routes
// This file is now ready to be used in the backend with enhanced AI capabilities and a comprehensive knowledge database.