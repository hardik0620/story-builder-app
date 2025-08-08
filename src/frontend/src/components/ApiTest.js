// frontend/src/components/ApiTest.js
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ApiTest = () => {
    const [connectionStatus, setConnectionStatus] = useState('checking');
    const [backendData, setBackendData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        testConnection();
    }, []);

    const testConnection = async () => {
        try {
            setConnectionStatus('checking');
            setError(null);

            // Test health endpoint
            const healthResponse = await apiService.checkHealth();
            console.log('Health check:', healthResponse);

            // Test Propp functions
            const proppResponse = await apiService.getProppFunctions();
            console.log('Propp functions:', proppResponse);

            // Test themes
            const themesResponse = await apiService.getStoryThemes();
            console.log('Themes:', themesResponse);

            setBackendData({
                health: healthResponse,
                proppFunctionsCount: proppResponse.total,
                themesCount: themesResponse.themes.length,
                sampleThemes: themesResponse.themes.slice(0, 3)
            });

            setConnectionStatus('connected');
        } catch (error) {
            console.error('Connection test failed:', error);
            setError(error.message);
            setConnectionStatus('failed');
        }
    };

    const testAIEndpoint = async () => {
        try {
            const response = await apiService.testAI();
            alert(`AI Test Response: ${JSON.stringify(response)}`);
        } catch (error) {
            alert(`AI Test Failed: ${error.message}`);
        }
    };

    const testChatWizard = async () => {
        try {
            const response = await apiService.chatWithWizard(
                "Hello! I want to create a fantasy story.",
                1,
                { theme: 'fantasy', title: 'Test Story' }
            );
            alert(`Chat Response: ${response.response || 'No response'}`);
        } catch (error) {
            alert(`Chat Test Failed: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', margin: '20px', border: '2px solid #ddd', borderRadius: '8px' }}>
            <h2>🔗 Backend Connection Test</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Connection Status:
                    <span style={{
                        color: connectionStatus === 'connected' ? 'green' :
                            connectionStatus === 'failed' ? 'red' : 'orange',
                        marginLeft: '10px'
                    }}>
                        {connectionStatus === 'connected' ? '✅ Connected' :
                            connectionStatus === 'failed' ? '❌ Failed' : '🔄 Checking...'}
                    </span>
                </h3>

                {error && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>

            {backendData && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>📊 Backend Data Retrieved:</h3>
                    <ul>
                        <li><strong>Server Status:</strong> {backendData.health.status}</li>
                        <li><strong>Environment:</strong> {backendData.health.environment}</li>
                        <li><strong>Propp Functions Available:</strong> {backendData.proppFunctionsCount}</li>
                        <li><strong>Story Themes Available:</strong> {backendData.themesCount}</li>
                        <li><strong>Sample Themes:</strong> {backendData.sampleThemes.map(t => t.name).join(', ')}</li>
                    </ul>
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                    onClick={testConnection}
                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    🔄 Test Connection
                </button>

                <button
                    onClick={testAIEndpoint}
                    style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    🤖 Test AI Endpoint
                </button>

                <button
                    onClick={testChatWizard}
                    style={{ padding: '10px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    💬 Test Chat Wizard
                </button>
            </div>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <strong>Backend URL:</strong> http://localhost:5001/api<br />
                <strong>Last Updated:</strong> {new Date().toLocaleTimeString()}
            </div>
        </div>
    );
};

export default ApiTest;