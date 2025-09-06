const Order = require('../models/Order');
const Product = require('../models/Product');

// --- CONTROLLER FOR CREATING AN ORDER ---
// Sprint 6
exports.createOrder = async (req, res) => {
    const { productId, orderType, tentativeReturnDate } = req.body;
    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        if (!product.isAvailable) {
            return res.status(400).json({ msg: 'Product is currently unavailable' });
        }
        let totalAmount = 0;
        let orderDetails = {
            buyer: req.user.id,
            seller: product.seller,
            product: productId,
            orderType,
        };
        if (orderType === 'buy') {
            totalAmount = product.price;
        } else if (orderType === 'borrow') {
            const borrowDate = new Date();
            const returnDate = new Date(tentativeReturnDate);
            const durationDays = Math.ceil((returnDate - borrowDate) / (1000 * 60 * 60 * 24));
            if (durationDays <= 0) {
                return res.status(400).json({ msg: 'Return date must be in the future' });
            }
            totalAmount = durationDays * product.pricePerDay;
            orderDetails.borrowedOn = borrowDate;
            orderDetails.tentativeReturnDate = returnDate;
        }
        orderDetails.totalAmount = totalAmount;
        const newOrder = new Order(orderDetails);
        await newOrder.save();
        product.isAvailable = false;
        await product.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- CONTROLLER FOR GETTING A USER'S OWN ORDERS ---
// Sprint 13
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate('product', 'name images')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
