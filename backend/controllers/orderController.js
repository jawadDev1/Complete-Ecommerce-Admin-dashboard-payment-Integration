const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');

// add a new order
const handleNewOrder = catchAsyncErrors(async (req, res) => {
    
    let order = await Order.create({ paidAt: Date.now(), user: req.user._id, ...req.body });

    return res.json({success: true, order});
})

// get a single order
const handleSingleOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    if(!order) return next(new errorHandler("Order is not found!", 400));

    return res.json({success: true, order});
})

// send the user order details
const handleMyOrders = catchAsyncErrors(async (req, res, next) => {
    
    let orders = await Order.find({user: req.user._id}).sort({createdAt: -1});
    if(!orders) return next(new errorHandler("Orders are not found!", 400));
    
    return res.json({success: true, orders});
})

// get all the orders -- admin
const handleAllOrders = catchAsyncErrors(async (req, res, next) => {
    let orders = await Order.find({}).sort({createdAt: -1});
    if(!orders) return next(new errorHandler("Order is not found!", 400));

    return res.json({success: true, orders});
})

// update order 
const handleUpdateOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    if(!order) return next(new errorHandler("Order is not found!", 400));

    if(order.orderStatus === 'Delivered') return next(new errorHandler("You have already Delivered the order.", 400))

    if(order.orderStatus === 'Shipped'){
        order.orderItems.forEach(async ordr => {
            await updateStock(ordr.product, ordr.quantity)
        })
    };

order.orderStatus = req.body.status;
if(req.body.status === 'Delivered'){
    order.deliveredAt = Date.now();
};


    await order.save({validateBeforeSave: false});

    return res.json({success: true, message: "Order is updated Successfully"});

})

// update stock function
const updateStock = async (id, quantity) => {
    let product  = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false})
}

// delete order
const handleDeleteOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    if(!order) return next(new errorHandler("Order is not found!", 400));

    await Order.findByIdAndDelete(req.params.id);

    return res.json({success: true, message: "Order is deleted Successfully"});
})

module.exports = {
    handleNewOrder,
    handleSingleOrder,
    handleMyOrders,
    handleAllOrders,
    handleUpdateOrder,
    handleDeleteOrder
}