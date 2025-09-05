const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// This one line correctly imports all functions needed for this file.
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    getMyListings 
} = require('../controllers/productController');

// --- ALL PRODUCT FEATURES ARE PRESERVED HERE ---

// FEATURE from Sprint 3 & 9: Create a new product (Private)
router.post('/', authMiddleware, createProduct);

// FEATURE from Sprint 4, 10, 11: Get all products (Public, with search/category filters)
router.get('/', getAllProducts);

// FEATURE from Sprint 13: Get logged-in user's listings (Private)
// This is now correctly placed BEFORE the dynamic '/:id' route to fix the bug.
router.get('/my-listings', authMiddleware, getMyListings);

// FEATURE from Sprint 5: Get a single product by its ID (Public)
router.get('/:id', getProductById);

module.exports = router;