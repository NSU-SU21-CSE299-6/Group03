const User = require('../models/user');

const Errorhandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const ErrorHandler = require('../utils/errorHandler');


// Register a user route => /api/v1/register

exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { name, email, password }= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user,  200, res)
 
})

// user login route> /api/v1/login

exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password} = req.body;

//email and password entry check
    if(!email || !password) {
        return next( new Errorhandler('Please enter email & password', 400))
    }
    // finding user in db
    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return next(new Errorhandler('Invalid username or Password',401));
    }

    //password check
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new Errorhandler('Invalid username or Password',401));
    }

    sendToken(user,  200, res)
})

//forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email});

    if(!user){
        return next(new Errorhandler('User with this email was not found',404));
    }

    //get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})

    //reset password url 
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Here is your Password reset token:\n\n ${resetUrl}\n\n if you have not requested this email, then simply ignore it.`;

    try{

        await sendEmail({
            email: user.email,
            subject: 'Kaktarua Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email} `
        })

    } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false})

        return next(new Errorhandler(error.message,500))
    }
})

//reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors( async(req, res, next) =>{

    //hash the url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    })

    if(!user) {
        return next( new Errorhandler('Password reset token is invalid or has been expired',400))
    }

    if(req.body.password != req.body.confirmPassword) {
        return next( new Errorhandler('Password does not match',400))
    }

    //set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})


//get currently logged in user details /api/v1/me

exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//update/ change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //check user current password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched) {
        return next(new Errorhandler('old password is incorrect',400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);

})

//update user profile => /api/v1/me/update

exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true
    })
})


//logout user route => /api/v1/logout
exports.logout = catchAsyncErrors( async (req, res, next) =>{
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//admin routes

//get all users => /api/v1/admin/users

exports.allUsers = catchAsyncErrors( async (req, res, next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users

    })
})

//get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors( async (req, res, next) =>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with ${req.params.id} id was not found`,400))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//update user profile -Admin => /api/v1/admin/user/:id

exports.updateUser = catchAsyncErrors( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true
    })
})

//delete user details => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors( async (req, res, next) =>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with ${req.params.id} id was not found`,400))
    }

    //remove avcatar : ToDO

    await user.remove();

    res.status(200).json({
        success: true,
    })
})