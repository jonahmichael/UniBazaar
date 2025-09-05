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
// Inside server/controllers/productController.js

// Replace your old getAllProducts function with this new one
exports.getAllProducts = async (req, res) => {
    try {
        // 1. Create a filter object
        const filter = {};

        // 2. Check if a category query parameter exists in the URL
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // 3. Use the filter object in the find() method
        // If the filter object is empty, it will find all products.
        // If it has a category, it will find only matching products.
        const products = await Product.find(filter).sort({ createdAt: -1 });
        
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