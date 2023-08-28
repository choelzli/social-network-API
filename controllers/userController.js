const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id:req.params.userId })
                .select('-__v')

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create single user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Find and update user
    async updateUser(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.applicationId });
            
            if(req.body.username) {
                user.username = req.body.username
            };
            if (req.body.email) {
                user.email = req.body.email
            };

            await user.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete user and thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
};