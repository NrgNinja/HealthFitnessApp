const Food = require('../models/foodModel');
const mongoose = require('mongoose');

// get all foods for a user
const getFoods = async (req, res) => {
  const user_id = req.user._id;

  const foods = await Food.find({ user: user_id }).sort({ createdAt: -1 });

  res.status(200).json(foods);
};

// get a single food
const getFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Food does not exist' });
  }

  const food = await Food.findById(id);

  if (!food) {
    return res.status(404).json({ error: 'Food does not exist' });
  }

  res.status(200).json(food);
};

// create new food
const createFood = async (req, res) => {
  const { name, calorieCount } = req.body;

  if (!name || !calorieCount) {
    return res
      .status(400)
      .json({ error: 'Please provide a name and calorie count' });
  }

  try {
    const user_id = req.user._id;
    const food = await Food.create({ name, calorieCount, user: user_id });
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a food
const deleteFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Food does not exist' });
  }

  const food = await Food.findOneAndDelete({ _id: id });

  if (!food) {
    return res.status(400).json({ error: 'Food does not exist' });
  }

  res.status(200).json(food);
};

// update a food
const updateFood = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Food does not exist' });
  }

  const food = await Food.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!food) {
    return res.status(400).json({ error: 'Food does not exist' });
  }

  res.status(200).json(food);
};

module.exports = {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood,
};
