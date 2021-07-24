const User = require('../models/user');

const Errorhandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register a user => /api/v1/register

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

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
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

    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token
    })
})