// controllers/categoryController.js
const Category = require('../models/Category');
const Food = require('../models/Food');
const cloudinary = require('cloudinary').v2;

// @desc    Create category with image
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const category = await Category.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (category.image) {
        const publicId = category.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`hotel-menu/${publicId}`);
      }
      req.body.image = req.file.path;
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Check if category has foods
    const foodCount = await Food.countDocuments({ category: req.params.id });
    if (foodCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${foodCount} foods. Remove foods first.`,
      });
    }

    // Delete image from Cloudinary
    if (category.image) {
      const publicId = category.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`hotel-menu/${publicId}`);
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};