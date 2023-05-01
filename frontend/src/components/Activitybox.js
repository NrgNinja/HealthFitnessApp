import React from 'react';
import InflateAnimate from './InflateAnimate';
import { useNavigate } from 'react-router-dom';

const plus = {
  fontSize: '100px',
  textAlign: 'center'
}

const Activitybox = () => {
  const navigate = useNavigate();

  const doWorkout = () => {
    console.log("Workout clicked");
    navigate('/addExercise');
  }
  return (
    <div className="Activitybox">
      <h1>Exercise and Workouts</h1>
      <div className="Workoutbox">
        <div className="Workouts" onClick={doWorkout}>
            <p>Workout 1</p>
        </div>
        <div className="Workouts" onClick={doWorkout}>
          <InflateAnimate>
            <p>Workout 2</p>
          </InflateAnimate>
        </div>
        <div className="Workouts" onClick={doWorkout}>
          <InflateAnimate>
            <p>Workout 3</p>
          </InflateAnimate>
        </div>
        <div className="Workouts" onClick={doWorkout}>
          <InflateAnimate>
            <p>Workout 4</p>
          </InflateAnimate>
        </div>
        <div className="Workouts" onClick={doWorkout}>
          <InflateAnimate>
            <p>Workout 5</p>
          </InflateAnimate>
        </div>
        <div className="Workouts" style={plus}>
          +
        </div>
      </div>
    </div>
  );
}

export default Activitybox;
