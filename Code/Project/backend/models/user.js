const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

//password encryption before saving

userSchema.pre( 'save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare password

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


//JSON web Token 
userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
module.exports = mongoose.model('User', userSchema);