// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

console.log('👤 Loading user routes...');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

// Get user profile (placeholder for future authentication)
router.get('/profile', (req, res) => {
    // For now, return a default user profile
    res.json({
        success: true,
        user: {
            id: 'guest',
            name: 'Story Creator',
            storiesCreated: 0,
            favoriteTheme: 'fantasy',
            joinedAt: new Date().toISOString()
        }
    });
});

// Update user preferences
router.put('/preferences', [
    body('favoriteTheme')
        .optional()
        .isString()
        .withMessage('Favorite theme must be a string'),
    body('writingLevel')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Writing level must be beginner, intermediate, or advanced'),
    body('aiAssistanceLevel')
        .optional()
        .isIn(['minimal', 'moderate', 'extensive'])
        .withMessage('AI assistance level must be minimal, moderate, or extensive'),
], handleValidationErrors, (req, res) => {
    const { favoriteTheme, writingLevel, aiAssistanceLevel } = req.body;

    // For now, just return success (later save to database)
    res.json({
        success: true,
        message: 'Preferences updated successfully',
        preferences: {
            favoriteTheme,
            writingLevel,
            aiAssistanceLevel,
            updatedAt: new Date().toISOString()
        }
    });
});

// Get user statistics
router.get('/stats', (req, res) => {
    // Placeholder statistics
    res.json({
        success: true,
        stats: {
            storiesCreated: 0,
            wordsWritten: 0,
            proppFunctionsUsed: 0,
            favoriteGenre: 'fantasy',
            averageStoryLength: 0,
            creativeStreak: 0,
            lastActiveDate: new Date().toISOString()
        }
    });
});

console.log('✅ User routes configured successfully');

module.exports = router;