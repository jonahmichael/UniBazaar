const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create a new order (for buying or borrowing)
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const { productId, orderType, tentativeReturnDate } = req.body;
    
    try {
        // 1. Get the product being ordered
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        if (!product.isAvailable) {
            return res.status(400).json({ msg: 'Product is currently unavailable' });
        }

        let totalAmount = 0;
        let orderDetails = {
            buyer: req.user.id, // from authMiddleware
            seller: product.seller,
            product: productId,
            orderType,
        };

        // 2. Calculate total amount based on order type
        if (orderType === 'buy') {
            totalAmount = product.price;
        } else if (orderType === 'borrow') {
            const borrowDate = new Date();
            const returnDate = new Date(tentativeReturnDate);
            // Calculate the number of days (duration)
            const durationDays = Math.ceil((returnDate - borrowDate) / (1000 * 60 * 60 * 24));
            
            if (durationDays <= 0) {
                return res.status(400).json({ msg: 'Return date must be in the future' });
            }

            totalAmount = durationDays * product.pricePerDay;
            orderDetails.borrowedOn = borrowDate;
            orderDetails.tentativeReturnDate = returnDate;
        }

        orderDetails.totalAmount = totalAmount;

        // 3. Create the new order
        const newOrder = new Order(orderDetails);
        await newOrder.save();

        // 4. Mark the product as unavailable
        product.isAvailable = false;
        await product.save();

        res.status(201).json(newOrder);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};