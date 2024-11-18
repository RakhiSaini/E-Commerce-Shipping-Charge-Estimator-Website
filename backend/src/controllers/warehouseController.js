const Warehouse = require('../models/Warehouse');
const haversine = require('../utils/distanceCalculator');

exports.getNearestWarehouse = async (req, res) => {
    const { sellerId } = req.query;
    // Example logic: Fetch seller details and find nearest warehouse
    // Assuming seller location is fetched from DB
    const sellerLocation = { lat: 15.0, lng: 30.0 }; // Replace with actual data
    const warehouses = await Warehouse.find();

    const nearestWarehouse = warehouses.reduce((closest, warehouse) => {
        const distance = haversine(sellerLocation, warehouse.location);
        return distance < closest.distance
            ? { warehouse, distance }
            : closest;
    }, { distance: Infinity });

    res.json({
        warehouseId: nearestWarehouse.warehouse._id,
        warehouseLocation: nearestWarehouse.warehouse.location,
    });
};
