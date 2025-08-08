// src/components/NavigationTabs.js - Compact Version
import React from 'react';

const NavigationTabs = ({
    currentStep,
    storyData,
    onStepChange,
    isStepAccessible
}) => {
    const steps = [
        {
            id: 0,
            name: 'Welcome',
            emoji: '🌟',
            shortName: 'Welcome',
            description: 'Getting started'
        },
        {
            id: 1,
            name: 'Theme & Title',
            emoji: '🎭',
            shortName: 'Theme',
            description: 'Choose your story world'
        },
        {
            id: 2,
            name: 'Story Elements',
            emoji: '🧩',
            shortName: 'Elements',
            description: 'Pick Propp functions'
        },
        {
            id: 3,
            name: 'Sequencing',
            emoji: '🔄',
            shortName: 'Order',
            description: 'Arrange your story'
        },
        {
            id: 4,
            name: 'Writing',
            emoji: '✍️',
            shortName: 'Write',
            description: 'Create your story'
        },
        {
            id: 5,
            name: 'Review',
            emoji: '📊',
            shortName: 'Review',
            description: 'Final review'
        },
        {
            id: 6,
            name: 'Complete',
            emoji: '🎉',
            shortName: 'Done',
            description: 'Story complete!'
        }
    ];

    // Determine if a step is accessible
    const getStepAccessibility = (stepId) => {
        if (typeof isStepAccessible === 'function') {
            return isStepAccessible(stepId);
        }

        // Default accessibility logic
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

    const getStepStatus = (stepId) => {
        if (stepId === currentStep) return 'current';
        if (stepId < currentStep) return 'completed';
        if (getStepAccessibility(stepId)) return 'accessible';
        return 'locked';
    };

    const handleStepClick = (stepId) => {
        const status = getStepStatus(stepId);

        if (status === 'locked') {
            const step = steps.find(s => s.id === stepId);
            alert(`🔒 ${step.name} is not yet accessible. Please complete the previous steps first!`);
            return;
        }

        if (stepId === currentStep) {
            // Already on this step
            return;
        }

        // Confirm navigation if moving backwards with unsaved changes
        if (stepId < currentStep && currentStep === 4 && storyData.storyParts?.length > 0) {
            if (!window.confirm('⚠️ You have unsaved story content. Are you sure you want to navigate away? Consider saving your progress first.')) {
                return;
            }
        }

        // Navigate to the step
        if (typeof onStepChange === 'function') {
            onStepChange(stepId);
        }
    };

    const getStepProgress = () => {
        const totalSteps = steps.length;
        const progressPercentage = Math.round((currentStep / (totalSteps - 1)) * 100);
        return progressPercentage;
    };

    return (
        <div className="navigation-tabs-container-compact">
            {/* Compact Progress Bar */}
            <div className="compact-progress">
                <div className="progress-bar-container-compact">
                    <div
                        className="progress-bar-fill-compact"
                        style={{ width: `${getStepProgress()}%` }}
                    ></div>
                </div>
                <div className="progress-text-compact">
                    Step {currentStep + 1} of {steps.length} - {steps[currentStep]?.name}
                </div>
            </div>

            {/* Compact Navigation Tabs */}
            <div className="navigation-tabs-compact">
                {steps.map(step => {
                    const status = getStepStatus(step.id);

                    return (
                        <button
                            key={step.id}
                            className={`nav-tab-compact nav-tab-${status}`}
                            onClick={() => handleStepClick(step.id)}
                            disabled={status === 'locked'}
                            title={`${step.name}: ${step.description}`}
                        >
                            <div className="nav-tab-emoji-compact">{step.emoji}</div>
                            <div className="nav-tab-name-compact">{step.shortName}</div>
                            <div className="nav-tab-status-compact">
                                {status === 'completed' && '✅'}
                                {status === 'current' && '👉'}
                                {status === 'accessible' && '⭕'}
                                {status === 'locked' && '🔒'}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default NavigationTabs;