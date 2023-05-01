import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('/api/foods');
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoods();
  }, []);

  const addFood = async (newFoodName, newFoodCalories) => {
    try {
      const response = await axios.post('/api/foods', {
        name: newFoodName,
        calorieCount: newFoodCalories,
      });
      setFoods([...foods, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(`/api/foods/${id}`);
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
      });
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
    <FoodContext.Provider value={{ foods, addFood, deleteFood, editFood }}>
      {children}
    </FoodContext.Provider>
  );
};
