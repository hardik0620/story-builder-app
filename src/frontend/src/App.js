// src/App.js - Updated with Compact Navigation
import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components
import Header from './components/Header';
import AIWizard from './components/AIWizard';
import DemoModal from './components/DemoModal';
import GalleryModal from './components/GalleryModal';
import NavigationTabs from './components/NavigationTabs'; // Uses the new compact version

// Import Step Components
import LoginPage from './components/LoginPage';
import Step0Welcome from './components/Step0Welcome';
import Step1Theme from './components/Step1Theme';
import Step2Functions from './components/Step2Functions';
import Step3Sequencing from './components/Step3Sequencing';
import Step4Writing from './components/Step4Writing';
import Step5Review from './components/Step5Review';
import Step6Feedback from './components/Step6Feedback';

// Import API Test Component (temporary)
import ApiTest from './components/ApiTest';

// Import API service
import apiService from './services/api';

function App() {
  const initialStoryData = {
    title: '',
    theme: '',
    selectedElements: [],
    elementOrder: [],
    storyParts: [],
    startTime: new Date(),
    userWordCount: 0,
    aiWordCount: 0,
    aiSuggestionsUsed: 0
  };

  const [currentStep, setCurrentStep] = useState(-1);
  const [storyData, setStoryData] = useState(initialStoryData);
  const [isDemoModalOpen, setDemoModalOpen] = useState(false);
  const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    type: 'guest',
    name: 'Guest',
    firstName: 'Guest',
    lastName: '',
    email: null
  });

  // Accessibility states
  const [isBigText, setIsBigText] = useState(false);
  const [contrast, setContrast] = useState(100);

  // Backend connection state
  const [backendConnected, setBackendConnected] = useState(false);
  const [showApiTest, setShowApiTest] = useState(false);

  // Test backend connection on app load
  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      await apiService.checkHealth();
      setBackendConnected(true);
      console.log('✅ Backend connected successfully');
    } catch (error) {
      setBackendConnected(false);
      console.warn('⚠️ Backend not connected:', error.message);
    }
  };

  // Load saved progress and settings on mount
  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && savedTheme !== 'default') {
      document.body.classList.add(savedTheme + '-theme');
    }

    // Load saved progress
    const savedProgress = localStorage.getItem('storyProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress.storyData && window.confirm("Would you like to continue your previous story?")) {
          setStoryData(progress.storyData);
          setCurrentStep(progress.currentStep || 4);

          if (progress.currentUser) {
            setCurrentUser(progress.currentUser);
          }
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }

    // Load accessibility settings
    const savedBigText = localStorage.getItem('bigTextEnabled') === 'true';
    const savedContrast = parseInt(localStorage.getItem('contrastLevel') || '100');
    setIsBigText(savedBigText);
    setContrast(savedContrast);

    if (savedBigText) {
      document.body.style.fontSize = '1.3em';
    }
    document.body.style.filter = `contrast(${savedContrast}%)`;

    // Listen for gallery show event
    const handleShowGallery = () => {
      setGalleryModalOpen(true);
    };
    window.addEventListener('showGallery', handleShowGallery);

    return () => {
      window.removeEventListener('showGallery', handleShowGallery);
    };
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('bigTextEnabled', isBigText.toString());
    document.body.style.fontSize = isBigText ? '1.3em' : '';
  }, [isBigText]);

  useEffect(() => {
    localStorage.setItem('contrastLevel', contrast.toString());
    document.body.style.filter = `contrast(${contrast}%)`;
  }, [contrast]);

  const handleLogin = (userData) => {
    console.log('🔐 Login handler called with user data:', userData);

    const completeUserData = {
      type: userData.type || 'guest',
      name: userData.name || 'Guest',
      firstName: userData.firstName || userData.name?.split(' ')[0] || 'Guest',
      lastName: userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '',
      email: userData.email || null,
      isNewUser: userData.isNewUser || false,
      picture: userData.picture || null
    };

    console.log('👤 Setting complete user data:', completeUserData);
    setCurrentUser(completeUserData);
    setCurrentStep(0);

    localStorage.setItem('currentUser', JSON.stringify(completeUserData));
    console.log('📍 Moving to step 0 (Welcome)');
  };

  const handleLogout = () => {
    console.log('🚪 Logout handler called');
    if (window.confirm('Are you sure you want to log out? Any unsaved progress may be lost.')) {
      setStoryData(initialStoryData);
      setCurrentStep(-1);
      setCurrentUser({
        type: 'guest',
        name: 'Guest',
        firstName: 'Guest',
        lastName: '',
        email: null
      });

      localStorage.removeItem('storyProgress');
      localStorage.removeItem('currentUser');
      console.log('🧹 State cleared, returning to login');
    }
  };

  const toggleBigText = () => {
    setIsBigText(!isBigText);
  };

  const adjustContrast = (value) => {
    setContrast(parseInt(value));
  };

  const showGallery = () => {
    setGalleryModalOpen(true);
  };

  const closeGallery = () => {
    setGalleryModalOpen(false);
  };

  // Continue story functionality
  const handleContinueStory = (storyDataToLoad) => {
    console.log('📖 Loading story for continuation:', storyDataToLoad);

    // Confirm before loading if there's current unsaved work
    if (storyData.storyParts && storyData.storyParts.length > 0) {
      if (!window.confirm('⚠️ You have unsaved work in your current story. Loading another story will replace it. Continue?')) {
        return;
      }
    }

    // Load the story data
    setStoryData({
      ...storyDataToLoad,
      lastModified: new Date().toISOString()
    });

    // Determine which step to go to based on story progress
    let targetStep = 4; // Default to writing step

    if (!storyDataToLoad.title || !storyDataToLoad.theme) {
      targetStep = 1; // Go to theme selection
    } else if (!storyDataToLoad.selectedElements || storyDataToLoad.selectedElements.length < 3) {
      targetStep = 2; // Go to elements selection
    } else if (!storyDataToLoad.elementOrder || storyDataToLoad.elementOrder.length === 0) {
      targetStep = 3; // Go to sequencing
    } else if (!storyDataToLoad.storyParts || storyDataToLoad.storyParts.length === 0) {
      targetStep = 4; // Go to writing
    } else {
      targetStep = 4; // Continue writing
    }

    setCurrentStep(targetStep);

    // Save the loaded progress
    const progressData = {
      currentStep: targetStep,
      storyData: storyDataToLoad,
      currentUser: currentUser
    };
    localStorage.setItem('storyProgress', JSON.stringify(progressData));

    console.log(`📍 Story loaded, navigating to step ${targetStep}`);
    alert(`📖 Story "${storyDataToLoad.title}" loaded successfully! You can continue writing where you left off.`);
  };

  // Enhanced step change handler for navigation tabs
  const handleStepChange = (targetStep) => {
    console.log(`🧭 Navigation request: Step ${currentStep} → Step ${targetStep}`);

    // Validate the step change is allowed
    if (targetStep < 0 || targetStep > 6) {
      console.warn('Invalid step requested:', targetStep);
      return;
    }

    // Check if step is accessible
    if (!isStepAccessible(targetStep)) {
      const stepNames = ['Welcome', 'Theme', 'Elements', 'Order', 'Write', 'Review', 'Complete'];
      alert(`🔒 "${stepNames[targetStep]}" step is not yet accessible. Please complete the previous steps first!`);
      return;
    }

    // Save current progress before navigating
    const progressData = {
      currentStep: targetStep,
      storyData: storyData,
      currentUser: currentUser
    };
    localStorage.setItem('storyProgress', JSON.stringify(progressData));

    // Navigate to the new step
    setCurrentStep(targetStep);
    console.log(`📍 Navigated to step ${targetStep}`);
  };

  // Check if a step is accessible
  const isStepAccessible = (stepId) => {
    switch (stepId) {
      case 0:
        return true; // Welcome is always accessible
      case 1:
        return true; // Theme selection is always accessible after welcome
      case 2:
        return storyData.theme && storyData.title; // Need theme and title
      case 3:
        return storyData.selectedElements && storyData.selectedElements.length >= 3; // Need at least 3 elements
      case 4:
        return storyData.elementOrder && storyData.elementOrder.length >= 3; // Need ordered elements
      case 5:
        return storyData.storyParts && storyData.storyParts.length > 0; // Need some story content
      case 6:
        return storyData.storyParts && storyData.storyParts.length > 0; // Same as review
      default:
        return false;
    }
  };

  const nextStep = () => {
    // Special handling for step transitions
    if (currentStep === 2) {
      setStoryData(prev => ({
        ...prev,
        elementOrder: prev.elementOrder.length > 0 ? prev.elementOrder : [...prev.selectedElements]
      }));
    } else if (currentStep === 4) {
      if (!storyData.storyParts || storyData.storyParts.length === 0) {
        alert("Please write some story content before finishing your story!");
        return;
      }
    }

    const newStep = currentStep + 1;
    setCurrentStep(newStep);

    const progressData = {
      currentStep: newStep,
      storyData: storyData,
      currentUser: currentUser
    };
    localStorage.setItem('storyProgress', JSON.stringify(progressData));
  };

  const previousStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const resetStory = () => {
    if (window.confirm("Are you ready to start a brand new story adventure?")) {
      setStoryData({
        ...initialStoryData,
        startTime: new Date()
      });
      setCurrentStep(0);
      localStorage.removeItem('storyProgress');
    }
  };

  const showDemoModal = () => {
    setDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setDemoModalOpen(false);
  };

  // Save story function for Step5Review
  const saveStoryToGallery = (storyTitle, storyContent, fullStoryData) => {
    const storyToSave = {
      id: Date.now(),
      title: storyTitle || storyData.title || 'Untitled Story',
      theme: storyData.theme || 'Custom',
      content: storyContent,
      preview: storyContent.substring(0, 150) + (storyContent.length > 150 ? '...' : ''),
      structure: storyData.elementOrder?.map(el => el.shortName).join(' → ') || 'Custom structure',
      dateCreated: new Date().toLocaleDateString(),
      wordCount: storyContent.split(' ').filter(word => word.trim()).length,
      userContribution: 85, // Placeholder
      author: currentUser.name || 'Story Creator',
      fullStoryData: fullStoryData || storyData // Include full story data for continuation
    };

    const savedStories = JSON.parse(localStorage.getItem('savedStories') || '[]');
    savedStories.unshift(storyToSave);
    localStorage.setItem('savedStories', JSON.stringify(savedStories));

    console.log('💾 Story saved to gallery with continuation data');
    return storyToSave;
  };

  const renderStep = () => {
    switch (currentStep) {
      case -1:
        return <LoginPage onLogin={handleLogin} />;
      case 0:
        return (
          <Step0Welcome
            nextStep={nextStep}
            showGallery={showGallery}
          />
        );
      case 1:
        return (
          <Step1Theme
            nextStep={nextStep}
            previousStep={previousStep}
            storyData={storyData}
            setStoryData={setStoryData}
            backendConnected={backendConnected}
          />
        );
      case 2:
        return (
          <Step2Functions
            nextStep={nextStep}
            previousStep={previousStep}
            storyData={storyData}
            setStoryData={setStoryData}
            backendConnected={backendConnected}
          />
        );
      case 3:
        return (
          <Step3Sequencing
            nextStep={nextStep}
            previousStep={previousStep}
            storyData={storyData}
            setStoryData={setStoryData}
          />
        );
      case 4:
        return (
          <Step4Writing
            nextStep={nextStep}
            previousStep={previousStep}
            storyData={storyData}
            setStoryData={setStoryData}
            backendConnected={backendConnected}
          />
        );
      case 5:
        return (
          <Step5Review
            nextStep={nextStep}
            previousStep={previousStep}
            storyData={storyData}
            setStoryData={setStoryData}
            backendConnected={backendConnected}
            saveStoryToGallery={saveStoryToGallery}
          />
        );
      case 6:
        return (
          <Step6Feedback
            resetStory={resetStory}
            storyData={storyData}
            currentUser={currentUser}
            showGallery={showGallery}
            backendConnected={backendConnected}
          />
        );
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  const globalStyles = {
    fontSize: isBigText ? '1.2em' : '1em',
    filter: `contrast(${contrast}%)`
  };

  return (
    <div style={globalStyles}>
      {/* Demo Modal */}
      {isDemoModalOpen && (
        <DemoModal closeModal={closeDemoModal} />
      )}

      {/* Gallery Modal with continue functionality */}
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={closeGallery}
        onCreateNew={resetStory}
        onContinueStory={handleContinueStory}
      />

      {/* Render login page or main app */}
      {currentStep === -1 ? (
        renderStep()
      ) : (
        <>
          {/* Debug Info Panel */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{
              position: 'fixed',
              top: '10px',
              left: '10px',
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '12px',
              maxWidth: '200px'
            }}>
              <div><strong>Debug Info:</strong></div>
              <div>Step: {currentStep}</div>
              <div>User: {currentUser.name}</div>
              <div>Type: {currentUser.type}</div>
              <div>Backend: {backendConnected ? '✅' : '❌'}</div>
              <div>Elements: {storyData.selectedElements?.length || 0}</div>
            </div>
          )}

          {/* API Test Component */}
          {showApiTest && process.env.NODE_ENV === 'development' && (
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              zIndex: 9999,
              backgroundColor: 'white',
              border: '2px solid #007bff',
              borderRadius: '8px',
              padding: '10px',
              maxWidth: '300px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '14px' }}>🔗 Backend Status</h4>
                <button
                  onClick={() => setShowApiTest(false)}
                  style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}
                >
                  ✖️
                </button>
              </div>
              <div style={{ fontSize: '12px' }}>
                Status: <span style={{ color: backendConnected ? 'green' : 'red' }}>
                  {backendConnected ? '✅ Connected' : '❌ Disconnected'}
                </span>
                <br />
                <button
                  onClick={testBackendConnection}
                  style={{ marginTop: '5px', padding: '5px 10px', fontSize: '10px' }}
                >
                  🔄 Test
                </button>
              </div>
            </div>
          )}

          {/* AI Wizard */}
          <AIWizard
            currentStep={currentStep}
            storyData={storyData}
            backendConnected={backendConnected}
          />

          {/* Main App Container */}
          <div className="main-container-unified">
            <div className="main-content-unified">
              {/* Header Navigation */}
              <Header
                showDemoModal={showDemoModal}
                toggleBigText={toggleBigText}
                adjustContrast={adjustContrast}
                handleLogout={handleLogout}
                isBigText={isBigText}
                contrast={contrast}
                currentUser={currentUser}
                backendConnected={backendConnected}
              />

              {/* Compact Navigation Tabs (hidden on welcome step) */}
              {currentStep > 0 && (
                <NavigationTabs
                  currentStep={currentStep}
                  storyData={storyData}
                  onStepChange={handleStepChange}
                  isStepAccessible={isStepAccessible}
                />
              )}

              {/* Current Step Content */}
              {renderStep()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;