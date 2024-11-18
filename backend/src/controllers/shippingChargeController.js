const Customer = require('../models/Customer');
const haversine = require('../utils/distanceCalculator');
const { getTransportMode } = require('../utils/transportModes');

exports.calculateShippingCharge = async (req, res) => {
    const { warehouseId, customerId, deliverySpeed } = req.query;
    // Fetch warehouse and customer locations
    const warehouse = { location: { lat: 12.99999, lng: 37.923273 } }; // Mock data
    const customer = { location: { lat: 11.232, lng: 23.445495 } }; // Mock data

    const distance = haversine(warehouse.location, customer.location);
    const { rate } = getTransportMode(distance);

    const shippingCharge = rate * distance;
    const totalCharge = deliverySpeed === 'express'
        ? 10 + shippingCharge + 1.2
        : 10 + shippingCharge;

    res.json({ shippingCharge: totalCharge });
};
