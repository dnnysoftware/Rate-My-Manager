const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Manager Schema
const managerSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    birthDate:{
        type: Date,
        required: true
    },
    companies: [
        {type: String}
    ],
    ratings: [
        {
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'User', 
                required: true,
            },
            username: {
                type: String, 
                required: true,
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
        }
    ]
});

// Index for unique managers
managerSchema.index({ firstName: 1, lastName: 1, birthDate: 1}, { unique: true });

// Index for unique user per manager
managerSchema.index({ _id: 1, 'ratings.user': 1 }, { unique: true });

module.exports = mongoose.model('Manager', managerSchema);
