const { Router } = require('express');
const { processPayment } = require('../controllers/paymentController')
const router = new Router();

router.post('/process', processPayment);

module.exports = router;