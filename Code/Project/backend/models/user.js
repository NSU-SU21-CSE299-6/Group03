const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name can not exceed 30 Characters']
    },

    email: {
        type:String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail,'Please enter valid email address']
    },

    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6,'Your password cannot be less than 6 characters'],
        select: false

    },

    avatar: {
        public_id: {
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
    },

    role: {
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetpasswordExpire: Date

})

module.exports = mongoose.model('User', userSchema);