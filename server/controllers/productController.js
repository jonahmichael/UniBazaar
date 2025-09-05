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
// Inside server/controllers/productController.js

// Replace your existing getAllProducts function with this one
exports.getAllProducts = async (req, res) => {
    try {
        const filter = {};

        // Handle category filtering (from Sprint 10)
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // --- NEW SEARCH LOGIC ---
        // Handle search query filtering
        if (req.query.search) {
            filter.$or = [
                // 'i' option makes the search case-insensitive
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        // This `$or` tells MongoDB to find documents where the search term
        // appears in EITHER the name OR the description.

        const products = await Product.find(filter).sort({ createdAt: -1 });
        
        res.json(products);
    } catch (err)
 {
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