// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@bokugrand.com' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    // Create admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@bokugrand.com',
      password: 'admin123456',
      role: 'admin',
    });

    console.log('Admin created successfully!');
    console.log('Email: admin@bokugrand.com');
    console.log('Password: admin123456');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();