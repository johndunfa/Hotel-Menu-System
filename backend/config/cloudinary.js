// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test the connection
const testCloudinaryConnection = () => {
  try {
    console.log('✅ Cloudinary configured successfully');
    console.log(`📁 Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    return true;
  } catch (error) {
    console.error('❌ Cloudinary configuration error:', error.message);
    return false;
  }
};

// Export both cloudinary instance and test function
module.exports = {
  cloudinary,
  testCloudinaryConnection
};