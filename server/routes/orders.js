const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// This file only needs functions from the orderController.
const { createOrder, getMyOrders } = require('../controllers/orderController');

// --- ALL ORDER FEATURES ARE PRESERVED HERE ---

// FEATURE from Sprint 6: Create a new order (for buying or borrowing) (Private)
router.post('/', authMiddleware, createOrder);

// FEATURE from Sprint 13: Get the logged-in user's own orders (Private)
router.get('/my-orders', authMiddleware, getMyOrders);

module.exports = router;