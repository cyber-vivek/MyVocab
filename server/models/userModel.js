const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 50,
    },
    sendEmail: {
        type: Boolean,
        required: false,
        default: false,
    }
});

module.exports = mongoose.model('User', userSchema);