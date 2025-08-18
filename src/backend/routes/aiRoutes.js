// backend/routes/aiRoutes.js - Complete Updated Version
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Import controller 
let aiController;
try {
    aiController = require('../controllers/aiController');
    console.log('✅ aiController loaded successfully');
} catch (error) {
    console.error('❌ Failed to load aiController:', error.message);
    // Create fallback controller
    aiController = {
        handleChat: (req, res) => res.json({ success: false, error: 'Controller not available' }),
        generateSuggestions: (req, res) => res.json({ success: false, error: 'Controller not available' }),
        generateTitle: (req, res) => res.json({ success: false, error: 'Controller not available' }),
        completeStory: (req, res) => res.json({ success: false, error: 'Controller not available' }),
        evaluateStory: (req, res) => res.json({ success: false, error: 'Controller not available' }),
        explainProppFunction: (req, res) => res.json({ success: false, error: 'Controller not available' })
    };
}

// Validation middleware
const validateChatRequest = [
    body('message')
        .isString()
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage('Message must be between 1 and 2000 characters'),
    body('currentStep')
        .optional()
        .isInt({ min: 0, max: 6 })
        .withMessage('Current step must be between 0 and 6'),
    body('storyData')
        .optional()
        .isObject()
        .withMessage('Story data must be an object'),
];

const validateSuggestionRequest = [
    body('currentScene')
        .isObject()
        .withMessage('Current scene is required'),
    body('storyContext')
        .optional()
        .isString()
        .isLength({ max: 1000 })
        .withMessage('Story context must be a string under 1000 characters'),
    body('storyTheme')
        .optional()
        .isString()
        .isLength({ max: 50 })
        .withMessage('Story theme must be a string under 50 characters'),
];

const validateTitleRequest = [
    body('theme')
        .isString()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Theme must be between 1 and 50 characters'),
    body('selectedElements')
        .optional()
        .isArray()
        .withMessage('Selected elements must be an array'),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

// Test route to make sure router works
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'AI routes are working!',
        timestamp: new Date().toISOString(),
        endpoints: [
            'GET /test',
            'POST /chat',
            'POST /suggestions',
            'POST /generate-title',
            'POST /complete-story',
            'POST /evaluate-story',
            'POST /explain-function'
        ]
    });
});

// AI Chat endpoint
router.post('/chat', validateChatRequest, handleValidationErrors, (req, res) => {
    try {
        console.log('🧙‍♂️ AI Chat request received:', req.body)
        console.log('🧙‍♂️ AI Chat request received:', {
            messageLength: req.body.message?.length || 0,
            currentStep: req.body.currentStep,
            hasStoryData: !!req.body.storyData
        });
        aiController.handleChat(req, res);
    } catch (error) {
        console.error('Chat route error:', error);
        res.status(500).json({
            success: false,
            error: 'Chat service temporarily unavailable',
            fallback: 'I\'m having trouble connecting right now, but I\'m here to help with your story! What would you like to know about storytelling or Propp\'s functions? 🌟'
        });
    }
});

// Story suggestions endpoint
router.post('/suggestions', validateSuggestionRequest, handleValidationErrors, (req, res) => {
    try {
        console.log('💡 Story suggestions request:', {
            sceneId: req.body.currentScene?.id,
            sceneName: req.body.currentScene?.name,
            hasContext: !!req.body.storyContext,
            theme: req.body.storyTheme
        });
        aiController.generateSuggestions(req, res);
    } catch (error) {
        console.error('Suggestions route error:', error);
        res.status(500).json({
            success: false,
            error: 'Suggestions service temporarily unavailable',
            fallback: ['Try describing what your hero sees or feels in this scene.', 'Maybe something interesting happens that moves the story forward.', 'Consider how your character grows or learns something new.']
        });
    }
});

// Title generation endpoint
router.post('/generate-title', validateTitleRequest, handleValidationErrors, (req, res) => {
    try {
        console.log('🏷️ Title generation request:', {
            theme: req.body.theme,
            elementsCount: req.body.selectedElements?.length || 0
        });
        aiController.generateTitle(req, res);
    } catch (error) {
        console.error('Title generation route error:', error);
        res.status(500).json({
            success: false,
            error: 'Title generation service temporarily unavailable',
            fallback: ['The Amazing Adventure', 'A Wonderful Tale', 'The Great Journey', 'Friends Forever', 'The Magic Quest']
        });
    }
});

// Story completion endpoint
router.post('/complete-story', [
    body('storyParts')
        .isArray()
        .withMessage('Story parts must be an array'),
    body('targetLength')
        .optional()
        .isInt({ min: 50, max: 2000 })
        .withMessage('Target length must be between 50 and 2000 words'),
], handleValidationErrors, (req, res) => {
    try {
        console.log('📝 Story completion request:', {
            partsCount: req.body.storyParts?.length || 0,
            targetLength: req.body.targetLength || 500
        });
        aiController.completeStory(req, res);
    } catch (error) {
        console.error('Complete story route error:', error);
        res.status(500).json({
            success: false,
            error: 'Story completion service temporarily unavailable',
            fallback: 'And they all lived happily ever after, having learned that friendship and kindness can overcome any challenge! 🌟'
        });
    }
});

// Story evaluation endpoint
router.post('/evaluate-story', [
    body('storyText')
        .isString()
        .trim()
        .isLength({ min: 10, max: 10000 })
        .withMessage('Story text must be between 10 and 10000 characters'),
    body('proppStructure')
        .optional()
        .isArray()
        .withMessage('Propp structure must be an array'),
], handleValidationErrors, (req, res) => {
    try {
        console.log('📊 Story evaluation request:', {
            textLength: req.body.storyText?.length || 0,
            hasStructure: !!req.body.proppStructure
        });
        aiController.evaluateStory(req, res);
    } catch (error) {
        console.error('Evaluate story route error:', error);
        res.status(500).json({
            success: false,
            error: 'Story evaluation service temporarily unavailable',
            fallback: {
                strengths: ['Great creativity and imagination!', 'Wonderful storytelling effort!'],
                improvements: ['Keep practicing your amazing writing skills!'],
                overallRating: '4',
                encouragement: 'You\'re doing fantastic work! Keep writing amazing stories!'
            }
        });
    }
});

// Propp function explanation endpoint
router.post('/explain-function', [
    body('functionId')
        .isNumeric()
        .withMessage('Function ID must be a number'),
    body('context')
        .optional()
        .isString()
        .isLength({ max: 200 })
        .withMessage('Context must be a string under 200 characters'),
], handleValidationErrors, (req, res) => {
    try {
        console.log('📚 Function explanation request:', {
            functionId: req.body.functionId,
            hasContext: !!req.body.context
        });
        aiController.explainProppFunction(req, res);
    } catch (error) {
        console.error('Explain function route error:', error);
        res.status(500).json({
            success: false,
            error: 'Function explanation service temporarily unavailable',
            fallback: 'This narrative function helps create engaging, positive stories that readers love!'
        });
    }
});

// Health check for AI services
router.post('/healthCheck', (req, res) => {
    res.json({
        success: true,
        message: 'AI services are running',
        services: {
            chat: 'operational',
            suggestions: 'operational',
            titleGeneration: 'operational',
            storyCompletion: 'operational',
            evaluation: 'operational'
        },
        timestamp: new Date().toISOString()
    });
});

console.log('📝 Enhanced AI routes configured successfully with Gemini integration');

// POST /api/ai/analyze-quality - Analyze English quality using Gemini
router.post('/analyze-quality', async (req, res) => {
    try {
        const { storyText } = req.body;

        if (!storyText || storyText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Story text is required'
            });
        }

        const result = await aiController.analyzeEnglishQuality(storyText);
        res.json(result);
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
