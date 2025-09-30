// const express = require('express');
// const router = express.Router();
// const { register, login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', protect, getMe);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;