const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // adjust path if needed
require('dotenv').config();

async function createDummyUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Regular user
    const userPassword = await bcrypt.hash('123456', 10);
    const userExists = await User.findOne({ email: 'user@example.com' });
    if (!userExists) {
      await User.create({
        name: 'Test User',
        email: 'user@example.com',
        password: userPassword,
        isAdmin: false
      });
      console.log('Regular user created: user@example.com / 123456');
    } else {
      console.log('Regular user already exists');
    }

    // Admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        isAdmin: true
      });
      console.log('Admin user created: admin@example.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Error creating users:', err);
  }
}

createDummyUsers();