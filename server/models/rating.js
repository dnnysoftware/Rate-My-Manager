const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId, 
        ref: 'Manager', 
        required: true
    },
    company: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value.',
        },
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

ratingSchema.index({ user: 1, manager: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);