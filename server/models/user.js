const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    managers: [
        {type: Schema.Types.ObjectId, ref: 'Manager'}
    ]
});

module.exports = mongoose.model('User', userSchema);