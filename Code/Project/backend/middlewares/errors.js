const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if(process.env.NODE_ENV === 'DEVELOPMENT'){
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack
    })
  }

  if(process.env.NODE_ENV === 'PRODUCTION'){
    let error = {...err}

    error.message = err.message

    // Wrong Mongoose Object ID Error
    if(err.name === 'CastError') {
      let x = err.path
      const message = 'Resource not found. Invalid: ' + x;
      error = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Validation Error
    if(err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400)
    }

    //handling Mongoose Duplicate key errors
    if(err.code === 11000){
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400)
    }

    //Handling wrong JWT error
    if(err.name === 'JsonWebTokenError') {
      const message = 'json web Token is invalid. Try Again!!!';
      error = new ErrorHandler(message, 400)
    }

    //Handling expired JWT error
    if(err.name === 'TokenExpiredError') {
      const message = 'json web Token is expired. Try Again!!!';
      error = new ErrorHandler(message, 400)
    }


    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error'
    })

  }

  
}