const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String, required: true }],
    listingType: { type: String, enum: ['sell', 'borrow'], required: true },
    price: { type: Number, required: function() { return this.listingType === 'sell'; } },
    pricePerDay: { type: Number, required: function() { return this.listingType === 'borrow'; } },
    lateFeePerDay: { type: Number, required: function() { return this.listingType === 'borrow'; } },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);