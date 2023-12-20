const Product = require('../models/productModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// Get all products and send them
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    let resultPerPage = 8;

    const apiFeature = new ApiFeatures(Product.find(), req.query).searchAndFilter();

    let products = await apiFeature.query;
    let productsCount = products.length;

    apiFeature.pagination(resultPerPage)

    products = await apiFeature.query.clone();

    return res.json({ success: true, productsCount, products });
})

// get all the products for the admin
const getAdminProducts = catchAsyncErrors(async (req, res) => {
    let products = await Product.find({}).sort({ createdAt: -1 });

    return res.json({ success: true, products });
})

// Add a product to database
const handleAddProduct = catchAsyncErrors(async (req, res) => {
    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const myCloud = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",

        });
        imagesLinks.push({ public_id: myCloud.public_id, url: myCloud.secure_url })
    }

    req.body.images = imagesLinks;

    req.body.user = req.user._id;
    await Product.create(req.body);

    return res.json({ success: true, message: 'Producted is added Successfully' });
})

// update a product 
const handleUpdateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product not found", 404))
    }
    

    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    if (req.body.imageChanged !== 'false') {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLinks.push({ public_id: myCloud.public_id, url: myCloud.secure_url })
        }

        req.body.images = imagesLinks;
    } else { 
        delete req.body.images
    }
    delete req.body.imageChanged;
    
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.json({ success: true, message: "Product is updated Successfully" });
})

// delete a product
const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product not found", 404))
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Product is Deleted Successfully" });
})

// get details of a single product
const handleProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new errorHandler("Product not found", 404))
    }

    return res.json({ success: true, product });
});

// Add a product review or update the existing review
const handleProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, id } = req.body;

    let review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    let product = await Product.findById(id);

    let isReviewed = product.reviews.find((rev => {
        return rev.user.toString() === req.user._id.toString()

    }));

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = Number(rating);
                rev.comment = comment;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    };

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    })

    product.rating = avg / product.numOfReviews;

    await product.save({ new: true, validateBeforeSave: false });

    return res.json({ success: true, message: "Review is added successfully" });
});

// get all the reviews of a product
const handleTotalReviews = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new errorHandler("Product not found", 400));

    return res.json({ success: true, reviews: product.reviews });
});

// Delete a review
const handleDeleteReview = catchAsyncErrors(async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);
    if (!product) return next(new errorHandler("Product not found", 400));

    const reviews = product.reviews.filter(rev => {
        return rev._id.toString() !== req.query.id.toString()
        
    });
    
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    })

    let rating = 0;

    if (reviews.length === 0) {
        rating = 0;
    } else {
        rating = avg / reviews.length;
    };

    const numOfReviews = reviews.length;

   product = await Product.findByIdAndUpdate(req.params.id, { reviews, rating, numOfReviews }, { new: true, runValidators: true });

    return res.json({ success: true, message: "Review is deleted Successfully", reviews: product.reviews  });
});

// get all the categories
const handleGetAllCategories = catchAsyncErrors(async (req, res, next) => {
    // return next(new errorHandler("Categories not found", 400));
    const categories = await Product.distinct('category');
    if (!categories) return next(new errorHandler("Categories not found", 400));

    return res.json({ success: true, categories })
})

module.exports = {
    getAllProducts,
    getAdminProducts,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleProductDetails,
    handleProductReview,
    handleTotalReviews,
    handleDeleteReview,
    handleGetAllCategories
}