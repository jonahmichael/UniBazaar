const Product = require('../models/Product');

// --- FUNCTION 1 (from Sprint 3 & 9) ---
// @desc    Create a new product listing
exports.createProduct = async (req, res) => {
    const { name, description, category, images, listingType, price, pricePerDay, lateFeePerDay } = req.body;

    try {
        const newProduct = new Product({
            seller: req.user.id,
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

// --- FUNCTION 2 (from Sprint 4, 10, 11) ---
// @desc    Get all products (with filtering for search and category)
exports.getAllProducts = async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.search) {
            filter.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// --- FUNCTION 3 (from Sprint 5 & 12) ---
// @desc    Get a single product by its ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'name averageRating');

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};

// --- FUNCTION 4 (from Sprint 13) ---
// @desc    Get listings for the logged-in user (seller)
exports.getMyListings = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id })
            .sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};