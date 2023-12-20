const { Router } = require('express');
const { isAuthenticatedUser, isAuthorized } = require('../middlewares/auth');
const {handleNewOrder, handleSingleOrder, handleMyOrders, handleAllOrders, handleUpdateOrder, handleDeleteOrder } = require('../controllers/orderController');

const router = new Router();

router.post('/neworder', isAuthenticatedUser ,handleNewOrder);
router.get('/order/:id', isAuthenticatedUser , handleSingleOrder);
router.get('/myorders', isAuthenticatedUser , handleMyOrders);

router.get('/admin/allorders', isAuthenticatedUser , isAuthorized('admin'), handleAllOrders);

router.route('/admin/order/:id')
.put( isAuthenticatedUser , isAuthorized('admin'), handleUpdateOrder)
.delete( isAuthenticatedUser , isAuthorized('admin'), handleDeleteOrder)

module.exports = router;