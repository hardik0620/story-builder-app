// src/components/Step1Theme.js (Debug Version)
import React, { useEffect } from 'react';

const Step1Theme = ({ nextStep, previousStep, storyData, setStoryData }) => {
    console.log('🎭 Step1Theme rendering with props:', {
        nextStep: typeof nextStep,
        previousStep: typeof previousStep,
        storyData: storyData,
        setStoryData: typeof setStoryData
    });

    // Debug effect to track when component mounts
    useEffect(() => {
        console.log('🎭 Step1Theme mounted successfully');
        console.log('📊 Current story data:', storyData);

        // Check if required functions are available
        if (typeof nextStep !== 'function') {
            console.error('❌ nextStep is not a function in Step1Theme');
        }
        if (typeof setStoryData !== 'function') {
            console.error('❌ setStoryData is not a function in Step1Theme');
        }
    }, []);

    const isNextDisabled = !storyData.title.trim();
    console.log('🔒 Next button disabled?', isNextDisabled, 'Title:', storyData.title);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log('📝 Input changed:', id, '=', value);

        if (typeof setStoryData === 'function') {
            setStoryData(prevData => {
                const newData = { ...prevData, [id]: value };
                console.log('💾 Story data updated:', newData);
                return newData;
            });
        } else {
            console.error('❌ setStoryData function not available');
        }
    };

    const generateRandomTitle = () => {
        console.log('🎲 Generate random title clicked for theme:', storyData.theme);

        const advancedThemes = {
            fantasy: [
                "The Magical Crystal Quest", "Princess Sparkle's Adventure", "The Dragon's Secret",
                "Quest for the Golden Unicorn", "The Enchanted Forest Mystery", "Wizard's Lost Spell",
                "The Fairy Kingdom's Treasure", "Magic School Chronicles", "The Phoenix Rising"
            ],
            adventure: [
                "The Lost Treasure Map", "Journey to Rainbow Mountain", "The Great Forest Expedition",
                "Secret Island Adventure", "The Underground Cavern", "Mountain Peak Challenge",
                "River Rapids Rescue", "Desert Oasis Discovery", "Jungle Temple Quest"
            ],
            mystery: [
                "The Case of the Missing Cookies", "Detective Sam's First Mystery", "The Secret of Moonlight Manor",
                "The Vanishing Library Books", "Mystery of the Glowing Garden", "The Puzzle Box Secret",
                "Clues in the Attic", "The Midnight Message", "The Hidden Room Discovery"
            ],
            animals: [
                "Buddy the Brave Bear", "The Talking Cat's Mission", "Adventures in Animal Kingdom",
                "The Elephant's Memory", "Penguin Parade Rescue", "The Wise Owl's Lesson",
                "Safari Friends Unite", "The Dancing Dolphins", "Forest Friends Forever"
            ],
            friendship: [
                "Best Friends Forever Quest", "The Friendship Magic", "Together We Can Do Anything",
                "The Circle of Trust", "Friends Across the Galaxy", "The Kindness Chain",
                "United We Stand", "The Helping Hands Club", "Friendship Bridge"
            ],
            space: [
                "Captain Nova's Space Adventure", "The Alien Friend", "Mission to Planet Sparkle",
                "Galactic Explorers United", "The Comet Chase", "Space Station Rescue",
                "Journey to the Moon Base", "The Stellar Discovery", "Cosmic Friends Forever"
            ],
            underwater: [
                "The Mermaid's Lost Pearl", "Deep Sea Detective", "Submarine Adventure",
                "Ocean Kingdom Quest", "The Coral Reef Mystery", "Whale Song Journey",
                "Treasure of the Deep", "The Lighthouse Keeper's Secret", "Aquatic Adventures"
            ],
            superhero: [
                "The Amazing Super Kid", "Powers of Friendship", "Hero Academy Chronicles",
                "The Invisible Helper", "Super Speed Adventure", "The Flying Rescuer",
                "Mind Reader's Mission", "The Shield of Courage", "Power Up Together"
            ],
            pirate: [
                "The Friendly Pirate's Quest", "Treasure Island Adventure", "Captain Kindness",
                "The Golden Compass Journey", "Pirate's Code of Honor", "The Singing Sailor",
                "Adventure on the High Seas", "The Map to Friendship", "The Pirate's Heart"
            ],
            fairytale: [
                "The New Cinderella Story", "Jack's Bean Adventure", "The Kind Giant",
                "Princess and the Helpful Dragon", "The Magic Mirror's Truth", "Goldilocks Returns",
                "The Three Bears' Friends", "Red Riding Hood's Courage", "The Frog Prince's Wish"
            ],
            robot: [
                "The Friendly Robot Helper", "Circuits and Friendship", "Robot School Days",
                "The Kind Android", "Mechanical Heart Adventure", "The Robot's Dream",
                "Digital Friends Forever", "The Caring Computer", "Robo-Rescue Mission"
            ],
            dinosaur: [
                "The Gentle T-Rex", "Dinosaur Park Adventure", "The Time Travel Discovery",
                "Friendly Fossil Friends", "The Herbivore Heroes", "Dino Egg Mystery",
                "The Peaceful Prehistoric", "Dinosaur Detective", "The Kind Carnivore"
            ],
            magic_school: [
                "First Day at Magic Academy", "The Spell That Went Wrong", "Magical Friendship",
                "The Enchanted Classroom", "Potions and Pals", "The Magic Tournament",
                "Wand Wielding Warriors", "The School of Wonders", "Magical Mishaps"
            ],
            time_travel: [
                "The Time Machine Adventure", "Yesterday's Tomorrow", "The History Helper",
                "Traveling Through Time", "The Future Friend", "Past and Present Pals",
                "The Clock Tower Secret", "Time Travelers United", "The Era Explorer"
            ],
            jungle: [
                "The Jungle Explorer", "Vine Swinging Adventure", "The Rainforest Rescue",
                "Tropical Treasure Hunt", "The Wise Monkey's Lesson", "Canopy Climbers",
                "The Hidden Waterfall", "Jungle Friends Unite", "The Green Guardian"
            ],
            winter: [
                "The Snow Day Adventure", "The Magical Snowflake", "Winter Wonderland Quest",
                "The Friendly Snowman", "Ice Castle Adventure", "The Skiing Sensation",
                "Frosty's New Friend", "The Winter Olympics", "Snowball Fight Fun"
            ],
            sports: [
                "The Underdog Champion", "Team Spirit Adventure", "The Winning Goal",
                "Sports Day Spectacular", "The Helpful Coach", "Fair Play Heroes",
                "The Comeback Kid", "Athletic Adventures", "The Team That Cared"
            ],
            music: [
                "The Musical Adventure", "The Singing Journey", "Rhythm and Friendship",
                "The Band Together", "Melody Makers", "The Concert Quest",
                "Harmonious Hearts", "The Music Box Mystery", "Symphony of Friends"
            ]
        };

        if (storyData.theme && advancedThemes[storyData.theme]) {
            const titles = advancedThemes[storyData.theme];
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            console.log('✨ Generated title:', randomTitle);

            if (typeof setStoryData === 'function') {
                setStoryData(prevData => ({ ...prevData, title: randomTitle }));
            } else {
                console.error('❌ setStoryData function not available for title generation');
            }
        } else {
            console.log('⚠️ No theme selected or theme not found:', storyData.theme);
            alert("Please select a theme first, then I'll suggest a perfect title!");
        }
    };

    const handleNextStep = () => {
        console.log('➡️ Next button clicked in Step1Theme');
        console.log('📊 Story data before next:', storyData);

        if (typeof nextStep === 'function') {
            nextStep();
        } else {
            console.error('❌ nextStep function not available');
            alert('Navigation function not available. Please check console for errors.');
        }
    };

    const handlePreviousStep = () => {
        console.log('⬅️ Previous button clicked in Step1Theme');

        if (typeof previousStep === 'function') {
            previousStep();
        } else {
            console.error('❌ previousStep function not available');
            alert('Navigation function not available. Please check console for errors.');
        }
    };

    return (
        <div className="step-container active">
            <div className="step-header">
                <h1 className="step-title">🎯 Your Story's Heart</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '16%' }}></div>
                </div>
                <p style={{ color: '#6c5ce7', fontWeight: 'bold' }}>✨ Step 1 of 6 ✨</p>
            </div>

            <div className="input-group">
                <label className="label">🎭 Pick your story's world</label>
                <select
                    className="dropdown"
                    id="theme"
                    value={storyData.theme}
                    onChange={handleInputChange}
                >
                    <option value="">Choose your adventure...</option>
                    <option value="fantasy">🏰 Fantasy Kingdom</option>
                    <option value="adventure">🗺️ Epic Adventure</option>
                    <option value="mystery">🔍 Mystery Solver</option>
                    <option value="animals">🐾 Animal Friends</option>
                    <option value="friendship">👫 Friendship Magic</option>
                    <option value="space">🚀 Space Explorer</option>
                    <option value="underwater">🌊 Ocean Adventure</option>
                    <option value="superhero">🦸‍♀️ Superhero Stories</option>
                    <option value="pirate">🏴‍☠️ Pirate Adventures</option>
                    <option value="fairytale">🧚‍♀️ Fairy Tale Magic</option>
                    <option value="robot">🤖 Robot Friends</option>
                    <option value="dinosaur">🦕 Dinosaur World</option>
                    <option value="magic_school">🎓 Magic School</option>
                    <option value="time_travel">⏰ Time Travel</option>
                    <option value="jungle">🌴 Jungle Adventure</option>
                    <option value="winter">❄️ Winter Wonderland</option>
                    <option value="sports">⚽ Sports Heroes</option>
                    <option value="music">🎵 Musical Journey</option>
                </select>
            </div>

            <div className="input-group">
                <label className="label tooltip">
                    🏷️ Give your story a magical title
                    <span className="tooltip-text">
                        A magical title captures the essence of your story and makes readers excited to read it!
                        Think of something that hints at adventure, mystery, or wonder.
                    </span>
                </label>
                <input
                    type="text"
                    className="text-input"
                    id="title"
                    style={{ fontStyle: 'italic' }}
                    placeholder="E.g...The Adventures of Captain Sparkle"
                    value={storyData.title}
                    onChange={handleInputChange}
                />
            </div>

            <button
                className="button secondary"
                onClick={generateRandomTitle}
                style={{ margin: '20px auto', display: 'block' }}
            >
                🎲 Give Me a Magical Title!
            </button>

            {/* Debug info panel for development */}
            {process.env.NODE_ENV === 'development' && (
                <div style={{
                    background: 'rgba(255,255,0,0.1)',
                    border: '2px solid orange',
                    padding: '10px',
                    margin: '20px 0',
                    borderRadius: '8px',
                    fontSize: '12px'
                }}>
                    <strong>Debug Info:</strong><br />
                    Theme: {storyData.theme || 'Not selected'}<br />
                    Title: {storyData.title || 'Empty'}<br />
                    Next Disabled: {isNextDisabled.toString()}<br />
                    Functions Available: nextStep={typeof nextStep}, setStoryData={typeof setStoryData}
                </div>
            )}

            <div className="navigation">
                <button className="nav-btn" onClick={handlePreviousStep}>← Back</button>
                <button
                    className="nav-btn primary"
                    onClick={handleNextStep}
                    disabled={isNextDisabled}
                    style={{ opacity: isNextDisabled ? '0.5' : '1' }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Step1Theme;