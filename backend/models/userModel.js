const { Schema , model} = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
        minLength: [3, "Name should be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "Password should be at least 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// hash the password before saving in database
userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        next();
    }
    
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next()
})

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });
};

// Genrating password reset token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


module.exports = model('users', userSchema);