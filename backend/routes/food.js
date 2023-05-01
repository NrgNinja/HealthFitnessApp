const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood,
} = require('../controllers/foodController');

// require auth for all food routes
router.use(requireAuth);

// GET all foods
router.get('/', getFoods);

// GET a single food
router.get('/:id', getFood);

// POST a new food
router.post('/', createFood);

// DELETE a food
router.delete('/:id', deleteFood);

// UPDATE a food
router.patch('/:id', updateFood);

module.exports = router;
