const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            user.preferences = req.body.preferences || user.preferences;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
router.post('/wishlist/:productId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user.wishlist.includes(req.params.productId)) {
            user.wishlist.push(req.params.productId);
            await user.save();
        }

        res.json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
router.delete('/wishlist/:productId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
        await user.save();

        res.json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
router.get('/wishlist', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;