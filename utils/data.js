const namesDb = [
    'Andrew',
    'Ashley',
    'Brandon',
    'Dan',
    'Diego',
    'Ethan',
    'Grant',
    'Hannah',
    'Julian',
    'Kahlil',
    'Matt',
    'Meg',
    'Nick',
    'Olivia',
    'Oriana',
    'Maddy',
    'Ryan',
    'Taylor',
    'Thomas'
]

const thoughtsDb = [
    'Anyone up?',
    'Did anyone catch the game last night?',
    'I need a vacation ASAP',
    'Cold brew is the best way to enjoy coffee, hands down',
    "John's of Bleecker Street is the best pizza in NYC",
    'Yankees are an embarassment this year',
    'Basketball is my favorite sport'
];

const reactionsDb = [
    "No way, that's crazy",
    'Bada bing!',
    'Wow amazing!',
    'Hm, I see what you did there',
    "Boy bye",
    'It is what it is',
    'Best of luck!',
    'Never thought about it like that',
    "Let's gooooo",
    'Cool! I need to check that out',
    'Bang!'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random()*arr.length)];

// Get a random name
const getRandomName = () =>
    `${getRandomArrItem(namesDb)}`;

// Attribute random reactions to random users
const getRandomReactions = () => {
    let results = [];
    const ranNum = Math.floor(Math.random() * reactionsDb.length);
    for (let i = 0; i < ranNum; i++) {
        results.push({
            reactionBody: getRandomArrItem(reactionsDb),
            username: getRandomName(),
        });
    }
};

// Export functions for use in seed.js
module.exports = { namesDb, thoughtsDb, reactionsDb, getRandomName, getRandomReactions};