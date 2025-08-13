// src/components/Step0Welcome.js
import React from 'react';

const Step0Welcome = ({ nextStep, showGallery }) => {
    const handleNextStep = () => {
        console.log('Next step button clicked');
        if (typeof nextStep === 'function') {
            nextStep();
        } else {
            console.error('nextStep function not provided to Step0Welcome');
            alert('Navigation function not available. Please refresh the page.');
        }
    };

    const handleShowGallery = () => {
        console.log('Gallery button clicked');
        if (typeof showGallery === 'function') {
            showGallery();
        } else {
            console.error('showGallery function not provided to Step0Welcome');
            alert('Gallery function not available yet.');
        }
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">🌟 Welcome to Story Weaver! 🌟</h1>
                <p style={{ fontSize: '1.2em', color: '#636e72', margin: 0 }}>
                    Where imagination meets technology!
                </p>
            </div>

            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <div style={{ fontSize: '4em', marginBottom: '20px' }}>📚✨🚀</div>
                <p style={{
                    fontSize: '1.1em',
                    color: '#2d3436',
                    maxWidth: '600px',
                    margin: '0 auto 30px',
                    lineHeight: '1.6'
                }}>
                    Get ready to create amazing stories with your AI writing buddy! Together, you'll build tales filled with adventure, magic, and wonder using Vladimir Propp's proven storytelling techniques.
                </p>
            </div>

            <div style={{
                background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                color: 'white',
                padding: '25px',
                borderRadius: '20px',
                border: '3px solid #333',
                margin: '30px 0',
                textAlign: 'center'
            }}>
                <h3 style={{ margin: '0 0 15px 0' }}>🎯 What You'll Do:</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    margin: '20px 0'
                }}>
                    <div>
                        <div style={{ fontSize: '2em', marginBottom: '10px' }}>🎭</div>
                        <strong>Choose Your Theme</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
                            Fantasy, adventure, mystery, and more!
                        </p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2em', marginBottom: '10px' }}>🧩</div>
                        <strong>Pick Story Elements</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
                            Use Propp's 31 narrative functions
                        </p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2em', marginBottom: '10px' }}>✍️</div>
                        <strong>Write Together</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
                            Collaborate with your AI assistant
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <button
                    className="button large primary"
                    onClick={handleNextStep}
                    style={{
                        width: '100%',
                        marginBottom: '15px',
                        padding: '20px 30px',
                        fontSize: '1.3em',
                        background: 'linear-gradient(45deg, #00b894, #00cec9)',
                        color: 'white',
                        border: '3px solid #333',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    🚀 Start My Adventure!
                </button>

                <button
                    className="button large secondary"
                    onClick={handleShowGallery}
                    style={{
                        width: '100%',
                        padding: '15px 30px',
                        fontSize: '1.1em',
                        background: 'linear-gradient(45deg, #fd79a8, #e84393)',
                        color: 'white',
                        border: '3px solid #333',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    🏆 Story Gallery
                </button>
            </div>

            <div style={{
                marginTop: '40px',
                padding: '20px',
                background: 'rgba(0, 184, 148, 0.1)',
                borderRadius: '15px',
                border: '2px solid #00b894'
            }}>
                <h3 style={{ color: '#00b894', margin: '0 0 15px 0', textAlign: 'center' }}>
                    💡 Did You Know?
                </h3>
                <p style={{ margin: 0, color: '#2d3436', textAlign: 'center' }}>
                    Vladimir Propp studied hundreds of fairy tales and discovered that they all follow similar patterns.
                    Now you can use these same storytelling techniques to create your own amazing adventures!
                </p>
            </div>
        </div>
    );
};

export default Step0Welcome;