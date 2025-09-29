const express = require('express');
const router = express.Router();
const {
    getRecommendations,
    getSimilarProducts,
    chatResponse,
    getSizeRecommendation
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/recommendations', protect, getRecommendations);
router.get('/similar/:id', getSimilarProducts);
router.post('/chat', chatResponse);
router.post('/size-recommendation', getSizeRecommendation);

module.exports = router;