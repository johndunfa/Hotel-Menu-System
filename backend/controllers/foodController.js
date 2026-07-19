// controllers/foodController.js
const Food = require('../models/Food');
const Category = require('../models/Category');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
exports.getFoods = async (req, res, next) => {
  try {
    const foods = await Food.find().populate('category', 'name');
    
    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single food
// @route   GET /api/foods/:id
// @access  Public
exports.getFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id).populate('category', 'name');
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create food with image
// @route   POST /api/foods
// @access  Private/Admin
exports.createFood = async (req, res, next) => {
  try {
    // Check if category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Get image URL from Cloudinary (uploaded via multer)
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const food = await Food.create({
      ...req.body,
      image: imageUrl,
      price: parseFloat(req.body.price),
    });

    res.status(201).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update food with image
// @route   PUT /api/foods/:id
// @access  Private/Admin
exports.updateFood = async (req, res, next) => {
  try {
    let food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (food.image) {
        try {
          const publicId = food.image.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`hotel-menu/${publicId}`);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      req.body.image = req.file.path; // Cloudinary URL
    }

    // Parse price if provided
    if (req.body.price) {
      req.body.price = parseFloat(req.body.price);
    }

    food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete food
// @route   DELETE /api/foods/:id
// @access  Private/Admin
exports.deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    // Delete image from Cloudinary
    if (food.image) {
      try {
        const publicId = food.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`hotel-menu/${publicId}`);
        console.log('✅ Image deleted from Cloudinary');
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await food.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};