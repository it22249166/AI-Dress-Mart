// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       return next();
//     }

//     return res.status(401).json({ message: 'No token provided' });
//   } catch (error) {
//     return res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     return next();
//   }
//   return res.status(403).json({ message: 'Admin access only' });
// };

// module.exports = { protect, admin };
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    }

    return res.status(401).json({ message: 'No token provided' });
  } catch {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  return res.status(403).json({ message: 'Admin access only' });
};

module.exports = { protect, admin };