const Product = require('../models/Product');

// @desc    Create a new product listing
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
    const { name, description, category, images, listingType, price, pricePerDay, lateFeePerDay } = req.body;

    try {
        const newProduct = new Product({
            seller: req.user.id, // Comes from the authMiddleware
            name,
            description,
            category,
            images,
            listingType,
            price: listingType === 'sell' ? price : undefined,
            pricePerDay: listingType === 'borrow' ? pricePerDay : undefined,
            lateFeePerDay: listingType === 'borrow' ? lateFeePerDay : undefined,
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};