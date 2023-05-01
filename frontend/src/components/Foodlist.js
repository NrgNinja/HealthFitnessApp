/*import React from 'react';
import { useFoodContext } from '../hooks/useFoodContext';
import FoodForm from './FoodForm';

const Foodlist = () => {
  const { foods, addFood, deleteFood, editFood } = useFoodContext();

  const handleSubmit = (food) => {
    addFood(food.name, food.calorieCount);
  };

  return (
    <div className="Foodlist">
      <h1>Food List</h1>
      {foods.map((food) => (
        <FoodForm
          key={food._id}
          food={food}
          onSubmit={(newFood) => {
            editFood(food._id, newFood.name, newFood.calorieCount);
          }}
          onDelete={() => deleteFood(food._id)}
        />
      ))}
      <FoodForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Foodlist;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Foodlist = () => {
  const [foods, setFoods] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCalories, setNewFoodCalories] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/foods', { withCredentials: true });
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addFood = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/foods', {
        name: newFoodName,
        calorieCount: newFoodCalories
      }, { withCredentials: true });
      setFoods([...foods, response.data]);
      setNewFoodName('');
      setNewFoodCalories('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(`/api/foods/${id}`, { withCredentials: true });
      setFoods(foods.filter((food) => food._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editFood = async (id, newName, newCalories) => {
    try {
      await axios.patch(`/api/foods/${id}`, {
        name: newName,
        calorieCount: newCalories,
      }, { withCredentials: true });
      setFoods(
        foods.map((food) =>
          food._id === id ? { ...food, name: newName, calorieCount: newCalories } : food
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Foodlist">
      <h1>Food List</h1>
      {foods.map((food) => (
        <div key={food._id}>
          <p>{food.name}</p>
          <p>{food.calorieCount}</p>
          <button onClick={() => deleteFood(food._id)}>Delete</button>
          <button
            onClick={() => {
              const newName = prompt('Enter new name:', food.name);
              const newCalories = prompt('Enter new calorie count:', food.calorieCount);
              if (newName && newCalories) {
                editFood(food._id, newName, newCalories);
              }
            }}
          >
            Edit
          </button>
        </div>
      ))}
      <form onSubmit={addFood}>
        <input
          type="text"
          placeholder="Food name"
          value={newFoodName}
          onChange={(e) => setNewFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={newFoodCalories}
          onChange={(e) => setNewFoodCalories(e.target.value)}
        />
        <button type="submit">Add food</button>
      </form>
    </div>
  );
};

export default Foodlist;
