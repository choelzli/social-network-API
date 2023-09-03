const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual created that retrieves length of the user's friends array
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`;
    })

// Initialize User model
const User = mongoose.model('User', userSchema);

module.exports = User;