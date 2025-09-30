const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // adjust path if needed
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    isAdmin: true
  });

  await adminUser.save();
  console.log('Admin dummy user created!');
  mongoose.disconnect();
}).catch(err => console.log(err));