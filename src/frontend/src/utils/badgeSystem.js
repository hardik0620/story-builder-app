// Badge System - Ordered by rarity (rarest to most common for display)
export const badges = {
    PERFECT_HARMONY: {
        id: 'perfect_harmony',
        title: '🌈 Perfect Harmony',
        description: 'Achieved the perfect balance: 2000+ words, excellent quality, and balanced AI collaboration',
        condition: (stats) =>
            stats.totalWords >= 2000 &&
            stats.englishQuality >= 90 &&
            stats.aiSuggestions >= 8 &&
            stats.aiSuggestions <= 12,
        rarity: 'legendary'
    },
    EPIC_WORDWEAVER: {
        id: 'epic_wordweaver',
        title: '✨ Epic Wordweaver',
        description: 'Created an epic tale: 3000+ words with consistently high quality',
        condition: (stats) =>
            stats.totalWords >= 3000 &&
            stats.englishQuality >= 88 &&
            stats.timeSpent >= 45,
        rarity: 'legendary'
    },
    CONSISTENT_VOICE: {
        id: 'consistent_voice',
        title: '🎭 Voice Master',
        description: 'Maintained consistent narrative style throughout the story',
        condition: (stats) => stats.englishQuality >= 85 && stats.totalWords >= 800,
        rarity: 'rare'
    },
    MASTER_STORYTELLER: {
        id: 'master_storyteller',
        title: '👑 Master Storyteller',
        description: 'Created a story with excellent English quality',
        condition: (stats) => stats.englishQuality >= 90,
        rarity: 'rare'
    },
    WORDSMITH: {
        id: 'wordsmith',
        title: '📝 Wordsmith',
        description: 'Created a story with more than 1000 words',
        condition: (stats) => stats.totalWords >= 1000,
        rarity: 'uncommon'
    },
    BALANCED_WRITER: {
        id: 'balanced_writer',
        title: '⚖️ Balanced Writer',
        description: 'Maintained a good balance between original content and AI suggestions',
        condition: (stats) => stats.userPercentage >= 40 && stats.userPercentage <= 60,
        rarity: 'uncommon'
    },
    QUICK_WRITER: {
        id: 'quick_writer',
        title: '⚡ Speed Demon',
        description: 'Completed the story in less than 30 minutes',
        condition: (stats) => stats.timeSpent <= 30,
        rarity: 'common'
    },
    AI_COLLABORATOR: {
        id: 'ai_collaborator',
        title: '🤖 AI Companion',
        description: 'Used AI suggestions wisely (5-15 times)',
        condition: (stats) => stats.aiSuggestions >= 5 && stats.aiSuggestions <= 15,
        rarity: 'common'
    },
    EFFORT_STAR: {
        id: 'effort_star',
        title: '⭐ Effort Star',
        description: 'Showed great effort with a quality score over 60',
        condition: (stats) => stats.englishQuality >= 60,
        rarity: 'common'
    }
};

export const calculateEarnedBadges = (stats) => {
    return Object.values(badges).filter(badge => badge.condition(stats));
};

export const analyzeEnglishQuality = async (text) => {
    try {
        // Try to use the AI-powered analysis first
        const apiService = (await import('../services/api.js')).default;
        const result = await apiService.analyzeEnglishQuality(text);

        if (result.success) {
            return {
                score: result.score,
                message: result.message,
                aiPowered: !result.fallback,
                details: {
                    source: result.fallback ? 'Basic Analysis' : 'AI Analysis',
                    timestamp: result.timestamp
                }
            };
        }
    } catch (error) {
        console.log('AI analysis failed, using basic analysis:', error.message);
    }

    // Fallback to basic analysis if AI fails
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);

    if (words.length === 0) {
        return {
            score: 30,
            message: 'Great start! Every writer begins somewhere!',
            aiPowered: false,
            details: { source: 'Basic Analysis (Fallback)' }
        };
    }

    // Average sentence length (ideal is between 15-20 words)
    const avgSentenceLength = words.length / sentences.length;
    const sentenceLengthScore = Math.min(100, 100 - Math.abs(17.5 - avgSentenceLength) * 5);

    // Vocabulary diversity (unique words ratio)
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const vocabularyScore = Math.min(100, (uniqueWords.size / words.length) * 200);

    // Final score (weighted average)
    const finalScore = Math.round((sentenceLengthScore * 0.4 + vocabularyScore * 0.6));

    return {
        score: Math.max(30, finalScore), // Minimum 30 for encouragement
        message: finalScore >= 85 ? 'Great work!' :
            finalScore >= 70 ? 'Good job!' :
                finalScore >= 50 ? 'Nice effort!' :
                    'Keep practicing!',
        aiPowered: false,
        details: {
            source: 'Basic Analysis (Fallback)',
            avgSentenceLength,
            vocabularyDiversity: (uniqueWords.size / words.length) * 100
        }
    };
};
