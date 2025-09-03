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

// @desc    Get all product listings
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
    try {
        // Find all products and sort them by the newest first
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single product by its ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        // If the ID is not a valid format, it will throw an error
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};