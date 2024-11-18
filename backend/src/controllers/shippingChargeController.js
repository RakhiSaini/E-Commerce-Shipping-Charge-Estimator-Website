const Customer = require('../models/Customer');
const haversine = require('../utils/distanceCalculator');
const { getTransportMode } = require('../utils/transportModes');

exports.calculateShippingCharge = async (req, res) => {
    const { warehouseId, customerId, deliverySpeed } = req.query;
    const warehouse = { location: { lat: 12.99999, long: 37.923273 } }; 
    const customer = { location: { lat: 11.232, long: 23.445495 } }; 

    const distance = haversine(warehouse.location, customer.location);
    const { rate } = getTransportMode(distance);

    const shippingCharge = rate * distance;
    const totalCharge = deliverySpeed === 'express'
        ? 10 + shippingCharge + 1.2
        : 10 + shippingCharge;

    res.json({ shippingCharge: totalCharge });
};
