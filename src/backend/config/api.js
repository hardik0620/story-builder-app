// backend/config/api.js
const OpenAI = require('openai');

// Initialize OpenAI client
let openaiClient = null;

if (process.env.GOOGLE_GEMINI_API_KEY) {
    // Initialize Gemini client here if you have a Gemini SDK
    // Example: geminiClient = new Gemini({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });
    // For now, just store the API key
    openaiClient = { apiKey: process.env.GOOGLE_GEMINI_API_KEY };
} else {
    console.warn('⚠️  Google Gemini API key not found. AI features will not work.');
}

// API configuration
const API_CONFIG = {
    openai: {
        model: 'gpt-3.5-turbo',
        maxTokens: {
            chat: 200,
            suggestions: 300,
            titles: 150,
            completion: 800,
            evaluation: 400,
            explanation: 200
        },
        temperature: {
            chat: 0.8,
            suggestions: 0.9,
            titles: 0.9,
            completion: 0.7,
            evaluation: 0.7,
            explanation: 0.7
        }
    },
    rateLimits: {
        ai: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 50 // 50 requests per window
        },
        general: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // 100 requests per window
        }
    },
    validation: {
        maxMessageLength: 1000,
        maxStoryLength: 50000,
        maxTitleLength: 200,
        minStoryLength: 10
    }
};

// Helper function to check if OpenAI is available
const isOpenAIAvailable = () => {
    return openaiClient !== null;
};

// Helper function to get OpenAI client
const getOpenAIClient = () => {
    if (!openaiClient) {
        throw new Error('OpenAI client not initialized. Please check your API key.');
    }
    return openaiClient;
};

module.exports = {
    openaiClient,
    API_CONFIG,
    isOpenAIAvailable,
    getOpenAIClient
};