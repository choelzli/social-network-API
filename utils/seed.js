const connection = require ('../config/connection');
const { User, Thought } = require('../models');
const { namesDb, thoughtsDb, reactionsDb, getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    let users = namesDb.map(name => ({
        username: name,
        email: name+ "@socialnetwork.com",
        thoughts: [],
    }));

    await User.collection.insertMany(users);
    users = await User.find({});

    for (let i = 0; i < thoughtsDb.length; i++) {
        const ranNum = Math.floor(Math.random() * users.length);
        const randomUser = users[ranNum];

        const thought = new Thought({
            thoughtText: thoughtsDb[i],
            username: randomUser.username,
            userId: randomUser._id,
            reactions: getRandomReactions(),
        });

        await thought.save();
        
        // Push thought to user's thoughts array
        randomUser.thoughts.push(thought);

        await randomUser.save();
    }

    console.table(users);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});