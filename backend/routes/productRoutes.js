const { Router } = require('express');
const {
    getAllProducts,
    handleAddProduct,
    handleUpdateProduct, 
    handleDeleteProduct, 
    handleProductDetails,
    getAdminProducts,
    handleProductReview,
    handleTotalReviews,
    handleDeleteReview,
    handleGetAllCategories
} = require('../controllers/productController')

const { isAuthenticatedUser, isAuthorized } = require('../middlewares/auth');

const router = new Router();

router.get('/getallproducts', getAllProducts);
router.get('/admin/getallproducts', isAuthenticatedUser, isAuthorized('admin'), getAdminProducts); 
router.post('/admin/addproduct', isAuthenticatedUser, isAuthorized('admin'), handleAddProduct)

// update, delete and get details of a product
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, isAuthorized('admin'), handleUpdateProduct)
    .delete(isAuthenticatedUser, isAuthorized('admin'), handleDeleteProduct)
    
router.get('/product/:id', handleProductDetails);

router.put('/review', isAuthenticatedUser, handleProductReview);
router.route('/reviews/:id')
.get(handleTotalReviews)
.delete(isAuthenticatedUser, isAuthorized('admin'), handleDeleteReview);

// fetch all categories
router.get('/categories', handleGetAllCategories)


module.exports = router;