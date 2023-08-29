const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('__v');
            
            if(!thought) {
                return res.status(404).json({ message: "No thought found"})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await thought.save();
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const reaction = {
                reactionBody: req.body.reactionText,
                username: req.body.username
            };

            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: reaction } },
                { new: true }
            );

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                {new: true}
            );

            res.json({ message: 'Reaction successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};