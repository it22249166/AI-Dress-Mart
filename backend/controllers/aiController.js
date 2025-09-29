const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get AI recommendations
// @route   POST /api/ai/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
    try {
        const { preferences, cartItems, favoriteItems } = req.body;

        let recommendedProducts = [];

        // Get user's preference categories
        const userCategories = [...new Set([
            ...(cartItems?.map(item => item.category) || []),
            ...(favoriteItems?.map(item => item.category) || []),
            ...(preferences?.favoriteCategories || [])
        ])];

        // If user has preferences, recommend based on them
        if (userCategories.length > 0) {
            recommendedProducts = await Product.find({
                category: { $in: userCategories },
                _id: { $nin: [...(cartItems?.map(i => i._id) || []), ...(favoriteItems?.map(i => i._id) || [])] }
            })
                .sort({ rating: -1 })
                .limit(6);
        }

        // If not enough recommendations, add trending products
        if (recommendedProducts.length < 6) {
            const trending = await Product.find({
                _id: { $nin: recommendedProducts.map(p => p._id) }
            })
                .sort({ rating: -1, numReviews: -1 })
                .limit(6 - recommendedProducts.length);

            recommendedProducts = [...recommendedProducts, ...trending];
        }

        res.json({ success: true, data: recommendedProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get similar products
// @route   GET /api/ai/similar/:id
// @access  Public
exports.getSimilarProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find products with same category or occasion
        const similarProducts = await Product.find({
            _id: { $ne: product._id },
            $or: [
                { category: product.category },
                { occasion: product.occasion }
            ]
        })
            .sort({ rating: -1 })
            .limit(4);

        res.json({ success: true, data: similarProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    AI Chatbot response
// @route   POST /api/ai/chat
// @access  Public
exports.chatResponse = async (req, res) => {
    try {
        const { message } = req.body;
        const lowerMessage = message.toLowerCase();

        let response = '';

        if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
            const topProducts = await Product.find().sort({ rating: -1 }).limit(3);
            response = `Based on our top-rated collection, I recommend: ${topProducts.map(p => p.name).join(', ')}. Would you like to know more about any of these?`;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('budget')) {
            response = "I can help you find dresses within your budget! Our collection ranges from $69 to $449. What's your price range?";
        } else if (lowerMessage.includes('occasion') || lowerMessage.includes('event')) {
            response = "What's the occasion? We have dresses for: Casual outings, Formal events, Cocktail parties, Business meetings, Weddings, and Beach vacations!";
        } else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
            response = "We offer sizes from XS to XXL. For the best fit, please check our size guide on each product page. Need help finding your size?";
        } else if (lowerMessage.includes('color')) {
            response = "We have dresses in many beautiful colors! What's your favorite color or the occasion you're shopping for?";
        } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
            response = "We offer free shipping on orders over $100! Standard delivery takes 3-5 business days. Express shipping is also available.";
        } else {
            response = "I'm here to help you find the perfect dress! I can assist with style recommendations, sizing, pricing, occasions, and more. What would you like to know?";
        }

        res.json({ success: true, message: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get size recommendation
// @route   POST /api/ai/size-recommendation
// @access  Public
exports.getSizeRecommendation = async (req, res) => {
    try {
        const { height, weight, bodyType } = req.body;

        let recommendedSize = 'M'; // Default

        // Simple AI logic for size recommendation
        const bmi = weight / ((height / 100) ** 2);

        if (bmi < 18.5) {
            recommendedSize = 'XS';
        } else if (bmi < 22) {
            recommendedSize = 'S';
        } else if (bmi < 25) {
            recommendedSize = 'M';
        } else if (bmi < 28) {
            recommendedSize = 'L';
        } else {
            recommendedSize = 'XL';
        }

        res.json({
            success: true,
            data: {
                recommendedSize,
                confidence: 'high',
                message: `Based on your measurements, we recommend size ${recommendedSize}. Always check the product-specific size chart for the best fit.`
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};