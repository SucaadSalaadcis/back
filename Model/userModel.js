const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        trim: true,
    },
    photoURL: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

module.exports = model('user',userSchema);