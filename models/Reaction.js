const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: String,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            get: (createdAt) => {
                return `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`
            }
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;