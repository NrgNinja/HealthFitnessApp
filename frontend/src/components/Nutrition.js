/*import React from 'react';


const Nutrition = () => {
    
    return (
        <header className="Calbox">
            <h1 className="Dailycals">Daily Intake <br /> 1500</h1>
            <h1 className="Eats">Food <br /> 1000</h1>
            <h1 className="Lifts">Exercise <br /> 200</h1>
            <h1 className="Total">Total <br /> 700</h1>
        </header>
    );
}

export default Nutrition;*/

import React, { useEffect, useState } from 'react';

const Nutrition = () => {
  const [dailyIntake, setDailyIntake] = useState(0);
  const [food, setFood] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Retrieve user's weight from database
    // and calculate daily intake
    const userWeight = 150;
    const dailyIntake = userWeight * 10 + 500;
    setDailyIntake(dailyIntake);
  }, []);

  useEffect(() => {
    // Update total when food or exercise changes
    const newTotal = dailyIntake - food + exercise;
    setTotal(newTotal);
  }, [food, exercise]);

  return (
    <header className="Calbox">
      <h1 className="Dailycals">
        Daily Intake <br />
        {dailyIntake}
      </h1>
      <div className="operator-"><h1>-</h1></div>
      <h1 className="Eats">
        Food <br />
        {food}
      </h1>
      <div className="operatorp"><h1>+</h1></div>
      <h1 className="Lifts">
        Exercise <br />
        {exercise}
      </h1>
      <div className="operatoreq"><h1>=</h1></div>
      <h1 className="Total">
        Total <br />
        {total}
      </h1>
    </header>
  );
};

export default Nutrition;
