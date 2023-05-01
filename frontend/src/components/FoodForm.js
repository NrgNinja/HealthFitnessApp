import React, { useState } from 'react';

const FoodForm = ({ food, onSubmit, onDelete }) => {
  const [name, setName] = useState(food ? food.name : '');
  const [calorieCount, setCalorieCount] = useState(food ? food.calorieCount : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && calorieCount) {
      onSubmit({ name, calorieCount });
      setName('');
      setCalorieCount('');
    }
  };

  return (
    <div className="FoodForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calorieCount}
          onChange={(e) => setCalorieCount(e.target.value)}
        />
        <button type="submit">{food ? 'Update' : 'Add'}</button>
        {food && (
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default FoodForm;
