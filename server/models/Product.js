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

module.exports = mongoose.model('Product', ProductSchema);```

**Copy this code into `server/models/Order.js`:**
```javascript
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    orderType: { type: String, enum: ['buy', 'borrow'], required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'returned'], default: 'pending' },
    borrowedOn: { type: Date },
    tentativeReturnDate: { type: Date },
    actualReturnDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);