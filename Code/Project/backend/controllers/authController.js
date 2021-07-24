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