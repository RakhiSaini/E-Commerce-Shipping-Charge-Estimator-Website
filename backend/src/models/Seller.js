const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    products: [{
        name: String,
        sellingPrice: Number,
        weight: Number,
        dimension: String,
    }],
});

module.exports = mongoose.model('Seller', sellerSchema);
