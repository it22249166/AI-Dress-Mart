// const express = require('express');
// const router = express.Router();
// const {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   createReview
// } = require('../controllers/productController');
// const { protect, admin } = require('../middleware/auth');

// // Product routes
// router.get('/', getProducts);
// router.post('/', protect, admin, createProduct);

// router.get('/:id', getProduct);
// router.put('/:id', protect, admin, updateProduct);
// router.delete('/:id', protect, admin, deleteProduct);

// router.post('/:id/reviews', protect, createReview);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;