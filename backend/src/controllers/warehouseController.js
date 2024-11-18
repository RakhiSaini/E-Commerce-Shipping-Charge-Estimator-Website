const Warehouse = require('../models/Warehouse');
const haversine = require('../utils/distanceCalculator');

exports.getNearestWarehouse = async (req, res) => {
    const { sellerId } = req.query;
    const sellerLocation = { "lat": 12.99999, "long": 37.923273 };
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
