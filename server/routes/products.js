const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// This is the single, corrected line that imports BOTH functions.
const { createProduct, getAllProducts } = require('../controllers/productController');

// ROUTE 1: Create a new product
router.post('/', authMiddleware, createProduct);

// ROUTE 2: Get all products
router.get('/', getAllProducts);

module.exports = router;