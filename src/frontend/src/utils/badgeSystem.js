// Badge System
export const badges = {
    WORDSMITH: {
        id: 'wordsmith',
        title: '🎨 Wordsmith',
        description: 'Created a story with more than 1000 words',
        condition: (stats) => stats.totalWords >= 1000
    },
    QUICK_WRITER: {
        id: 'quick_writer',
        title: '⚡ Speed Demon',
        description: 'Completed the story in less than 30 minutes',
        condition: (stats) => stats.timeSpent <= 30
    },
    CREATIVE_GENIUS: {
        id: 'creative_genius',
        title: '🌟 Creative Genius',
        description: 'Used more than 80% original content',
        condition: (stats) => stats.userPercentage >= 80
    },
    AI_COLLABORATOR: {
        id: 'ai_collaborator',
        title: '🤖 AI Companion',
        description: 'Used AI suggestions wisely (5-15 times)',
        condition: (stats) => stats.aiSuggestions >= 5 && stats.aiSuggestions <= 15
    },
    BALANCED_WRITER: {
        id: 'balanced_writer',
        title: '⚖️ Balanced Writer',
        description: 'Maintained a good balance between original content and AI suggestions',
        condition: (stats) => stats.userPercentage >= 40 && stats.userPercentage <= 60
    },
    MASTER_STORYTELLER: {
        id: 'master_storyteller',
        title: '👑 Master Storyteller',
        description: 'Created a story with excellent English quality',
        condition: (stats) => stats.englishQuality >= 90
    }
};

export const calculateEarnedBadges = (stats) => {
    return Object.values(badges).filter(badge => badge.condition(stats));
};

export const analyzeEnglishQuality = (text) => {
    // Basic English quality analysis (this is a simplified version)
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.split(/\s+/).filter(Boolean);

    // Average sentence length (ideal is between 15-20 words)
    const avgSentenceLength = words.length / sentences.length;
    const sentenceLengthScore = Math.min(100, 100 - Math.abs(17.5 - avgSentenceLength) * 5);

    // Vocabulary diversity (unique words ratio)
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const vocabularyScore = Math.min(100, (uniqueWords.size / words.length) * 200);

    // Final score (weighted average)
    const finalScore = Math.round((sentenceLengthScore * 0.4 + vocabularyScore * 0.6));

    return {
        score: finalScore,
        details: {
            avgSentenceLength,
            vocabularyDiversity: (uniqueWords.size / words.length) * 100
        }
    };
};
