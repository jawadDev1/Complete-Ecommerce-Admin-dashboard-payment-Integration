const { Router } = require('express');
const { handleSignup, handleLogin, handleLogout, handleForgetPassword, handleResetPassword, handleUserDetails, handleUpdatePassword, handleUpdateProfile, handleGetAllUsers, handleSingleUser, handleUpdateRole, handleDeleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, isAuthorized } = require('../middlewares/auth');
const router = new Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.post('/forgotpassword', handleForgetPassword)
router.put('/resetpassword/:token', handleResetPassword)
router.get('/logout', handleLogout);

router.get('/mydetails', isAuthenticatedUser, handleUserDetails)
router.put('/updatepassword', isAuthenticatedUser, handleUpdatePassword)
router.put('/updateprofile', isAuthenticatedUser, handleUpdateProfile)

router.get('/admin/getallusers', isAuthenticatedUser, isAuthorized('admin'), handleGetAllUsers)

router.route('/admin/user/:id')
.get(isAuthenticatedUser, isAuthorized('admin'), handleSingleUser)
.put(isAuthenticatedUser, isAuthorized('admin'), handleUpdateRole)
.delete(isAuthenticatedUser, isAuthorized('admin'), handleDeleteUser)

module.exports = router;