const { User, Thought } = require('../models');
const { findOneAndUpdate } = require('../models/User');

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
                .populate('thoughts')
                .populate('friends')

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
            const updatedUser = await User.findOne(
                { _id: req.params.userId });
            
            if(req.body.username) {
                updatedUser.username = req.body.username
            };
            if (req.body.email) {
                updatedUser.email = req.body.email
            };

            await updatedUser.save();
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete user and thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

            if(!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: 'User and thoughts deleted!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try{
            const user = await findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try{
            const deletedFriend = await User.findOneAndUpdate(
                { $pull: { friends: req.params.friendId }},
                { new: true }
            );
            res.json({message: "Friend deleted!"});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};