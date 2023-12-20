
const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();
    
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ), 
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        secure: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user
    })
}

module.exports = sendToken;