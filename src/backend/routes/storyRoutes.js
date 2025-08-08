// backend/routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

console.log('📚 Loading story routes...');

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

// Get all Propp functions
router.get('/propp-functions', (req, res) => {
    const PROPP_FUNCTIONS = [
        {
            id: 0,
            name: "Initial Situation",
            shortName: "Initial",
            emoji: "🏠",
            description: "The initial situation where characters are introduced and the setting is established",
            species: ["Once upon a time in a peaceful village", "Long ago in a faraway kingdom", "In a small town where everyone knew each other"]
        },
        {
            id: 1,
            name: "Absence",
            shortName: "Absence",
            emoji: "🚪",
            description: "A family member or important character leaves or is absent",
            species: ["The parents go on a journey", "The wise mentor disappears", "The protector leaves the village"]
        },
        {
            id: 2,
            name: "Interdiction",
            shortName: "Interdiction",
            emoji: "⚠️",
            description: "An order, warning, or prohibition is given to the hero",
            species: ["Don't go into the dark forest", "Never open the forbidden door", "Stay away from the haunted castle"]
        },
        {
            id: 3,
            name: "Violation",
            shortName: "Violation",
            emoji: "🚫",
            description: "The interdiction or warning is violated",
            species: ["Curiosity leads the hero to the forbidden place", "The warning is ignored", "Rules are broken for good reasons"]
        },
        {
            id: 4,
            name: "Reconnaissance",
            shortName: "Reconnaissance",
            emoji: "🔍",
            description: "The villain attempts to gain information about the hero",
            species: ["A stranger asks suspicious questions", "Someone spies on the hero", "Evil forces gather information"]
        },
        {
            id: 5,
            name: "Delivery",
            shortName: "Delivery",
            emoji: "📨",
            description: "Information about the hero is delivered to the villain",
            species: ["The spy reports back", "Secrets are revealed", "The villain learns the hero's weakness"]
        },
        {
            id: 6,
            name: "Trickery",
            shortName: "Trickery",
            emoji: "🎭",
            description: "The villain attempts to deceive the hero",
            species: ["A disguised villain offers help", "False promises are made", "The hero is tricked by appearances"]
        },
        {
            id: 7,
            name: "Complicity",
            shortName: "Complicity",
            emoji: "🤝",
            description: "The hero is deceived and unknowingly helps the villain",
            species: ["The hero trusts the wrong person", "Good intentions lead to trouble", "The hero is manipulated"]
        },
        {
            id: 8,
            name: "Villainy",
            shortName: "Villainy",
            emoji: "⚔️",
            description: "The villain causes harm, creates a problem, or commits evil acts",
            species: ["The villain kidnaps someone important", "A curse is cast on the land", "Evil creatures attack the village"]
        },
        {
            id: 8.1,
            name: "Lack",
            shortName: "Lack",
            emoji: "❓",
            description: "Something important is missing or lacking",
            species: ["A magical item is lost", "The kingdom lacks a true ruler", "Important knowledge is missing"]
        },
        {
            id: 9,
            name: "Mediation",
            shortName: "Mediation",
            emoji: "📢",
            description: "The misfortune or lack is made known; the hero is approached for help",
            species: ["A messenger brings news of trouble", "The hero learns about the problem", "A call for help reaches the hero"]
        },
        {
            id: 10,
            name: "Counteraction",
            shortName: "Counteraction",
            emoji: "⚡",
            description: "The hero decides to act and counteract the misfortune",
            species: ["The hero accepts the quest", "A decision is made to help", "The hero chooses to fight evil"]
        },
        {
            id: 11,
            name: "Departure",
            shortName: "Departure",
            emoji: "🗺️",
            description: "The hero leaves home and begins the journey",
            species: ["The quest begins with the first step", "Leaving familiar places behind", "Starting the adventure into the unknown"]
        },
        {
            id: 12,
            name: "Test",
            shortName: "Test",
            emoji: "🎯",
            description: "The hero is tested, interrogated, or challenged by a magical being",
            species: ["A wise old person asks riddles", "Magical creatures test the hero's worth", "Challenges must be overcome"]
        },
        {
            id: 13,
            name: "Reaction",
            shortName: "Reaction",
            emoji: "⭐",
            description: "The hero reacts to the test or challenge",
            species: ["The hero shows kindness to strangers", "Courage is displayed in danger", "Wisdom guides the right choice"]
        },
        {
            id: 14,
            name: "Receipt",
            shortName: "Receipt",
            emoji: "🎁",
            description: "The hero receives a magical agent, helper, or special item",
            species: ["A magical sword is given", "A wise companion joins the quest", "Special powers are granted"]
        },
        {
            id: 15,
            name: "Arrival",
            shortName: "Arrival",
            emoji: "🎯",
            description: "The hero arrives at the destination or location of the quest object",
            species: ["Reaching the villain's castle", "Finding the hidden treasure location", "Arriving at the place of danger"]
        },
        {
            id: 16,
            name: "Struggle",
            shortName: "Struggle",
            emoji: "⚔️",
            description: "The hero and villain engage in direct combat or competition",
            species: ["An epic battle begins", "A contest of wills", "Fighting against overwhelming odds"]
        },
        {
            id: 17,
            name: "Branding",
            shortName: "Branding",
            emoji: "🏷️",
            description: "The hero is marked, branded, or wounded during the struggle",
            species: ["A scar tells the story of courage", "The hero bears marks of the battle", "Proof of the encounter remains"]
        },
        {
            id: 18,
            name: "Victory",
            shortName: "Victory",
            emoji: "🏆",
            description: "The villain is defeated and evil is overcome",
            species: ["Good triumphs over evil", "The dark power is broken", "Victory comes through courage and friendship"]
        },
        {
            id: 19,
            name: "Liquidation",
            shortName: "Liquidation",
            emoji: "✅",
            description: "The initial misfortune or lack is resolved",
            species: ["The curse is broken", "What was lost is found", "Peace returns to the land"]
        },
        {
            id: 20,
            name: "Return",
            shortName: "Return",
            emoji: "🔄",
            description: "The hero sets out to return home",
            species: ["The journey home begins", "Heading back with success", "The adventure's end approaches"]
        },
        {
            id: 21,
            name: "Pursuit",
            shortName: "Pursuit",
            emoji: "🏃",
            description: "The hero is pursued by enemies or dangers",
            species: ["Enemies give chase", "Danger follows close behind", "The escape becomes urgent"]
        },
        {
            id: 22,
            name: "Escape",
            shortName: "Escape",
            emoji: "🛡️",
            description: "The hero escapes from pursuit",
            species: ["A clever escape plan works", "Magic helps avoid capture", "Quick thinking saves the day"]
        },
        {
            id: 23,
            name: "Unrecognised Arrival",
            shortName: "Unrecognised",
            emoji: "👤",
            description: "The hero arrives home or at court unrecognized",
            species: ["No one recognizes the changed hero", "Disguised return home", "The hero's transformation is complete"]
        },
        {
            id: 24,
            name: "Unfounded Claims",
            shortName: "False Claims",
            emoji: "🎪",
            description: "A false hero presents unfounded claims or pretends to be the real hero",
            species: ["An impostor takes credit", "False claims of heroism", "Someone lies about their deeds"]
        },
        {
            id: 25,
            name: "Difficult Task",
            shortName: "Task",
            emoji: "🏔️",
            description: "A difficult task or challenge is proposed to the hero",
            species: ["An impossible task is given", "A final test of worth", "One last challenge to prove heroism"]
        },
        {
            id: 26,
            name: "Solution",
            shortName: "Solution",
            emoji: "🎯",
            description: "The task is accomplished and the challenge is met",
            species: ["The impossible becomes possible", "Wisdom finds the solution", "True heroism shines through"]
        },
        {
            id: 27,
            name: "Recognition",
            shortName: "Recognition",
            emoji: "👁️",
            description: "The hero is recognized as the true hero",
            species: ["The real hero is revealed", "Truth comes to light", "Recognition of true worth"]
        },
        {
            id: 28,
            name: "Exposure",
            shortName: "Exposure",
            emoji: "🔦",
            description: "The false hero or villain is exposed and their lies revealed",
            species: ["The impostor is revealed", "Lies are exposed", "Truth defeats deception"]
        },
        {
            id: 29,
            name: "Transfiguration",
            shortName: "Transfiguration",
            emoji: "✨",
            description: "The hero is given a new appearance, status, or magical transformation",
            species: ["The hero receives royal garments", "A magical transformation occurs", "New powers are granted"]
        },
        {
            id: 30,
            name: "Punishment",
            shortName: "Punishment",
            emoji: "⚖️",
            description: "The villain or false hero is punished for their crimes",
            species: ["Justice is served", "Evil receives its due punishment", "The wrongdoers face consequences"]
        },
        {
            id: 31,
            name: "Reward",
            shortName: "Reward",
            emoji: "👑",
            description: "The hero is rewarded and often marries and rules",
            species: ["The hero is crowned", "Great rewards are given", "And they lived happily ever after"]
        }
    ];

    res.json({
        success: true,
        functions: PROPP_FUNCTIONS,
        total: PROPP_FUNCTIONS.length
    });
});

// Save story (for future database integration)
router.post('/save', [
    body('title')
        .isString()
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    body('content')
        .isString()
        .trim()
        .isLength({ min: 10, max: 50000 })
        .withMessage('Content must be between 10 and 50000 characters'),
    body('theme')
        .optional()
        .isString()
        .withMessage('Theme must be a string'),
    body('proppElements')
        .optional()
        .isArray()
        .withMessage('Propp elements must be an array'),
], handleValidationErrors, (req, res) => {
    // For now, just return success (later connect to database)
    const { title, content, theme, proppElements } = req.body;

    const storyId = Date.now().toString(); // Simple ID generation

    res.json({
        success: true,
        message: 'Story saved successfully',
        storyId: storyId,
        story: {
            id: storyId,
            title,
            content,
            theme,
            proppElements,
            createdAt: new Date().toISOString()
        }
    });
});

// Get story themes - UPDATED to match frontend exactly
router.get('/themes', (req, res) => {
    const themes = [
        { id: 'fantasy', name: 'Fantasy Kingdom', emoji: '🏰', description: 'Magic, mythical creatures, and enchanted kingdoms' },
        { id: 'adventure', name: 'Epic Adventure', emoji: '🗺️', description: 'Exciting journeys and thrilling quests' },
        { id: 'mystery', name: 'Mystery Solver', emoji: '🔍', description: 'Puzzles, secrets, and detective work' },
        { id: 'animals', name: 'Animal Friends', emoji: '🐾', description: 'Stories about animal companions and wildlife adventures' },
        { id: 'friendship', name: 'Friendship Magic', emoji: '👫', description: 'Tales of friendship, teamwork, and caring for others' },
        { id: 'space', name: 'Space Explorer', emoji: '🚀', description: 'Cosmic adventures and space exploration' },
        { id: 'underwater', name: 'Ocean Adventure', emoji: '🌊', description: 'Underwater worlds and marine adventures' },
        { id: 'superhero', name: 'Superhero Stories', emoji: '🦸‍♀️', description: 'Heroes with special powers saving the day' },
        { id: 'pirate', name: 'Pirate Adventures', emoji: '🏴‍☠️', description: 'High seas adventures and treasure hunts' },
        { id: 'fairytale', name: 'Fairy Tale Magic', emoji: '🧚‍♀️', description: 'Classic fairy tale elements with magical twists' },
        { id: 'robot', name: 'Robot Friends', emoji: '🤖', description: 'Stories about robots, AI, and technological companions' },
        { id: 'dinosaur', name: 'Dinosaur World', emoji: '🦕', description: 'Prehistoric adventures with dinosaurs' },
        { id: 'magic_school', name: 'Magic School', emoji: '🎓', description: 'Learning magic and spells at enchanted academies' },
        { id: 'time_travel', name: 'Time Travel', emoji: '⏰', description: 'Adventures across different time periods' },
        { id: 'jungle', name: 'Jungle Adventure', emoji: '🌴', description: 'Tropical rainforest expeditions and discoveries' },
        { id: 'winter', name: 'Winter Wonderland', emoji: '❄️', description: 'Snowy adventures and winter magic' },
        { id: 'sports', name: 'Sports Heroes', emoji: '⚽', description: 'Athletic competitions and sportsmanship stories' },
        { id: 'music', name: 'Musical Journey', emoji: '🎵', description: 'Musical adventures and rhythm-based tales' }
    ];

    res.json({
        success: true,
        themes: themes,
        total: themes.length
    });
});

console.log('✅ Story routes configured successfully');

module.exports = router;