const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const processPayment = catchAsyncError( async (req, res, next ) => {
    
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: {
            company: 'Ecommerce'
        }

    })
    
    res.json({success: true, client_secret: myPayment.client_secret});
})



module.exports = {
    processPayment
}