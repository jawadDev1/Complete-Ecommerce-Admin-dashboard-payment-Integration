const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken');
const errorHandler = require('../utils/errorHandler');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
const cloudinary = require('cloudinary')


// Create a new user
const handleSignup = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    });
    req.body.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url };

    let user = await User.create(req.body);
    user.password = '';
    sendToken(user, 200, res);
})

// handle user login
const handleLogin = catchAsyncError(async (req, res, next) => {
    
    const { loginEmail, loginPassword } = req.body;

    let user = await User.findOne({ email: loginEmail }).select("+password");
    if (!user) return next(new errorHandler("Enter a valid Email or Password", 400));

    let checkPassword = await bcrypt.compare(loginPassword, user.password);
    if (!checkPassword) return next(new errorHandler("Enter a valid Email or Password", 400));
    user.password = '';
    sendToken(user, 201, res);
});

// handle Forget Password
const handleForgetPassword = catchAsyncError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return next(new errorHandler("Invalid Email", 404));

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/users/resetpassword/${resetToken}`;
    const resetPasswordUrl = `${process.env.REACT_URL}/resetpassword/${resetToken}`;

    let message = `Your passwor reset token is \n\n ${resetPasswordUrl} \n\n If you have not requested this email then ignore it.`

    try {
        await sendMail({
            message,
            email: user.email,
        });

        return res.status(200).json({ success: true, message: `Email is sent to ${user.email} Successfully` });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new errorHandler(error.message, 500));
    }
})


// handle Reset Password 
const handleResetPassword = catchAsyncError(async (req, res, next) => {
    const {newPassword, confirmPassword} = req.body;
    let resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');

    let user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) return next(new errorHandler("Your token is invalid or expired", 400));
    if (newPassword !== confirmPassword) return next(new errorHandler("Password does not match", 400));

    

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});

// handle user logout
const handleLogout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({ success: true, message: "Logged Out Successfully" });
})

// get user details
const handleUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return next(new errorHandler("User is not found", 400));

    res.json({ success: true, user });
});

// update password
const handleUpdatePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ _id: req.user.id }).select("+password");
    if (!user) return next(new errorHandler("User is not found", 400));

    let checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) return next(new errorHandler("Password is wrong", 400));

    if (newPassword !== confirmPassword) return next(new errorHandler("Confirm Password does not match", 400));

    user.password = newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// update user profile
const handleUpdateProfile = catchAsyncError(async (req, res, next) => {
    let user = await User.findOne({ _id: req.user.id });
    if (!user) return next(new errorHandler("User is not found", 400));
    

    if (req.body.avatar !== '') {
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        req.body.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url };
    } else {
        delete req.body.avatar;
    }


    
    user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
    
    return res.json({ success: true, user });
});

// get all users
const handleGetAllUsers = catchAsyncError(async (req, res, next) => {
    let users = await User.find({});

    return res.json({ success: true, users });
})

// get single user 
const handleSingleUser = catchAsyncError(async (req, res, next) => {
    
    let user = await User.findById(req.params.id);
    if (!user) return next(new errorHandler("User not found", 400));
    
    return res.json({ success: true, user });
})

// update user role
const handleUpdateRole = catchAsyncError(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, {role: req.body.role}, { new: true, runValidators: true, useFindAndModify: false })

    return res.json({ success: true, message: "Role is updated successfully" });
});

// delete user 
const handleDeleteUser = catchAsyncError(async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) return next(new errorHandler("User not found", 400));

    await User.findByIdAndDelete(req.params.id);

    return res.json({ success: true, message: "User is deleted successfully" });
});

module.exports = {
    handleSignup,
    handleLogin,
    handleLogout,
    handleForgetPassword,
    handleResetPassword,
    handleUserDetails,
    handleUpdatePassword,
    handleUpdateProfile,
    handleGetAllUsers,
    handleSingleUser,
    handleUpdateRole,
    handleDeleteUser
}