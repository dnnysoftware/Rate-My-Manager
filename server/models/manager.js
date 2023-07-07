const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

managerSchema.index({ firstName: 1, lastName: 1, birthDate: 1}, { unique: true });
managerSchema.index({ _id: 1, 'ratings.user': 1 }, { unique: true });

module.exports = mongoose.model('Manager', managerSchema);
