// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
  getFoodsByCategory,
} = require('../controllers/foodController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', getFoods);
router.get('/:id', getFood);
router.get('/category/:categoryId', getFoodsByCategory);

// Admin routes
router.post('/', protect, authorize('admin'), upload.single('image'), createFood);
router.put('/:id', protect, authorize('admin'), upload.single('image'), updateFood);
router.delete('/:id', protect, authorize('admin'), deleteFood);

module.exports = router;