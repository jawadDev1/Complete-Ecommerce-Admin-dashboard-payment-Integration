const nodemailer = require('nodemailer');

const sendMail = async (options)=> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.MAIL_SERVICE,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: "eShop Reset Password",
        text: options.message
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;