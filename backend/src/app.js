const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../config/db');

const warehouseRoutes = require('./routes/warehouseRoutes');
const shippingChargeRoutes = require('./routes/shippingChargeRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/v1/warehouse', warehouseRoutes);
app.use('/api/v1/shipping-charge', shippingChargeRoutes);

module.exports = app;
