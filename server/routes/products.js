const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware
const { createProduct } = require('../controllers/productController');

// @route   POST /api/products
// @desc    Create a new product listing
// @access  Private
router.post('/', authMiddleware, createProduct);
// Notice how we put `authMiddleware` right before `createProduct`.
// This tells Express to run our middleware first. If the token is invalid,
// createProduct will never even be called.

module.exports = router;