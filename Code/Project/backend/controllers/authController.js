const User = require('../models/user');

const Errorhandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


// Register a user route => /api/v1/register

exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const { name, email, password }= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'User/batmetal_cfogq8',
            url: 'https://res.cloudinary.com/disgusting/image/upload/v1627104921/User/batmetal_cfogq8.jpg'
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
    const resetUrl = `${req.protocol}: //${req.get('host')}/api/v1/password/reset/${resetToken}`;

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