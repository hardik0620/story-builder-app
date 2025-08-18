// backend/data/proppKnowledgeDatabase.js - Comprehensive Knowledge Base
const PROPP_KNOWLEDGE_DATABASE = {
    0: {
        name: "Initial Situation",
        shortName: "Initial",
        emoji: "🏠",
        description: "The initial situation where characters are introduced and the setting is established",
        commonQuestions: [
            "How do I start my story?", "What should I write first?", "How do I introduce my hero?",
            "What makes a good beginning?", "How do I describe my character?", "What is the initial situation?",
            "How do I set the scene?", "What should happen at the beginning?", "How do I introduce characters?"
        ],
        responses: [
            "Start by introducing your hero in their everyday world. Show us what makes them special - are they brave, curious, kind, or funny?",
            "Describe where your hero lives and what their normal life is like before the adventure begins. What do they love to do?",
            "Tell us about your hero's family, friends, or pets. Who are the important people in their life?",
            "Show your hero doing something they enjoy - maybe reading, playing, helping others, or exploring their neighborhood.",
            "Paint a picture of your hero's home and world. Is it a castle, a farm, a city, or somewhere magical?",
            "Let readers meet your hero by showing their personality through their actions and thoughts.",
            "Start with 'Once upon a time' or 'Long ago' to create that magical story feeling.",
            "Introduce your hero by showing them solving a small problem or helping someone - this shows their good heart!"
        ],
        writingPrompts: [
            "Once upon a time, there lived a [brave/kind/curious] [boy/girl/child] named _____ who loved to _____.",
            "In a [beautiful/peaceful/magical] [village/kingdom/town], _____ spent their days _____.",
            "Every morning, _____ would wake up and _____. Today felt different because _____.",
            "_____ was known throughout the [village/kingdom] for being _____.",
            "The story begins in _____ where our hero _____ lived with _____."
        ],
        tips: [
            "Make your hero relatable - kids should see themselves in your character",
            "Show, don't just tell - let actions reveal personality",
            "Create a cozy, safe feeling before the adventure begins",
            "Include sensory details - what does the hero see, hear, smell?",
            "Give your hero something they care deeply about"
        ]
    },

    1: {
        name: "Absence",
        shortName: "Absence",
        emoji: "🚪",
        description: "A family member or important character leaves or is absent",
        commonQuestions: [
            "Who should leave in my story?", "Why do characters leave?", "How do I show someone is gone?",
            "What happens when someone leaves?", "How does absence create story?", "Who goes away in fairy tales?",
            "How do I write about missing people?", "What makes absence important?"
        ],
        responses: [
            "Someone important to your hero goes away - maybe parents on a trip, a wise teacher, or a protective guardian.",
            "The absence creates space for your hero to face challenges on their own and grow stronger.",
            "Show how your hero feels when someone leaves - worried, sad, or maybe excited for independence.",
            "This leaving often sets up the story by removing the person who would normally protect your hero.",
            "The absent person might leave behind something important - advice, a gift, or a responsibility.",
            "Use this moment to show your hero's emotions and how they handle being alone.",
            "The absence doesn't have to be sad - maybe someone goes on an exciting journey!",
            "This creates an opportunity for your hero to step up and be brave."
        ],
        writingPrompts: [
            "The next morning, _____ discovered that _____ had left for _____.",
            "_____ hugged _____ goodbye, not knowing when they would return from _____.",
            "With _____ gone to _____, _____ felt both scared and excited about _____.",
            "The house felt empty without _____, but _____ knew they had to _____.",
            "Before leaving, _____ told _____ to _____ while they were away."
        ],
        tips: [
            "The absence should feel natural to the story, not forced",
            "Show your hero's emotional reaction to being left alone",
            "This creates vulnerability that makes the story more exciting",
            "The absent person often returns at an important moment later",
            "Use this to build your hero's independence and courage"
        ]
    },

    2: {
        name: "Interdiction",
        shortName: "Interdiction",
        emoji: "⚠️",
        description: "An order, warning, or prohibition is given to the hero",
        commonQuestions: [
            "What kind of warning should I give?", "How do I create rules in my story?", "What should my hero be told not to do?",
            "How do I make warnings interesting?", "What makes a good prohibition?", "How do I show someone giving advice?",
            "What warnings work in stories?", "How do I make rules feel important?"
        ],
        responses: [
            "Someone wise gives your hero a warning or rule to follow - like 'Don't go into the dark forest' or 'Never open that door.'",
            "The warning usually comes from someone who cares about your hero's safety - a parent, teacher, or wise elder.",
            "Make the prohibition mysterious and intriguing - readers should wonder what might happen if it's broken.",
            "The warning often protects your hero from real danger, but also creates curiosity.",
            "Show why the rule exists - is it to protect from a monster, a curse, or getting lost?",
            "Your hero should understand the warning but also feel curious about what they're being warned against.",
            "The best warnings create tension between safety and adventure.",
            "Use this moment to show the relationship between your hero and the person giving the warning."
        ],
        writingPrompts: [
            "Before _____ left, they looked seriously at _____ and said, 'Whatever you do, never _____.'",
            "'Promise me,' said _____, 'that you will stay away from _____. It's far too dangerous.'",
            "The old _____ warned _____, 'If you ever see _____, run as fast as you can and don't look back.'",
            "'Remember,' whispered _____, 'never trust anyone who _____.'",
            "_____ made _____ promise three times: 'Never _____, never _____, and never _____!'"
        ],
        tips: [
            "Make the warning specific and mysterious",
            "The prohibition should be something tempting to break",
            "Show the character giving the warning cares about the hero",
            "Create curiosity about what lies beyond the forbidden",
            "The warning often foreshadows what will happen later"
        ]
    },

    3: {
        name: "Violation",
        shortName: "Violation",
        emoji: "🚫",
        description: "The interdiction or warning is violated",
        commonQuestions: [
            "Should my hero break the rules?", "How do I show rule breaking?", "What happens when warnings are ignored?",
            "Is it okay to violate rules?", "How do I make rule breaking interesting?", "What causes heroes to break rules?",
            "How do heroes violate warnings?", "What makes violation dramatic?"
        ],
        responses: [
            "Your hero's curiosity gets the better of them and they break the rule - this is natural and creates adventure!",
            "Often heroes break rules for good reasons - to help someone, solve a mystery, or protect others.",
            "Show your hero thinking about the warning but deciding the risk is worth it for something important.",
            "The rule breaking should feel like a brave choice, not just being naughty.",
            "Your hero might break the rule accidentally while trying to help someone else.",
            "Show the internal struggle - your hero remembers the warning but chooses to act anyway.",
            "The violation often happens because your hero's good heart compels them to help despite the danger.",
            "This moment shows your hero's courage and willingness to take risks for others."
        ],
        writingPrompts: [
            "Despite the warning, _____ couldn't help but _____ because _____.",
            "_____ remembered the rule about _____, but when they saw _____, they had to _____.",
            "The moment _____ stepped into the forbidden _____, they knew there was no turning back.",
            "_____ had promised to stay away, but the sound of _____ made them forget all about the warning.",
            "Even though _____ knew it was forbidden, they opened the _____ to help _____."
        ],
        tips: [
            "Make the rule breaking feel justified and brave",
            "Show your hero's internal struggle before breaking the rule",
            "The violation should advance the plot meaningfully",
            "Connect the rule breaking to your hero's good character",
            "This creates the inciting incident that starts the real adventure"
        ]
    },

    4: {
        name: "Reconnaissance",
        shortName: "Reconnaissance",
        emoji: "🔍",
        description: "The villain attempts to gain information about the hero",
        commonQuestions: [
            "How does the villain spy on my hero?", "What information should villains want?", "How do I show spying?",
            "What makes good reconnaissance?", "How do villains gather information?", "Should my hero know they're being watched?",
            "How do I create mystery?", "What do spies look for?"
        ],
        responses: [
            "The villain or their helpers secretly watch your hero to learn about their strengths, weaknesses, or plans.",
            "Show mysterious figures asking questions about your hero around town, or strange eyes watching from shadows.",
            "The villain might disguise themselves as a friendly person to get close and learn secrets.",
            "Your hero might notice they're being followed or feel like someone is watching them.",
            "Spies could be looking for your hero's daily routine, their friends and family, or what they care about most.",
            "Create an atmosphere of mystery - things seem normal but something feels slightly wrong.",
            "The villain wants to learn how to defeat your hero or what would hurt them most.",
            "This builds tension as readers know danger is coming even if your hero doesn't."
        ],
        writingPrompts: [
            "_____ didn't notice the strange _____ who had been asking questions about them all over town.",
            "From the shadows, _____ watched _____ carefully, learning all about their daily habits.",
            "The friendly stranger seemed very interested in _____, asking lots of questions about their family and friends.",
            "_____ felt like someone was watching them, but every time they turned around, no one was there.",
            "The mysterious _____ followed _____ from a distance, taking notes about everything they saw."
        ],
        tips: [
            "Create an atmosphere of mystery and suspicion",
            "The hero can be unaware or start to notice something is wrong",
            "This builds tension before the main conflict",
            "Show the villain's intelligence and planning",
            "Use this to make readers worry about your hero's safety"
        ]
    },

    5: {
        name: "Delivery",
        shortName: "Delivery",
        emoji: "📨",
        description: "Information about the hero is delivered to the villain",
        commonQuestions: [
            "How does the villain get information?", "What secrets should be revealed?", "How do spies report back?",
            "What information is dangerous to share?", "How do I show secrets being passed?", "What makes good spy information?",
            "How do villains receive reports?", "What intelligence matters most?"
        ],
        responses: [
            "The spy or scout returns to the villain with important information about your hero's plans, abilities, or weaknesses.",
            "Show the moment when the villain learns something crucial about your hero that changes their evil plans.",
            "The information delivered might be about your hero's greatest strength or their most precious secret.",
            "This creates danger because now the villain knows how to challenge your hero more effectively.",
            "The spy might report about your hero's friends, family, or what they care about most.",
            "Show the villain's reaction to receiving this crucial intelligence - maybe they smile wickedly or change their strategy.",
            "The delivered information often reveals your hero's vulnerability or what would motivate them most.",
            "This moment raises the stakes because now the villain has an advantage."
        ],
        writingPrompts: [
            "The spy whispered to _____, 'I've learned that _____'s greatest strength is _____, but their weakness is _____.'",
            "_____ smiled wickedly as they received the message: '_____ cares most about _____ and will do anything to protect _____.'",
            "The secret about _____'s _____ was now in the wrong hands, and danger was surely coming.",
            "'Perfect,' said _____ as they read the spy's report about _____'s daily routine.",
            "The villain's eyes gleamed as they learned that _____ always _____ at exactly _____."
        ],
        tips: [
            "The information should be something that will matter later in the story",
            "Show the villain's reaction to receiving this crucial intelligence",
            "This raises the stakes and creates more tension",
            "The intelligence should give the villain a real advantage",
            "Use this to show the villain's cunning and preparation"
        ]
    },

    6: {
        name: "Trickery",
        shortName: "Trickery",
        emoji: "🎭",
        description: "The villain attempts to deceive the hero",
        commonQuestions: [
            "How should the villain trick my hero?", "What makes a good disguise?", "How do I show deception?",
            "What kind of lies should villains tell?", "How do I make trickery believable?", "What are good villain tricks?",
            "How do villains deceive heroes?", "What makes convincing deception?"
        ],
        responses: [
            "The villain disguises themselves or uses clever lies to fool your hero into trusting them.",
            "Show the villain pretending to be helpful, friendly, or in need of assistance to get close to your hero.",
            "The trick might involve false promises, fake emergencies, or pretending to be someone else entirely.",
            "Your hero should have good reasons to believe the villain's deception - make it clever and convincing.",
            "The villain might disguise themselves as someone trustworthy like a merchant, traveler, or helper.",
            "Show how the villain's fake persona appeals to your hero's good nature and desire to help others.",
            "The deception should feel natural - your hero isn't being stupid, they're being kind and trusting.",
            "This trick often involves the villain offering exactly what your hero needs or wants most."
        ],
        writingPrompts: [
            "The kind old _____ offered to help _____, but their eyes held a secret that _____ couldn't see.",
            "_____ couldn't believe their luck when the friendly _____ offered them exactly what they needed most.",
            "Disguised as a _____, the villain approached _____ with a tale so sad that _____ couldn't help but believe it.",
            "'What a coincidence!' said the stranger, 'I happen to have exactly what you're looking for.'",
            "The helpful _____ seemed to know exactly what _____ was worried about and offered the perfect solution."
        ],
        tips: [
            "Make the deception clever and believable",
            "Show why your hero would naturally trust the villain",
            "The trick should advance the villain's evil plan",
            "Appeal to your hero's good nature and helpfulness",
            "The disguise should be something that would naturally gain trust"
        ]
    },

    7: {
        name: "Complicity",
        shortName: "Complicity",
        emoji: "🤝",
        description: "The hero is deceived and unknowingly helps the villain",
        commonQuestions: [
            "How does my hero accidentally help the villain?", "What mistakes should heroes make?", "How do I show good intentions gone wrong?",
            "How do heroes get tricked?", "What makes complicity believable?", "How do I show heroes being fooled?",
            "How do good actions help villains?", "What makes innocent mistakes?"
        ],
        responses: [
            "Your hero, trying to be kind and helpful, accidentally does exactly what the villain wants them to do.",
            "Show your hero's good heart leading them to make a choice that seems right but helps the villain's plan.",
            "The hero might give information, deliver a message, or provide help without realizing it's for an evil purpose.",
            "This isn't your hero being foolish - it's their kindness being taken advantage of by someone cruel.",
            "Your hero might unlock a door, reveal a secret, or lead someone somewhere, all while trying to be helpful.",
            "Show how your hero's natural goodness and trust makes them vulnerable to the villain's manipulation.",
            "The complicity should feel completely natural - anyone with a good heart would make the same choice.",
            "This creates sympathy for your hero and shows how villains exploit the kindness of others."
        ],
        writingPrompts: [
            "Wanting to help, _____ gladly _____, not knowing they were actually helping _____ succeed in their evil plan.",
            "_____ felt good about helping the poor _____, unaware that they had just delivered _____ exactly what they needed.",
            "With the best of intentions, _____ told the stranger about _____, not realizing this information would be used for evil.",
            "_____ happily showed the lost _____ the way to _____, not knowing they were leading them to their target.",
            "When _____ asked for help finding _____, _____ was eager to assist, not suspecting any evil motives."
        ],
        tips: [
            "Show your hero's good intentions clearly",
            "The complicity should feel natural, not forced",
            "This creates sympathy for your hero rather than blame",
            "Demonstrate how villains exploit goodness and trust",
            "The hero's action should significantly help the villain's plan"
        ]
    },

    8: {
        name: "Villainy",
        shortName: "Villainy",
        emoji: "⚔️",
        description: "The villain causes harm, creates a problem, or commits evil acts",
        commonQuestions: [
            "What kind of problem should happen?", "How do I create a good villain?", "What should the villain do?",
            "How do I make conflict interesting?", "What makes a story problem exciting?", "How do I show something bad happening?",
            "What evil acts work in stories?", "How do I create the main conflict?"
        ],
        responses: [
            "Something goes wrong that only your hero can fix! Maybe someone gets captured, something magical is stolen, or a spell is cast.",
            "Your villain doesn't have to be scary - they could be jealous, greedy, or just make bad choices.",
            "The problem should threaten something your hero cares about - their family, friends, home, or something precious.",
            "Show the villain's actions affecting the hero's world in a meaningful way.",
            "Make the problem big enough to require a real adventure to solve it.",
            "Your villain could be tricky rather than scary - using puzzles, riddles, or challenges.",
            "The villainy creates the main quest or mission for your hero to undertake.",
            "Remember, this problem will make your hero grow stronger and braver by solving it!"
        ],
        writingPrompts: [
            "Suddenly, _____ appeared and _____, threatening to _____ unless _____.",
            "One dark night, the evil _____ crept into _____ and stole the precious _____.",
            "The wicked _____ cast a spell that made _____ disappear from _____.",
            "_____ gasped in horror as they discovered that _____ had _____.",
            "The jealous _____ couldn't stand that _____ was _____, so they decided to _____."
        ],
        tips: [
            "Make the villain's motivation clear - why are they doing this?",
            "The problem should be solvable through courage and cleverness",
            "Connect the villainy to something the hero cares deeply about",
            "Balance making it serious but not too scary for young readers",
            "This moment changes everything and starts the real adventure"
        ]
    },

    "8.1": {
        name: "Lack",
        shortName: "Lack",
        emoji: "❓",
        description: "Something important is missing or lacking",
        commonQuestions: [
            "What should be missing in my story?", "How do I show something lacking?", "What makes a good missing thing?",
            "How does lack create story?", "What should my hero need to find?", "How do I show emptiness or loss?",
            "What important things can be missing?", "How do I create a sense of loss?"
        ],
        responses: [
            "Something important is missing from your hero's world - maybe a magical item, a missing person, or lost knowledge.",
            "The lack creates a quest or mission for your hero to fill the emptiness and restore balance.",
            "Show how the missing thing affects everyone in your hero's world, making life harder or sadder.",
            "Your hero feels called to find what's missing and bring it back to help their community.",
            "The lack might be something that was stolen, lost, forgotten, or hidden long ago.",
            "Show how life was better when this thing wasn't missing, and how everyone hopes for its return.",
            "The missing element should be something that would make a real difference when restored.",
            "Your hero might be the only one who can find and restore what's been lost."
        ],
        writingPrompts: [
            "Ever since the _____ disappeared, the kingdom had been _____ and people felt _____.",
            "_____ noticed that without _____, nothing in _____ worked the way it should.",
            "The village elder sighed, 'If only we still had the _____, then we could _____.'",
            "The old stories told of a time when _____ had the _____, but now it was lost forever.",
            "Everyone remembered how wonderful life was before the _____ went missing from _____."
        ],
        tips: [
            "Make the missing thing clearly important to the community",
            "Show the effects of the lack on daily life",
            "The hero should feel personally motivated to restore what's missing",
            "Connect the lack to the overall well-being of the story world",
            "The restoration should promise to make things significantly better"
        ]
    },

    9: {
        name: "Mediation",
        shortName: "Mediation",
        emoji: "📢",
        description: "The misfortune or lack is made known; the hero is approached for help",
        commonQuestions: [
            "How does my hero learn about the problem?", "Who asks for help?", "How do I show the call to adventure?",
            "What makes a good messenger?", "How do I show my hero being chosen?", "When should help be requested?",
            "How do people ask heroes for help?", "What makes a compelling plea?"
        ],
        responses: [
            "A messenger, friend, or someone in need approaches your hero and asks for their help with the big problem.",
            "Show your hero learning about the trouble and feeling called to do something about it.",
            "The person asking for help should explain why your hero is the right one for this important mission.",
            "This is the moment your hero realizes they have a chance to make a real difference in the world.",
            "The messenger might be desperate, hopeful, or urgent - they really need your hero's help.",
            "Show how the news of the problem affects your hero emotionally - do they feel called to help?",
            "The request for help should feel like destiny calling - your hero was meant for this moment.",
            "This is when your hero transitions from living a normal life to becoming a true hero."
        ],
        writingPrompts: [
            "The worried _____ rushed to _____ and said, 'You're the only one who can help us with _____!'",
            "_____ had heard the stories about _____'s courage, so they came to ask for help with _____.",
            "When _____ learned about the terrible _____, they knew they had to find someone brave enough to _____.",
            "The desperate _____ fell to their knees before _____ and begged, 'Please, you must help us _____!'",
            "_____ received a message that said, 'The kingdom needs a hero like you to _____. Will you come?'"
        ],
        tips: [
            "Make the request for help feel urgent and important",
            "Show why this particular hero is needed",
            "Create a clear sense of purpose and mission",
            "The messenger should convey the seriousness of the situation",
            "This is the official start of the hero's quest"
        ]
    },

    10: {
        name: "Counteraction",
        shortName: "Counteraction",
        emoji: "⚡",
        description: "The hero decides to act and counteract the misfortune",
        commonQuestions: [
            "How does my hero accept the quest?", "What makes heroes say yes?", "How do I show determination?",
            "When should my hero decide to help?", "How do I show courage in decision-making?", "What motivates heroes?",
            "How do heroes commit to quests?", "What makes brave decisions?"
        ],
        responses: [
            "Your hero makes the brave decision to help! They accept the quest and commit to solving the problem.",
            "Show your hero's inner thoughts as they decide between safety and doing what's right.",
            "This is a moment of courage - your hero chooses to face danger to help others.",
            "Your hero might feel scared but decides to be brave anyway because someone needs their help.",
            "The decision should feel weighty - your hero knows this choice will change their life forever.",
            "Show how your hero's values and caring nature drive them to accept this dangerous mission.",
            "Your hero realizes that they have the power to make a difference and chooses to use it.",
            "This moment transforms your character from an ordinary person into a true hero."
        ],
        writingPrompts: [
            "_____ took a deep breath and said, 'I'll do it. I'll help you _____.'",
            "Even though _____ felt nervous, they knew they couldn't let _____ suffer, so they agreed to _____.",
            "_____ looked determined as they declared, 'I won't let _____ get away with this!'",
            "'I don't know if I can do it,' said _____, 'but I have to try to _____.'",
            "_____ felt the weight of responsibility as they promised, 'I will find a way to _____.'",
        ],
        tips: [
            "Show both the hero's fear and their courage",
            "Make the decision feel weighty and important",
            "Connect the hero's choice to their values and caring nature",
            "This is a character-defining moment",
            "The decision should feel both brave and natural to who your hero is"
        ]
    },

    11: {
        name: "Departure",
        shortName: "Departure",
        emoji: "🗺️",
        description: "The hero leaves home and begins the journey",
        commonQuestions: [
            "How does my hero start their journey?", "What should my hero take with them?", "How do I show leaving home?",
            "What feelings should my hero have?", "How do I begin the adventure?", "What happens when the hero leaves?",
            "How do heroes say goodbye?", "What makes a good departure scene?"
        ],
        responses: [
            "Your hero takes their first brave step into the unknown! They leave their safe, familiar world to face the adventure.",
            "Show your hero's mixed feelings - excited for adventure but maybe a little scared or sad to leave home.",
            "Describe what your hero packs or takes with them - both practical items and things that remind them of home.",
            "This is a big moment! Your hero is choosing to be brave and face the problem that needs solving.",
            "Show the contrast between the safe world they're leaving and the mysterious world they're entering.",
            "Your hero might get help, advice, or a special gift before they go.",
            "Describe the moment of stepping over the threshold - leaving the familiar behind.",
            "This departure shows your hero's courage and commitment to helping others."
        ],
        writingPrompts: [
            "With a deep breath and a brave heart, _____ stepped out of _____ and began walking toward _____.",
            "_____ packed their _____ and _____, kissed _____ goodbye, and set off on the path to _____.",
            "As _____ walked away from _____, they looked back once and then faced forward toward their destiny.",
            "The journey to _____ would be long and dangerous, but _____ knew they had to _____.",
            "_____ had never been beyond _____ before, but now they walked bravely toward _____."
        ],
        tips: [
            "This is a pivotal moment - treat it with importance",
            "Show both excitement and nervousness in your hero",
            "Describe the physical act of leaving clearly",
            "Include emotional goodbyes or meaningful gifts",
            "This marks the transition from ordinary world to adventure"
        ]
    },

    12: {
        name: "Test",
        shortName: "Test",
        emoji: "🎯",
        description: "The hero is tested, interrogated, or challenged by a magical being",
        commonQuestions: [
            "What kind of test should my hero face?", "Who should test my hero?", "How do I create challenges?",
            "What makes a good test?", "How should magical beings challenge heroes?", "What tests show character?",
            "How do I create meaningful challenges?", "What makes tests important?"
        ],
        responses: [
            "Your hero meets someone magical or wise who gives them a challenge to see if they're truly worthy of help.",
            "The test might be a riddle, a task requiring kindness, or a challenge that shows your hero's true character.",
            "Show your hero thinking carefully about how to respond - the test reveals what's in their heart.",
            "These challenges often involve being kind to strangers, sharing with those in need, or solving clever puzzles.",
            "The tester could be disguised as someone ordinary - an old person, a child, or someone asking for help.",
            "Your hero shouldn't know they're being tested - they should just act according to their nature.",
            "The best tests reveal your hero's values, kindness, wisdom, or courage in natural ways.",
            "Tests often come at moments when your hero is tired, hungry, or focused on their mission."
        ],
        writingPrompts: [
            "The mysterious _____ looked at _____ carefully and said, 'Before I help you, you must _____.'",
            "_____ encountered a _____ who asked, 'If you found _____, what would you do with it?'",
            "The ancient _____ smiled and posed a riddle: '_____. Can you solve this, young hero?'",
            "An old _____ approached _____ and asked, 'Could you spare some _____ for someone in need?'",
            "The wise _____ presented three doors and said, 'Choose carefully, for your choice reveals your heart.'"
        ],
        tips: [
            "Make the test reveal your hero's good character",
            "The challenge should feel meaningful, not arbitrary",
            "Tests often involve moral choices or demonstrations of virtue",
            "Your hero should respond instinctively based on their values",
            "The test should feel natural within the story flow"
        ]
    },

    13: {
        name: "Reaction",
        shortName: "Reaction",
        emoji: "⭐",
        description: "The hero reacts to the test or challenge",
        commonQuestions: [
            "How should my hero respond to tests?", "What's the right way to react?", "How do I show good character?",
            "What reactions show heroism?", "How do heroes pass tests?", "What makes a good response?",
            "How do I show my hero's values?", "What makes heroic reactions?"
        ],

        responses: [
            "Your hero responds to the test by showing their good heart - being kind, generous, honest, or brave.",
            "Show your hero choosing to do the right thing even when it's difficult or requires sacrifice.",
            "The hero's reaction reveals their true character and proves they deserve help on their quest.",
            "Your hero might share their food, tell the truth, help someone in need, or show respect for others.",
            "The reaction should come naturally from your hero's personality - they don't think, they just act with kindness.",
            "Show your hero putting others' needs before their own comfort or convenience.",
            "Your hero's good reaction often surprises the tester with how genuinely caring they are.",
            "The response demonstrates that your hero has the heart of a true hero, not just the courage."
        ],
        writingPrompts: [
            "Without hesitation, _____ _____ because they knew it was the right thing to do.",
            "_____ thought for a moment and then kindly offered to _____ for the stranger.",
            "Even though it meant _____, _____ chose to _____ because they cared about helping others.",
            "'Of course I'll help,' said _____, immediately sharing their _____ with the _____.",
            "_____ couldn't stand to see _____ in need, so they quickly _____."
        ],
        tips: [
            "Show your hero's instinctive goodness",
            "The reaction should feel natural to the hero's character",
            "Good reactions often involve sacrifice or putting others first",
            "Don't make your hero think too much - let them act from the heart",
            "This proves your hero deserves the magical help they'll receive"
        ]
    },

    14: {
        name: "Receipt",
        shortName: "Receipt",
        emoji: "🎁",
        description: "The hero receives a magical agent, helper, or special item",
        commonQuestions: [
            "What kind of help should my hero get?", "What makes a good magical item?", "Who should help my hero?",
            "How do I give my hero special powers?", "What kind of gift fits my story?", "How does my hero earn help?",
            "What magical helpers work well?", "How do heroes receive aid?"
        ],
        responses: [
            "Your hero receives something special that will help them succeed! It could be a magical item, a wise friend, or special knowledge.",
            "The help often comes after your hero shows kindness, courage, or wisdom - they earn it through good actions.",
            "Magic items could be practical (a sword, map, or key) or wonderful (flying shoes, invisible cloak, or talking animal).",
            "A helper might be a wise old person, a magical creature, or even another child with special skills.",
            "The gift should match your story's theme and help solve the specific problem your hero faces.",
            "Show your hero being grateful and responsible with whatever help they receive.",
            "The magical help levels the playing field - it gives your hero what they need to face the challenge.",
            "Sometimes the 'magic' is actually the hero discovering their own inner strength or talent!"
        ],
        writingPrompts: [
            "The kind _____ smiled and handed _____ a magical _____ that would help them _____.",
            "_____ had shown such kindness that the fairy godmother decided to give them _____.",
            "'You will need this,' said the wise _____, placing a _____ in _____'s hands.",
            "As a reward for their brave heart, _____ received the power to _____.",
            "The magical _____ appeared just when _____ needed it most, offering to _____."
        ],
        tips: [
            "The help should feel earned, not just given randomly",
            "Match the magical help to your story's tone and theme",
            "Show your hero learning to use their new gift or ally",
            "The help should be significant but not make things too easy",
            "This gift often becomes crucial in the final victory"
        ]
    },

    15: {
        name: "Arrival",
        shortName: "Arrival",
        emoji: "🎯",
        description: "The hero arrives at the destination or location of the quest object",
        commonQuestions: [
            "How does my hero reach their destination?", "What should my hero find when they arrive?", "How do I show arrival?",
            "What makes a good destination?", "How do I describe the important place?", "What should happen upon arrival?"
        ],
        responses: [
            "Your hero finally reaches the place where they need to solve the problem or face the challenge.",
            "Describe what your hero sees and feels as they arrive at this important, maybe dangerous place.",
            "This is often where the villain lives, where the missing thing is hidden, or where the final challenge waits.",
            "Show your hero's emotions - are they nervous, excited, determined, or awed by what they see?",
            "The destination should feel significant and match the importance of your hero's quest.",
            "Your hero might need to use their magical help or special skills to reach or enter this place.",
            "This location often tests your hero's courage just by being intimidating or mysterious.",
            "The arrival marks the beginning of the most dangerous part of the adventure."
        ],
        writingPrompts: [
            "After a long journey, _____ finally arrived at _____ and saw _____.",
            "_____ stood before the magnificent _____ and took a deep breath, knowing that _____ awaited inside.",
            "The _____ loomed ahead of _____, looking both _____ and _____ in the fading light.",
            "_____ had finally reached _____, the place where they would _____ or _____ trying.",
            "As _____ approached the _____, they could feel the _____ in the air around them."
        ],
        tips: [
            "Build anticipation for what's about to happen",
            "Describe the setting vividly to create atmosphere",
            "Show your hero's emotional state at this crucial moment",
            "The destination should feel worthy of the journey to reach it",
            "This is the calm before the storm of the main conflict"
        ]
    },

    16: {
        name: "Struggle",
        shortName: "Struggle",
        emoji: "⚔️",
        description: "The hero and villain engage in direct combat or competition",
        commonQuestions: [
            "How should my hero fight?", "What makes a good battle?", "How do I show conflict?",
            "What kind of struggle fits my story?", "How do heroes face villains?", "What makes exciting confrontation?"
        ],
        responses: [
            "Your hero faces their biggest challenge! This could be a battle, a contest, or a difficult problem to solve.",
            "Show your hero using everything they've learned - their courage, magical help, and good friends.",
            "The struggle should be exciting but not too scary - focus on bravery and clever solutions.",
            "Your hero might need to solve puzzles, answer riddles, or show their wit rather than just fighting.",
            "This is where all your hero's growth and preparation pays off in the climactic confrontation.",
            "The struggle should test not just your hero's strength, but their character, wisdom, and heart.",
            "Show how your hero's good qualities help them in ways that simple force could not.",
            "This confrontation proves that your hero truly deserves to win through their goodness and growth."
        ],
        writingPrompts: [
            "_____ took a deep breath and faced _____ in the ultimate test of _____.",
            "The final confrontation had arrived - _____ versus _____ with _____ hanging in the balance.",
            "_____ called upon all their courage and _____ as they challenged _____ to _____.",
            "Using their _____ and the power of _____, _____ stood ready to face _____.",
            "This was the moment _____ had trained for - time to prove that _____ could overcome _____."
        ],
        tips: [
            "Make the struggle feel earned and important",
            "Show the hero's growth through how they handle conflict",
            "Focus on cleverness and character over violence",
            "This should be the most exciting part of your story",
            "Let your hero's good qualities be their greatest weapons"
        ]
    },

    17: {
        name: "Branding",
        shortName: "Branding",
        emoji: "🏷️",
        description: "The hero is marked, branded, or wounded during the struggle",
        commonQuestions: [
            "How does my hero get marked?", "What kind of mark should heroes get?", "How do I show proof of the struggle?",
            "What makes a good hero's mark?", "How do heroes bear signs of their battles?", "What marks show courage?"
        ],
        responses: [
            "Your hero gets a mark or sign that proves they faced the big challenge - like a scar, a special item, or a symbol.",
            "This mark shows everyone that your hero was brave enough to face danger and fight for what's right.",
            "The mark might be visible or invisible, but it's proof of your hero's courage and experience.",
            "Your hero might receive a special badge, earn a scar, or gain a magical symbol during the struggle.",
            "The branding shows that your hero has been changed by their brave actions - they're not the same person anymore.",
            "This mark often becomes something your hero wears with pride, showing their growth and courage.",
            "The sign might be something that helps others recognize your hero as someone who can be trusted.",
            "This proof of courage often inspires others and shows them that heroes are real."
        ],
        writingPrompts: [
            "After the battle, _____ bore the _____ that would always remind them of _____.",
            "The _____ left a _____ on _____, marking them forever as someone who had faced _____.",
            "_____ looked at their new _____ and felt proud, knowing it proved they had _____.",
            "From that day forward, everyone could see that _____ was different because of the _____ they carried.",
            "The _____ became _____'s badge of honor, showing the world that they had overcome _____."
        ],
        tips: [
            "The mark should feel meaningful, not just decorative",
            "Connect it to the hero's growth and experience",
            "This can be physical or symbolic",
            "The mark often becomes important for recognition later",
            "It should represent positive change from the struggle"
        ]
    },

    18: {
        name: "Victory",
        shortName: "Victory",
        emoji: "🏆",
        description: "The villain is defeated and evil is overcome",
        commonQuestions: [
            "How should my hero win?", "What makes a good victory?", "How do I defeat the villain?",
            "How should the problem be solved?", "What makes victory satisfying?", "How do I show my hero succeeding?"
        ],
        responses: [
            "Your hero wins by using everything they've learned on their journey! Show how their courage, kindness, and cleverness lead to victory.",
            "The best victories come from the hero's growth, not just strength - maybe they win through wisdom, friendship, or compassion.",
            "Your hero might defeat the villain, break a curse, solve a puzzle, or rescue someone important.",
            "Show the moment when your hero realizes they have the power to overcome the challenge.",
            "Victory often comes from using the magical help or lessons learned during the adventure.",
            "Sometimes victory means changing the villain's heart rather than destroying them.",
            "The triumph should feel earned - your hero has grown and changed through the journey.",
            "This is the climax of your story - make it exciting and emotionally satisfying!"
        ],
        writingPrompts: [
            "With all the courage they had learned, _____ faced _____ and declared, '_____!'",
            "Using the magical _____ and their own brave heart, _____ finally defeated _____.",
            "_____ realized that the real power was inside them all along, and they _____.",
            "The moment _____ stood up to _____, everything changed, and _____.",
            "Through cleverness, kindness, and courage, _____ found a way to _____."
        ],
        tips: [
            "Make the victory feel earned through the hero's growth",
            "Use elements from earlier in the story to achieve victory",
            "Show the hero's character development in how they win",
            "The victory should resolve the main conflict satisfyingly",
            "Balance excitement with the emotional payoff of success"
        ]
    },

    19: {
        name: "Liquidation",
        shortName: "Liquidation",
        emoji: "✅",
        description: "The initial misfortune or lack is resolved",
        commonQuestions: [
            "How is the problem solved?", "What gets fixed after victory?", "How do I show resolution?",
            "What changes after the hero wins?", "How do I restore what was wrong?", "What gets better?"
        ],
        responses: [
            "The original problem is finally solved! The curse is broken, the missing thing is returned, or the danger is removed.",
            "Show how your hero's victory fixes what was wrong and makes the world better for everyone.",
            "People are rescued, magic is restored, or peace returns to the land because of your hero's brave actions.",
            "The thing that was lost or broken at the beginning of your story is now fixed or found.",
            "Your hero's success brings healing, joy, or restoration to their world.",
            "Show the positive changes that ripple out from your hero's victory - how it affects everyone.",
            "This is when the world returns to balance, but better than it was before because of what your hero learned.",
            "The resolution should feel complete - the problem that started everything is truly solved."
        ],
        writingPrompts: [
            "With _____ defeated, _____ was finally restored and _____ returned to normal.",
            "The moment _____ was broken, _____ began to _____ throughout the land.",
            "_____ watched with joy as _____ was returned to _____ where it belonged.",
            "Peace settled over _____ as the _____ finally ended and _____ was safe again.",
            "The _____ that had been missing for so long was restored, and _____ celebrated."
        ],
        tips: [
            "Show the positive effects of the hero's success",
            "Connect back to the original problem from the beginning",
            "Make the resolution feel complete and satisfying",
            "Show how the hero's actions benefit the whole community",
            "This sets up the happy ending that's coming"
        ]
    },

    20: {
        name: "Return",
        shortName: "Return",
        emoji: "🔄",
        description: "The hero sets out to return home",
        commonQuestions: [
            "How does my hero go home?", "What happens on the return journey?", "Should heroes return changed?",
            "How do I show the journey back?", "What should my hero think about?", "How has my hero changed?"
        ],
        responses: [
            "Your hero begins the journey home, but they're different now - wiser, braver, and more confident.",
            "The return journey might be peaceful or have new adventures, but your hero is ready for anything now.",
            "Show how your hero thinks about everything they've learned and the friends they've made.",
            "Your hero carries with them the lessons, memories, and growth from their amazing adventure.",
            "The journey home gives your hero time to reflect on how much they've changed and grown.",
            "Your hero might be excited to share their story and help others with what they've learned.",
            "The return should feel different from the departure - your hero is no longer the same person.",
            "This journey home is triumphant rather than fearful - your hero has proven themselves."
        ],
        writingPrompts: [
            "_____ began the journey home, thinking about all the amazing things that had happened.",
            "As _____ walked back toward _____, they felt _____ and ready to _____.",
            "The path home seemed shorter somehow, and _____ felt _____ with each step.",
            "_____ carried _____ with them as they returned to _____, knowing that _____.",
            "On the way home, _____ smiled as they remembered _____ and looked forward to _____."
        ],
        tips: [
            "Show how the hero has grown and changed",
            "The return can be reflective and peaceful",
            "Let your hero think about their experiences",
            "This is a time for your hero to process what they've learned",
            "The journey home should feel victorious and hopeful"
        ]
    },

    21: {
        name: "Pursuit",
        shortName: "Pursuit",
        emoji: "🏃",
        description: "The hero is pursued by enemies or dangers",
        commonQuestions: [
            "Who should chase my hero?", "How do I create exciting chase scenes?", "What makes good pursuit?",
            "Why would enemies follow my hero?", "How do I show danger following?", "What creates tension in chases?"
        ],
        responses: [
            "Your hero is chased by enemies or dangers as they try to escape with their victory or get home safely.",
            "The pursuit creates excitement and shows that your hero's success has made some people very angry.",
            "Show your hero using their wits, speed, or magical help to stay ahead of their pursuers.",
            "The chase might be the villain's last attempt to stop your hero or get revenge.",
            "Create tension by showing how close the danger gets and how clever your hero must be to escape.",
            "Your hero might need to use everything they've learned to outrun or outsmart their pursuers.",
            "The pursuit often brings out your hero's quick thinking and resourcefulness.",
            "This adds one final exciting challenge before your hero can truly be safe."
        ],
        writingPrompts: [
            "_____ could hear the _____ getting closer as they ran as fast as they could toward _____.",
            "Looking back, _____ saw _____ chasing them and knew they had to _____.",
            "The _____ were gaining on _____, but they remembered _____ and quickly _____.",
            "_____ ran through the _____, hoping to reach _____ before _____ caught up.",
            "With _____ right behind them, _____ used their _____ to _____."
        ],
        tips: [
            "Keep chase scenes exciting but not too scary",
            "Show your hero's cleverness in escaping",
            "The pursuit should feel like a natural consequence of the hero's success",
            "Use this to show how much your hero has grown in resourcefulness",
            "This adds final tension before the happy resolution"
        ]
    },

    22: {
        name: "Escape",
        shortName: "Escape",
        emoji: "🛡️",
        description: "The hero escapes from pursuit",
        commonQuestions: [
            "How should my hero escape?", "What makes a clever escape?", "How do heroes get away from danger?",
            "What helps heroes escape?", "How do I show successful evasion?", "What makes escapes exciting?"
        ],
        responses: [
            "Your hero cleverly escapes from danger using their wits, magic help, or brave friends.",
            "Show how your hero's growth and learning help them find a way to safety.",
            "The escape might involve using the magical gift, remembering important advice, or being helped by new friends.",
            "Your hero's cleverness and courage shine through as they outwit their pursuers.",
            "The escape should feel earned - your hero uses skills or knowledge gained during their adventure.",
            "Sometimes the escape involves kindness - maybe someone your hero helped earlier returns the favor.",
            "Your hero might use the environment, their magical items, or pure wit to get away safely.",
            "The successful escape proves your hero has become resourceful and capable through their journey."
        ],
        writingPrompts: [
            "Just when it seemed hopeless, _____ remembered _____ and quickly _____.",
            "Using the magical _____, _____ managed to _____ and escape from _____.",
            "_____ cleverly _____, and by the time _____ realized what happened, _____ was safely away.",
            "The _____ that _____ had helped earlier appeared and _____, allowing _____ to escape.",
            "_____ used their knowledge of _____ to _____ and leave _____ far behind."
        ],
        tips: [
            "Make the escape feel clever and well-deserved",
            "Show how the hero's journey has prepared them for this moment",
            "The escape can involve magical help, wit, or assistance from friends",
            "Keep it exciting but show the hero's growth and resourcefulness",
            "This proves your hero has become truly capable and clever"
        ]
    },

    23: {
        name: "Unrecognised Arrival",
        shortName: "Unrecognised",
        emoji: "👤",
        description: "The hero arrives home or at court unrecognized",
        commonQuestions: [
            "Why doesn't anyone recognize my hero?", "How has my hero changed?", "How do I show transformation?",
            "What makes heroes unrecognizable?", "How do adventures change people?", "Why might heroes hide their identity?"
        ],
        responses: [
            "Your hero returns home, but they've changed so much that people don't recognize them at first.",
            "The adventure has transformed your hero - they might look different, act more confident, or seem wiser.",
            "Show how your hero's experiences have changed them both inside and outside.",
            "Your hero might choose to keep their identity secret to see how people really are.",
            "The lack of recognition shows just how much your hero has grown during their adventure.",
            "People might see a stranger where they expect to see the same old person they knew before.",
            "Your hero's transformation proves that they've become someone new through their brave deeds.",
            "This creates an opportunity for your hero to observe and learn before revealing who they really are."
        ],
        writingPrompts: [
            "When _____ returned to _____, nobody recognized the confident _____ they had become.",
            "_____ smiled as they walked through _____, knowing that _____ would be surprised to learn who they really were.",
            "The people of _____ saw a _____ stranger, not realizing it was _____ who had left so long ago.",
            "_____ had changed so much during their adventure that even _____ didn't recognize them.",
            "Looking in the mirror, _____ barely recognized themselves - the adventure had changed them completely."
        ],
        tips: [
            "Show the dramatic change in your hero",
            "This proves how much the adventure has affected them",
            "The transformation should be both physical and emotional",
            "Use this to show your hero's growth and maturity",
            "This sets up the eventual recognition scene"
        ]
    },

    24: {
        name: "Unfounded Claims",
        shortName: "False Claims",
        emoji: "🎪",
        description: "A false hero presents unfounded claims or pretends to be the real hero",
        commonQuestions: [
            "Who should pretend to be the hero?", "How do false heroes claim credit?", "What lies do impostors tell?",
            "How do I show someone taking credit?", "What makes good false claims?", "Why do people lie about being heroes?"
        ],
        responses: [
            "Someone pretends to be the hero or takes credit for your hero's brave deeds.",
            "The false hero might be jealous, greedy, or just want the attention and rewards that heroes receive.",
            "Show how this impostor tells lies about doing the heroic deeds that your real hero actually accomplished.",
            "The false hero might have some 'proof' or story that makes people believe them at first.",
            "This creates injustice that needs to be resolved - the real hero deserves proper recognition.",
            "The impostor usually can't answer detailed questions about the adventure or lacks the real proof.",
            "This situation tests your hero's character - how do they respond to someone stealing their glory?",
            "The false claims create drama and give your hero a chance to prove their true identity."
        ],
        writingPrompts: [
            "_____ was shocked to discover that _____ was telling everyone that they had _____.",
            "The boastful _____ claimed to be the one who had _____ and defeated _____.",
            "'I am the hero who saved _____!' declared _____, even though _____ knew it wasn't true.",
            "_____ listened in amazement as _____ took credit for all of _____'s brave deeds.",
            "The false hero waved a _____ around, claiming it proved they had _____."
        ],
        tips: [
            "Make the false claims obviously wrong to readers",
            "Show why the impostor wants to claim to be the hero",
            "This creates a problem that needs solving through proof",
            "Use this to show your hero's honest character",
            "The false claims usually fall apart under close examination"
        ]
    },

    25: {
        name: "Difficult Task",
        shortName: "Task",
        emoji: "🏔️",
        description: "A difficult task or challenge is proposed to the hero",
        commonQuestions: [
            "What impossible task should I give?", "How do I create the final test?", "What makes tasks difficult?",
            "What kind of challenge proves heroism?", "How do heroes face impossible tasks?", "What tests are meaningful?"
        ],
        responses: [
            "Your hero is given one final, seemingly impossible challenge to prove they're the true hero.",
            "The task should be something that only the real hero could accomplish with their special knowledge or abilities.",
            "This challenge tests everything your hero has learned and all the growth they've achieved.",
            "The difficult task might involve using the magical gift, remembering crucial information, or showing specific skills.",
            "Only someone who actually went on the adventure would know how to complete this challenge.",
            "The task separates the true hero from any false claimants or pretenders.",
            "Your hero approaches this final test with confidence, knowing they have what it takes to succeed.",
            "This ultimate challenge proves once and for all that your hero is genuine and deserving of recognition."
        ],
        writingPrompts: [
            "_____ was told, 'If you are truly the hero, then you must be able to _____.'",
            "The final challenge was announced: 'Only the real hero can _____ using _____.'",
            "_____ stepped forward confidently when asked to demonstrate how they had _____.",
            "'Prove you are the true hero,' demanded _____, 'by showing us how to _____.'",
            "The impossible task seemed easy to _____, who remembered exactly how to _____."
        ],
        tips: [
            "Make the task something only your hero could know or do",
            "Connect it to specific experiences from their adventure",
            "Your hero should feel confident about this challenge",
            "The task should clearly distinguish the real hero from fakes",
            "This is the final proof of your hero's authenticity"
        ]
    },

    26: {
        name: "Solution",
        shortName: "Solution",
        emoji: "🎯",
        description: "The task is accomplished and the challenge is met",
        commonQuestions: [
            "How does my hero solve the impossible task?", "What makes a satisfying solution?", "How do heroes succeed?",
            "How do I show the hero accomplishing the challenge?", "What proves the hero's authenticity?", "How do solutions work?"
        ],
        responses: [
            "Your hero accomplishes the impossible task through cleverness, courage, and everything they've learned.",
            "The solution comes naturally to your hero because they actually experienced the adventure.",
            "Show how your hero's real knowledge and abilities make the 'impossible' task easy for them.",
            "Your hero succeeds where others fail because they have the genuine experience and wisdom.",
            "The solution proves beyond doubt that your hero is the real one who accomplished the heroic deeds.",
            "Your hero's success demonstrates all the growth, learning, and change that happened during their journey.",
            "The way your hero solves the challenge reveals their true character and authentic experience.",
            "This moment vindicates your hero and proves that truth and authenticity always win in the end."
        ],
        writingPrompts: [
            "_____ smiled and easily _____, proving they were the true hero who had _____.",
            "While others struggled, _____ calmly _____ because they remembered _____.",
            "The solution was obvious to _____, who had learned _____ during their adventure.",
            "_____ accomplished the task perfectly, using the _____ exactly as _____ had taught them.",
            "Everyone gasped in amazement as _____ solved the impossible challenge by _____."
        ],
        tips: [
            "Make the solution feel natural and earned",
            "Show how the hero's real experience makes this possible",
            "The success should vindicate your hero completely",
            "Connect the solution to specific learning from the adventure",
            "This proves your hero's authenticity beyond any doubt"
        ]
    },

    27: {
        name: "Recognition",
        shortName: "Recognition",
        emoji: "👁️",
        description: "The hero is recognized as the true hero",
        commonQuestions: [
            "How is my hero finally recognized?", "What makes people realize the truth?", "How do I show recognition?",
            "When should the hero be revealed?", "How do people react to recognizing the hero?", "What proves identity?"
        ],
        responses: [
            "Everyone finally realizes that your hero is the true hero who saved the day!",
            "The recognition might come from solving the difficult task, showing special knowledge, or revealing the hero's mark.",
            "Show people's amazement and joy as they realize the true hero has been among them.",
            "Your hero's identity is revealed through their actions, wisdom, or physical proof of their adventure.",
            "The moment of recognition should feel triumphant and emotionally satisfying.",
            "People might recognize your hero's voice, manner, special knowledge, or the mark they received.",
            "The recognition scene celebrates your hero's growth and transformation during their adventure.",
            "This is when your hero receives the acknowledgment and respect they truly deserve."
        ],
        writingPrompts: [
            "Suddenly, _____ gasped and exclaimed, 'You're _____! You're the hero who _____!'",
            "The moment _____ saw _____, they knew immediately that this was their beloved hero.",
            "Recognition dawned on everyone's faces as they realized _____ was the one who had _____.",
            "'I should have known!' cried _____, 'Only _____ could have _____ so brilliantly!'",
            "The crowd erupted in cheers as they finally recognized _____ as their true hero."
        ],
        tips: [
            "Make the recognition moment emotionally powerful",
            "Show people's joy and amazement at the revelation",
            "The recognition should feel well-deserved and triumphant",
            "Connect it to specific proof or actions that reveal identity",
            "This validates your hero's journey and transformation"
        ]
    },

    28: {
        name: "Exposure",
        shortName: "Exposure",
        emoji: "🔦",
        description: "The false hero or villain is exposed and their lies revealed",
        commonQuestions: [
            "How are the villains exposed?", "What reveals the lies?", "How do I show the truth?",
            "What happens to false heroes?", "How are deceptions revealed?", "What exposes dishonesty?"
        ],
        responses: [
            "The fake hero or remaining villains are revealed and their lies are exposed to everyone.",
            "Truth comes to light and people see the deception that was hiding the real story.",
            "The exposure might happen through evidence, witnesses, or the villains' own mistakes.",
            "Show how lies and deception can't stand up to truth and honest investigation.",
            "The false hero or villain is revealed to be a fraud, liar, or deceiver.",
            "People feel angry or betrayed when they realize how they were fooled by the deception.",
            "Justice begins as the truth is revealed and the real hero is distinguished from the fake.",
            "This exposure clears the way for your hero to receive proper recognition and reward."
        ],
        writingPrompts: [
            "The truth was revealed when _____ couldn't explain how they had _____.",
            "_____ was exposed as a fraud when _____ proved that they had never _____.",
            "Everyone saw through the lies when _____ failed to _____ like the real hero could.",
            "The deception crumbled when _____ showed that _____ was lying about _____.",
            "_____ stood exposed as people realized they had been deceived by _____."
        ],
        tips: [
            "Make the exposure feel like justice being served",
            "Show how lies eventually fall apart under scrutiny",
            "People should feel vindicated when the truth comes out",
            "The exposure clears the way for proper recognition",
            "Justice and truth always win over deception and lies"
        ]
    },
    29: {
        name: "Transfiguration",
        shortName: "Transfiguration",
        emoji: "🔮",
        description: "The hero is transformed or rewarded with a new status",
        commonQuestions: [
            "How does my hero change?", "What new status should the hero have?", "How do I show transformation?",
            "What makes a good reward?", "How do heroes become something greater?", "What changes after recognition?"
        ],
        responses: [
            "Your hero is transformed by their journey - they might gain new powers, wisdom, or a special title.",
            "The transformation shows how much your hero has grown and what they've achieved.",
            "This could be a physical change, like gaining magical abilities, or an emotional one, like newfound confidence.",
            "Your hero might become a leader, a protector, or someone with special knowledge that helps others.",
            "The transfiguration often symbolizes the hero's journey from ordinary to extraordinary.",
            "Show how this new status allows your hero to help others even more than before.",
            "The transformation should feel like a natural result of everything your hero has accomplished.",
            "This is the moment when your hero truly becomes the legend they were meant to be."
        ],
        writingPrompts: [
            "With their new powers, _____ felt ready to _____ and help others like never before.",
            "The moment _____ was recognized, they felt a surge of _____ and knew they could now _____.",
            "_____ stood taller, transformed by their journey, ready to _____ with their newfound strength.",
            "As the crowd cheered, _____ realized they had become more than just a hero - they were now _____.",
            "The magical gift glowed brightly, marking _____ as someone destined for greatness."
        ],
        tips: [
            "Make the transformation feel earned and meaningful",
            "Connect it to the hero's journey and growth",
            "The new status should allow your hero to continue helping others",
            "This is a moment of triumph and celebration",
            "Show how the hero's identity has changed for the better"
        ]
    },
    30: {
        name: "Punishment",
        shortName: "Punishment",
        emoji: "⚖️",
        description: "The false hero or villain is punished for their actions",
        commonQuestions: [
            "What happens to the false hero?", "How do I show justice being served?", "What punishment fits the crime?",
            "How do villains get what they deserve?", "What makes a satisfying punishment?", "How do I show consequences?"
        ],
        responses: [
            "The false hero or villain faces consequences for their lies and actions - this is justice being served!",
            "Show how the truth leads to punishment that fits the crime, whether it's exile, imprisonment, or loss of status.",
            "The punishment should feel fair and appropriate for the deception or harm caused.",
            "People feel a sense of relief and justice when the wrongdoer is held accountable for their actions.",
            "This moment reinforces the idea that honesty and bravery are always rewarded, while deceit leads to downfall.",
            "The punishment might also serve as a warning to others who might try to deceive or take credit for someone else's deeds.",
            "Your hero's victory is complete when justice is served and the real hero is recognized.",
            "This shows that good triumphs over evil and truth prevails in the end."
        ],
        writingPrompts: [
            "The false hero was banished from the kingdom, never to return after _____ revealed their lies.",
            "Justice was served when _____ was imprisoned for their deceit, while _____ was celebrated as the true hero.",
            "Everyone cheered as _____ was punished for their actions, knowing that _____ had finally been vindicated.",
            "The villain faced the consequences of their evil deeds, and _____ felt a sense of peace knowing justice had been done.",
            "With the false hero exposed, _____ received the punishment they deserved for trying to steal someone else's glory."
        ],
        tips: [
            "Make the punishment feel satisfying and just",
            "Show how justice restores balance to the story",
            "The consequences should fit the severity of the actions",
            "This reinforces the theme that honesty is always best",
            "Use this moment to celebrate your hero's triumph over deceit"
        ]
    },
    31: {
        name: "Reward",
        shortName: "Reward",
        emoji: "👑",
        description: "The hero is rewarded and often marries and rules",
        commonQuestions: [
            "How should my story end?",
            "What reward should my hero get?",
            "How do I create a happy ending?",
            "What makes a satisfying conclusion?",
            "How do I show everyone is happy?",
            "What should happen after victory?"
        ],
        responses: [
            "Your hero gets the happy ending they deserve! Everyone celebrates their bravery and the good they've done.",
            "The reward should match what your hero values most - maybe reuniting with family, gaining friends, or helping their community.",
            "Show how the hero's victory has made the world a better place for everyone.",
            "Your hero might receive recognition, a special title, magical gifts, or simply the joy of having helped others.",
            "The reward often brings your hero back home, but they're changed by their adventure - wiser and braver.",
            "Everyone whose life was touched by the hero's journey should be better off now.",
            "This is where you show the lasting impact of your hero's courage and kindness.",
            "End with the feeling that your hero will live happily, ready for whatever comes next!"
        ],
        writingPrompts: [
            "The kingdom celebrated _____ as a true hero, and they lived happily knowing _____.",
            "_____ returned home to find that their brave actions had brought _____ to everyone.",
            "As a reward for their courage, _____ was given _____ and the respect of all who knew them.",
            "The grateful people made _____ their _____, and peace returned to the land.",
            "_____ learned that the greatest reward was _____, and they smiled knowing _____."
        ],
        tips: [
            "Make the reward meaningful to your specific hero",
            "Show the positive impact on the whole community",
            "Connect the ending back to the beginning to show growth",
            "Leave readers feeling satisfied and happy",
            "The hero should be changed by their journey in positive ways"
        ]
    }
};

// Helper functions for the knowledge database
const PROPP_HELPER_FUNCTIONS = {
    findRelevantResponse: function (userQuestion, currentSceneId, storyTheme) {
        const lowerQuestion = userQuestion.toLowerCase();
        const sceneData = PROPP_KNOWLEDGE_DATABASE[currentSceneId];

        if (!sceneData) {
            return this.getGenericResponse(lowerQuestion, storyTheme);
        }

        for (let i = 0; i < sceneData.commonQuestions.length; i++) {
            const commonQ = sceneData.commonQuestions[i].toLowerCase();
            if (this.questionsMatch(lowerQuestion, commonQ)) {
                const randomIndex = Math.floor(Math.random() * sceneData.responses.length);
                return {
                    response: sceneData.responses[randomIndex],
                    sceneContext: sceneData.name,
                    writingPrompt: sceneData.writingPrompts[Math.floor(Math.random() * sceneData.writingPrompts.length)],
                    tip: sceneData.tips[Math.floor(Math.random() * sceneData.tips.length)]
                };
            }
        }

        const randomIndex = Math.floor(Math.random() * sceneData.responses.length);
        return {
            response: sceneData.responses[randomIndex],
            sceneContext: sceneData.name,
            writingPrompt: sceneData.writingPrompts[Math.floor(Math.random() * sceneData.writingPrompts.length)],
            tip: sceneData.tips[Math.floor(Math.random() * sceneData.tips.length)]
        };
    },

    questionsMatch: function (userQ, commonQ) {
        const userWords = userQ.split(' ');
        const commonWords = commonQ.split(' ');

        let matches = 0;
        userWords.forEach(word => {
            if (commonWords.some(cWord => cWord.includes(word) || word.includes(cWord))) {
                matches++;
            }
        });

        return matches >= Math.min(2, userWords.length * 0.4);
    },

    // Generic response for unmatched questions
    getGenericResponse: function (question, theme) {
        const genericResponses = [
            "That's a great question! Think about what would make your hero brave and help them grow stronger.",
            "In a " + (theme || "adventure") + " story, your hero should face challenges that help them discover their true strength!",
            "Remember, the best stories show characters learning and growing. What would help your hero learn something important?",
            "Every part of your story should move your hero closer to becoming the person they're meant to be!",
            "Think about what your hero cares about most - that will guide you to the right story choices."
        ];

        return {
            response: genericResponses[Math.floor(Math.random() * genericResponses.length)],
            sceneContext: "General Writing",
            writingPrompt: "Continue your story by showing what your hero does next...",
            tip: "Focus on showing your hero's feelings and actions to make readers care about what happens next."
        };
    }
};

module.exports = {
    PROPP_KNOWLEDGE_DATABASE,
    PROPP_HELPER_FUNCTIONS
};
