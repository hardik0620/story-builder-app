// src/components/DemoModal.js
import React from 'react';

const DemoModal = ({ closeModal }) => {
    return (
        <div className="demo-modal" style={{ display: 'block' }}>
            <div className="demo-content">
                <button className="close-demo" onClick={closeModal}>×</button>
                <h2 style={{ color: '#2d3436', marginBottom: '20px' }}>🎬 How Story Weaver Works</h2>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>📖 Based on Propp's Morphology</h3>
                    <p>Our Story Weaver is based on Vladimir Propp's famous study of fairy tales. Propp identified 31 functions that appear in folk stories, creating a blueprint for compelling narratives.</p>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>🤖 AI-Powered Collaboration</h3>
                    <p>Our AI Story Wizard understands Propp's functions and helps you:</p>
                    <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
                        <li>Choose the right story elements for your theme</li>
                        <li>Arrange functions in the most effective order</li>
                        <li>Generate contextual suggestions based on your current scene</li>
                        <li>Provide writing prompts that fit your chosen functions</li>
                    </ul>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>✨ Key Features</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', margin: '15px 0' }}>
                        <div style={{ padding: '15px', border: '2px solid #333', borderRadius: '15px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '2em', textAlign: 'center' }}>🎯</div>
                            <h4 style={{ margin: '10px 0 5px 0' }}>Theme Selection</h4>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>Choose from fantasy, adventure, mystery, and more!</p>
                        </div>
                        <div style={{ padding: '15px', border: '2px solid #333', borderRadius: '15px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '2em', textAlign: 'center' }}>🧩</div>
                            <h4 style={{ margin: '10px 0 5px 0' }}>Function Selection</h4>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>Pick from Propp's 31 narrative functions</p>
                        </div>
                        <div style={{ padding: '15px', border: '2px solid #333', borderRadius: '15px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '2em', textAlign: 'center' }}>🔄</div>
                            <h4 style={{ margin: '10px 0 5px 0' }}>Story Sequencing</h4>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>Arrange your functions in the perfect order</p>
                        </div>
                        <div style={{ padding: '15px', border: '2px solid #333', borderRadius: '15px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '2em', textAlign: 'center' }}>✍️</div>
                            <h4 style={{ margin: '10px 0 5px 0' }}>Collaborative Writing</h4>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>Write together with AI suggestions</p>
                        </div>
                        <div style={{ padding: '15px', border: '2px solid #333', borderRadius: '15px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '2em', textAlign: 'center' }}>📄</div>
                            <h4 style={{ margin: '10px 0 5px 0' }}>Export & Share</h4>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>Download PDF, save to gallery, and share</p>
                        </div>
                        <div style={{ padding: '15px', border: '2px solid #333', borderRadius: '15px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '2em', textAlign: 'center' }}>🎨</div>
                            <h4 style={{ margin: '10px 0 5px 0' }}>Enhanced Editing</h4>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>Edit, delete, and recover text with ease</p>
                        </div>
                    </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>🔬 The Science Behind It</h3>
                    <p>Vladimir Propp analyzed hundreds of Russian fairy tales and discovered that they all followed similar patterns. His 31 functions include:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '15px 0', fontSize: '0.9em' }}>
                        <div>• Initial Situation</div>
                        <div>• Departure</div>
                        <div>• Interdiction</div>
                        <div>• Test/Trial</div>
                        <div>• Violation</div>
                        <div>• Victory</div>
                        <div>• Villainy/Lack</div>
                        <div>• Return</div>
                    </div>
                    <p style={{ fontStyle: 'italic' }}>...and 23 more functions that create compelling story structures!</p>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>🎓 How to Use Story Weaver</h3>
                    <div style={{ background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: 'white', padding: '20px', borderRadius: '15px', border: '3px solid #333' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ background: 'white', color: '#0984e3', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>
                                    Choose Your World
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9em' }}>Select a theme that excites you - fantasy kingdoms, space adventures, mystery solving, or any of our 18 magical worlds!</p>
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ background: 'white', color: '#0984e3', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</span>
                                    Pick Story Elements
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9em' }}>Choose from Propp's 31 story functions. Start with basics like "Initial Situation," "Villainy," and "Victory" - you need at least 3!</p>
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ background: 'white', color: '#0984e3', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
                                    Arrange Your Story
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9em' }}>Drag and drop your chosen elements into the perfect order. Our AI can auto-sort them, or create your own unique sequence!</p>
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ background: 'white', color: '#0984e3', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>4</span>
                                    Write Together
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9em' }}>Start writing! Our AI Story Wizard provides contextual suggestions, but the creativity is yours. Edit, format, and perfect every word!</p>
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ background: 'white', color: '#0984e3', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>5</span>
                                    Review & Polish
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9em' }}>See your complete masterpiece with full statistics. Make final edits and prepare for sharing with the world!</p>
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ background: 'white', color: '#0984e3', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>6</span>
                                    Share & Celebrate
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9em' }}>Download, print, share, or save to your gallery. You're now officially a story creator using proven narrative techniques!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>💡 Pro Tips for Great Stories</h3>
                    <div style={{ background: 'rgba(0, 184, 148, 0.1)', padding: '15px', borderRadius: '10px', border: '2px solid #00b894' }}>
                        <ul style={{ textAlign: 'left', margin: 0, paddingLeft: '20px' }}>
                            <li><strong>Start Simple:</strong> Use 3-5 functions for your first story, then experiment with more complex narratives</li>
                            <li><strong>Follow the Flow:</strong> A typical story flows: Setup → Problem → Journey → Resolution</li>
                            <li><strong>Use AI Wisely:</strong> Let the AI suggest ideas, but make the story uniquely yours</li>
                            <li><strong>Edit Freely:</strong> Don't worry about perfection initially - you can always edit and improve</li>
                            <li><strong>Save Progress:</strong> Use the save feature to continue your story anytime</li>
                        </ul>
                    </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <h3 style={{ color: '#6c5ce7' }}>🌟 Why Propp's Method Works</h3>
                    <p>Propp's morphology isn't just academic theory - it's the foundation of modern storytelling used by:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', margin: '10px 0', textAlign: 'center' }}>
                        <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <strong>📺 TV Shows</strong>
                        </div>
                        <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <strong>🎬 Movies</strong>
                        </div>
                        <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <strong>📚 Novels</strong>
                        </div>
                        <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <strong>🎮 Video Games</strong>
                        </div>
                    </div>
                    <p style={{ fontStyle: 'italic' }}>Now you can use the same techniques that create compelling narratives across all media!</p>
                </div>

                <button className="button large primary" onClick={closeModal} style={{ width: '100%', marginTop: '20px' }}>
                    ✨ Start Creating My Story!
                </button>
            </div>
        </div>
    );
};

export default DemoModal;