const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
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

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);