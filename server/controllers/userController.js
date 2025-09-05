const User = require('../models/User');

// @desc    Rate a seller
// @route   POST /api/users/:sellerId/rate
// @access  Private
exports.rateSeller = async (req, res) => {
    const { rating, comment } = req.body;
    const sellerId = req.params.sellerId;
    const raterId = req.user.id; // from authMiddleware

    if (sellerId === raterId) {
        return res.status(400).json({ msg: "You cannot rate yourself." });
    }

    try {
        const seller = await User.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ msg: 'Seller not found' });
        }

        // Add the new rating
        const newRating = {
            rating: Number(rating),
            comment,
            ratedBy: raterId,
        };
        seller.ratings.push(newRating);

        // Recalculate the average rating
        const totalRating = seller.ratings.reduce((acc, item) => item.rating + acc, 0);
        seller.averageRating = totalRating / seller.ratings.length;

        await seller.save();
        res.json({ msg: 'Thank you for your feedback!', averageRating: seller.averageRating });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};