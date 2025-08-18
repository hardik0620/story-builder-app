// src/services/api.js 
const API_BASE_URL = process.env.REACT_APP_API_URL + "/api" || 'http://localhost:5002/api';

class ApiService {
    constructor() {
        this.requestId = 0;
    }

    getSceneContextHint(sceneId) {
        const hints = {
            0: "This is where we meet the hero and learn about their normal life before the adventure",
            8: "Something bad happens or a problem appears that the hero needs to solve",
            11: "The hero leaves their safe place and starts their journey or quest",
            14: "The hero gets help - maybe a magical item, wise advice, or a helpful friend",
            18: "The hero wins! They defeat the bad guy or solve the problem",
            31: "The happy ending where the hero gets rewarded for being brave and good"
        };
        return hints[sceneId] || "An important part of the story where the hero grows or learns";
    }

    // Helper method for making requests with better error handling
    async makeRequest(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const requestId = ++this.requestId;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Request-ID': requestId.toString(),
                ...options.headers,
            },
            ...options,
        };

        try {
            console.log(`🌐 API Request #${requestId}: ${config.method || 'GET'} ${url}`);

            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                console.error(`❌ API Error #${requestId}:`, data);
                throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            console.log(`✅ API Success #${requestId}:`, data);
            return data;
        } catch (error) {
            console.error(`🚨 API Request #${requestId} failed:`, error);
            throw error;
        }
    }

    async checkHealth() {
        return this.makeRequest('/healthCheck', {
            method: 'POST'
        });
    }

    // AI Chat with Story Wizard with better context
    async chatWithWizard(message, currentStep = 0, storyData = {}) {
        const enhancedStoryData = {
            ...storyData,
            currentSceneName: storyData.elementOrder?.[0]?.name || 'Beginning',
            totalWords: storyData.storyParts?.reduce((acc, part) => acc + part.text.split(' ').length, 0) || 0,
            elementsUsed: storyData.selectedElements?.map(el => el.shortName).join(', ') || 'None selected',
            storyStructure: storyData.elementOrder?.map(el => el.shortName).join(' → ') || 'Not arranged'
        };

        return this.makeRequest('/ai/chat', {
            method: 'POST',
            body: JSON.stringify({
                message,
                currentStep,
                storyData: enhancedStoryData,
                timestamp: new Date().toISOString()
            }),
        });
    }

    // Helper function to provide context hints for scenes
    getSceneContextHint(sceneId) {
        const hints = {
            0: "This is where we meet the hero and learn about their normal life before the adventure",
            8: "Something bad happens or a problem appears that the hero needs to solve",
            11: "The hero leaves their safe place and starts their journey or quest",
            14: "The hero gets help - maybe a magical item, wise advice, or a helpful friend",
            18: "The hero wins! They defeat the bad guy or solve the problem",
            31: "The happy ending where the hero gets rewarded for being brave and good"
        };
        return hints[sceneId] || "An important part of the story where the hero grows or learns";
    }

    // Generate suggestion with complete story context
    async generateSuggestions(currentScene, currentSceneContent = '', storyTheme = '', userInput = '', previousScenes = '') {
        const enhancedContext = {
            currentScene: {
                ...currentScene,
                contextHint: this.getSceneContextHint(currentScene.id)
            },
            previousScenes,         
            currentSceneContent,    
            storyTheme,
            storySoFar: userInput,
            requestType: 'single_suggestion',
            timestamp: new Date().toISOString()
        };

        return this.makeRequest('/ai/suggestions', {
            method: 'POST',
            body: JSON.stringify(enhancedContext)
        });
    }

    async completeStory(storyParts, targetLength = 500) {
        const enhancedRequest = {
            storyParts: storyParts.map(part => ({
                text: part.text,
                type: part.type,
                sceneIndex: part.sceneIndex
            })),
            targetLength,
            currentWordCount: storyParts.reduce((acc, part) => acc + part.text.split(' ').length, 0),
            timestamp: new Date().toISOString()
        };

        return this.makeRequest('/ai/complete-story', {
            method: 'POST',
            body: JSON.stringify(enhancedRequest),
        });
    }

    // Evaluate story with comprehensive analysis
    async evaluateStory(storyText, proppStructure = []) {
        const enhancedRequest = {
            storyText,
            proppStructure: proppStructure.map(el => el.shortName),
            wordCount: storyText.split(' ').length,
            timestamp: new Date().toISOString()
        };

        return this.makeRequest('/ai/evaluate-story', {
            method: 'POST',
            body: JSON.stringify(enhancedRequest),
        });
    }

    async explainProppFunction(functionId, context = '') {
        return this.makeRequest('/ai/explain-function', {
            method: 'POST',
            body: JSON.stringify({
                functionId,
                context,
                timestamp: new Date().toISOString()
            }),
        });
    }

    async getProppFunctions() {
        return this.makeRequest('/stories/propp-functions');
    }

    async getStoryThemes() {
        return this.makeRequest('/stories/themes');
    }

    async generateTitles(theme) {
        if (!theme) {
            throw new Error('Theme is required for title generation');
        }
        console.log('🔍 Generating title for theme:', theme);
        console.log('this', this)
        return this.makeRequest('/generate-title', {
            method: 'POST',
            body: JSON.stringify({ theme }),
        });
    }

    async saveStory(title, content, theme = '', proppElements = [], additionalData = {}) {
        const enhancedStoryData = {
            title,
            content,
            theme,
            proppElements,
            wordCount: content.split(' ').length,
            createdAt: new Date().toISOString(),
            ...additionalData
        };

        return this.makeRequest('/stories/save', {
            method: 'POST',
            body: JSON.stringify(enhancedStoryData),
        });
    }

    async getUserProfile() {
        return this.makeRequest('/users/profile');
    }

    async updateUserPreferences(preferences) {
        return this.makeRequest('/users/preferences', {
            method: 'PUT',
            body: JSON.stringify(preferences),
        });
    }

    async getUserStats() {
        return this.makeRequest('/users/stats');
    }

    async testAI() {
        return this.makeRequest('/ai/test');
    }

    // Analyze English quality using Gemini
    async analyzeEnglishQuality(storyText) {
        return this.makeRequest('/quality/analyze', {
            method: 'POST',
            body: JSON.stringify({ storyText }),
        });
    }

    // Enhanced error handling with retry logic and exponential backoff
    async makeRequestWithRetry(endpoint, options = {}, maxRetries = 3) {
        let lastError;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await this.makeRequest(endpoint, options);
            } catch (error) {
                lastError = error;
                console.warn(`🔄 API Request attempt ${attempt}/${maxRetries} failed:`, error.message);

                if (error.message.includes('HTTP 4') && !error.message.includes('HTTP 429')) {
                    break;
                }
                if (attempt < maxRetries) {
                    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                    console.log(`⏳ Waiting ${delay}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError;
    }

    // Contextual story assistance
    async getContextualHelp(userMessage, storyData, currentScene) {
        const helpRequest = {
            userMessage,
            context: {
                theme: storyData.theme,
                currentScene: currentScene ? {
                    id: currentScene.id,
                    name: currentScene.name,
                    description: currentScene.description
                } : null,
                storyProgress: {
                    elementsSelected: storyData.selectedElements?.length || 0,
                    wordsWritten: storyData.storyParts?.reduce((acc, part) => acc + part.text.split(' ').length, 0) || 0,
                    scenesCompleted: storyData.storyParts?.map(p => p.sceneIndex).filter((v, i, a) => a.indexOf(v) === i).length || 0
                },
                recentText: storyData.storyParts?.slice(-3).map(p => p.text).join(' ').slice(-200) || ''
            },
            timestamp: new Date().toISOString()
        };

        return this.makeRequest('/ai/contextual-help', {
            method: 'POST',
            body: JSON.stringify(helpRequest),
        });
    }

    // Smart suggestion generation with learning
    async getSmartSuggestion(context) {
        const smartRequest = {
            ...context,
            requestId: ++this.requestId,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        return this.makeRequest('/ai/smart-suggestion', {
            method: 'POST',
            body: JSON.stringify(smartRequest),
        });
    }

    async checkConnectionQuality() {
        const startTime = Date.now();
        try {
            await this.checkHealth();
            const endTime = Date.now();
            const latency = endTime - startTime;

            return {
                connected: true,
                latency,
                quality: latency < 500 ? 'excellent' : latency < 1000 ? 'good' : latency < 2000 ? 'fair' : 'poor'
            };
        } catch (error) {
            return {
                connected: false,
                error: error.message,
                quality: 'disconnected'
            };
        }
    }

    clearCache() {
        console.log('🧹 API cache cleared');
        this.requestId = 0;
    }

    getDiagnostics() {
        return {
            apiBaseUrl: API_BASE_URL,
            requestCount: this.requestId,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
    }
}

const apiService = new ApiService();

export default apiService;

export const {
    checkHealth,
    chatWithWizard,
    generateSuggestions,
    generateTitles,
    completeStory,
    evaluateStory,
    explainProppFunction,
    getProppFunctions,
    getStoryThemes,
    saveStory,
    getUserProfile,
    updateUserPreferences,
    getUserStats,
    testAI,
    analyzeEnglishQuality,
    makeRequestWithRetry,
    getContextualHelp,
    getSmartSuggestion,
    checkConnectionQuality,
    clearCache,
    getDiagnostics
} = apiService
