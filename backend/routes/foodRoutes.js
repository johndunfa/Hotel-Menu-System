// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood
} = require('../controllers/foodController');
const { upload, handleMulterError } = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/')
  .get(getFoods);

router.route('/:id')
  .get(getFood);

// Admin routes
router.route('/')
  .post(protect, authorize('admin'), upload.single('image'), createFood, handleMulterError);

router.route('/:id')
  .put(protect, authorize('admin'), upload.single('image'), updateFood, handleMulterError)
  .delete(protect, authorize('admin'), deleteFood);

module.exports = router;