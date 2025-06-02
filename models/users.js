const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: String,
    username: String,
    password: String,
    email: String,
    mobile: String,
    avatar: String,
    fullname: String,
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'deleted', 'banned'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);