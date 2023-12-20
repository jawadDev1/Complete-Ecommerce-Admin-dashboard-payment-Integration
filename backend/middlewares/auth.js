const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncError = require('./catchAsyncError');

const isAuthenticatedUser = catchAsyncError( async (req, res, next)=>{
    const {token} = req.cookies;
    
    if(!token) return next(new errorHandler("Please Login to access this resource", 400));
    let checkToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if(!checkToken) return next(new errorHandler("You are not Authorize.Please Login Again", 400));
    
    req.user  = await User.findById(checkToken.id);
    

    next();
});

const isAuthorized =  (...roles) => {
   return  (req, res, next)=> {
        if(!roles.includes(req.user.role)){
            return next(new errorHandler("You are not authorized.", 403));
        }

        next();
   }

}


module.exports = {
    isAuthenticatedUser,
    isAuthorized
};