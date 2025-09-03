const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    orderType: { type: String, enum: ['buy', 'borrow'], required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String }, // From Razorpay
    status: { type: String, enum: ['pending', 'completed', 'returned'], default: 'pending' },

    // For 'borrow' type
    borrowedOn: { type: Date },
    tentativeReturnDate: { type: Date },
    actualReturnDate: { type: Date },

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);