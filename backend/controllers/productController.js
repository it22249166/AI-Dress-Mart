// // const Product = require('../models/Product');

// // // @desc    Get all products
// // // @route   GET /api/products
// // // @access  Public
// // const getProducts = async (req, res) => {
// //     try {
// //         const { category, minPrice, maxPrice, size, search, sort } = req.query;

// //         let query = {};

// //         // Category filter
// //         if (category && category !== 'all') {
// //             query.category = category;
// //         }

// //         // Price filter
// //         if (minPrice || maxPrice) {
// //             query.price = {};
// //             if (minPrice) query.price.$gte = Number(minPrice);
// //             if (maxPrice) query.price.$lte = Number(maxPrice);
// //         }

// //         // Size filter
// //         if (size && size !== 'all') {
// //             query.sizes = size;
// //         }

// //         // Search
// //         if (search) {
// //             query.$or = [
// //                 { name: { $regex: search, $options: 'i' } },
// //                 { description: { $regex: search, $options: 'i' } }
// //             ];
// //         }

// //         let products = Product.find(query);

// //         // Sort
// //         if (sort === 'price-asc') {
// //             products = products.sort({ price: 1 });
// //         } else if (sort === 'price-desc') {
// //             products = products.sort({ price: -1 });
// //         } else if (sort === 'rating') {
// //             products = products.sort({ rating: -1 });
// //         } else {
// //             products = products.sort({ createdAt: -1 });
// //         }

// //         products = await products;

// //         res.json({
// //             success: true,
// //             count: products.length,
// //             data: products
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // @desc    Get single product
// // // @route   GET /api/products/:id
// // // @access  Public
// // const getProduct = async (req, res) => {
// //     try {
// //         const product = await Product.findById(req.params.id).populate('reviews.user', 'name');

// //         if (!product) {
// //             return res.status(404).json({ message: 'Product not found' });
// //         }

// //         res.json({ success: true, data: product });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // @desc    Create product
// // // @route   POST /api/products
// // // @access  Private/Admin
// // const createProduct = async (req, res) => {
// //     try {
// //         const product = await Product.create(req.body);
// //         res.status(201).json({ success: true, data: product });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // @desc    Update product
// // // @route   PUT /api/products/:id
// // // @access  Private/Admin
// // const updateProduct = async (req, res) => {
// //     try {
// //         const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
// //             new: true,
// //             runValidators: true
// //         });

// //         if (!product) {
// //             return res.status(404).json({ message: 'Product not found' });
// //         }

// //         res.json({ success: true, data: product });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // @desc    Delete product
// // // @route   DELETE /api/products/:id
// // // @access  Private/Admin
// // const deleteProduct = async (req, res) => {
// //     try {
// //         const product = await Product.findByIdAndDelete(req.params.id);

// //         if (!product) {
// //             return res.status(404).json({ message: 'Product not found' });
// //         }

// //         res.json({ success: true, message: 'Product deleted' });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // @desc    Create product review
// // // @route   POST /api/products/:id/reviews
// // // @access  Private
// // const createReview = async (req, res) => {
// //     try {
// //         const { rating, comment } = req.body;
// //         const product = await Product.findById(req.params.id);

// //         if (!product) {
// //             return res.status(404).json({ message: 'Product not found' });
// //         }

// //         // Check if already reviewed
// //         const alreadyReviewed = product.reviews.find(
// //             r => r.user.toString() === req.user._id.toString()
// //         );

// //         if (alreadyReviewed) {
// //             return res.status(400).json({ message: 'Product already reviewed' });
// //         }

// //         const review = {
// //             name: req.user.name,
// //             rating: Number(rating),
// //             comment,
// //             user: req.user._id
// //         };

// //         product.reviews.push(review);
// //         product.numReviews = product.reviews.length;
// //         product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

// //         await product.save();
// //         res.status(201).json({ message: 'Review added' });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // module.exports = {
// //   getProducts,
// //   getProduct,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   createReview
// // };
// const Product = require('../models/Product');

// const getProducts = async (req, res) => {
//   const products = await Product.find({});
//   res.json(products);
// };

// const getProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   res.json(product);
// };

// const createProduct = async (req, res) => {
//   const product = await Product.create(req.body);
//   res.status(201).json(product);
// };

// const updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   res.json(product);
// };

// const deleteProduct = async (req, res) => {
//   const product = await Product.findByIdAndDelete(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });
//   res.json({ message: 'Product deleted' });
// };

// module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };



// @desc Get all products with filters and search
// @route GET /api/products
// @access Public
// const getProducts = async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, size, search, sort } = req.query;

//     let query = {};

//     if (category && category !== 'all') query.category = category;
//     if (size && size !== 'all') query.sizes = size;
//     if (minPrice || maxPrice) query.price = {};
//     if (minPrice) query.price.$gte = Number(minPrice);
//     if (maxPrice) query.price.$lte = Number(maxPrice);
//     if (search) query.$or = [
//       { name: { $regex: search, $options: 'i' } },
//       { description: { $regex: search, $options: 'i' } }
//     ];

//     let productsQuery = Product.find(query);

//     if (sort === 'price-asc') productsQuery = productsQuery.sort({ price: 1 });
//     else if (sort === 'price-desc') productsQuery = productsQuery.sort({ price: -1 });
//     else if (sort === 'rating') productsQuery = productsQuery.sort({ rating: -1 });
//     else productsQuery = productsQuery.sort({ createdAt: -1 });

//     const products = await productsQuery;

//     res.json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const Product = require('../models/Product');
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products }); // always return { success, data }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };