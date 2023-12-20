const { errorMonitor } = require('nodemailer/lib/xoauth2');
const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    console.log('hello', err.msg)
    err.statusCode = err.statusCode || 500;
    err.msg = err.msg || "Internal server error";
    
    // Wrong mongoDB id error handling
    if(err.name === "CastError"){
        err.msg = `Resource is not found. Invalid ${err.path}`;
        err.statusCode = 400;
    };

    // duplicate key(same email) error
    if(err.msg.substr(0, 5)==='E1100'){   
        err.msg = "Email already exists";
        err.statusCode = 400;
    }

    // Wrong JWT token error
    if(err.msg==='JsonWebTokenError'){
        err.msg = "Json Web Token is not valid. Login again";
        err.statusCode = 400;
    };

    // JWT expire error
    if(err.name==='TokenExpiredError'){
        err.msg = "Json Web Token is expired. Login again";
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({success: false, msg: err.msg});
}