// // const express = require('express');
// // const cors = require('cors');
// // const authRoutes = require('./routes/auth');
// // const productRoutes = require('./routes/products');

// // const app = express();
// // app.use(express.json());

// // // Enable CORS
// // // app.use(cors({
// // //   origin: ['http://localhost:3000', 'http://localhost:3001'], // frontend URLs
// // //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// // //   allowedHeaders: ['Content-Type', 'Authorization'],
// // //   credentials: true
// // // }));


// // app.use(cors({
// //   origin: ['http://localhost:3000', 'http://localhost:3001'],
// //   credentials: true
// // }));

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/products', productRoutes);

// // const PORT = process.env.PORT || 5001;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // Proper CORS configuration
// app.use(cors({
//     origin: ['http://localhost:3000'], // frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // exit if connection fails
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));