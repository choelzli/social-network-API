const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            get: (createdAt) => {
                return `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`
            }
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual created that retrieves length of the thought's reactions array
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`;
    })

// Initialize Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;