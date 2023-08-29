const connection = require ('../config/connection');
const { User, Thought } = require('../models');
const { namesDb, thoughtsDb, reactionsDb, getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < namesDb.length; i++) {
        const username = getRandomName()
        const email = `${username}@socialnetwork.com`;
        const userThoughtIds = [];

        users.push({
            username,
            email,
            userThoughtIds
        });
    }

    await User.collection.insertMany(users);
    
    const thought = [];

    for (let i = 0; i < thoughtsDb.length; i++) {
        const ranNum = Math.floor(Math.random() * users.length);
        const randomUser = users[ranNum];

        thought.push({
            thoughtText: thoughtsDb[i],
            username: randomUser.username,
            userId: randomUser._id,
            reactions: getRandomReactions(),
        });

        await thought.save();
        
        // Push ID of thought to user's array
        randomUser.userThoughtIds.push(thought._id)

        await randomUser.save();
    }

    await Thought.collection.insertMany(thought);
    console.table(users);
    console.table(thought);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});