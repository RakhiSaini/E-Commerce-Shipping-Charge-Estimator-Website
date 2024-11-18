const express = require('express');
const { calculateShippingCharge } = require('../controllers/shippingChargeController');

const router = express.Router();

router.get('/calculate', calculateShippingCharge);

module.exports = router;
