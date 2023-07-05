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
    users: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

managerSchema.index({ firstName: 1, lastName: 1, birthDate: 1}, { unique: true });

module.exports = mongoose.model('Manager', managerSchema);