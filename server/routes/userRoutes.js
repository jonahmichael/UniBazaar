const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { rateSeller } = require('../controllers/userController');

// @route   POST /api/users/:sellerId/rate
// @desc    Rate a specific seller
// @access  Private
router.post('/:sellerId/rate', authMiddleware, rateSeller);

module.exports = router;