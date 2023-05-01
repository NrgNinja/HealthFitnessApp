import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { motion as m } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import bigBoy from '../pizap.jpg';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const [showImage, setShowImage] = useState(false);

  const handleButtonClick = () => {
    setShowImage(!showImage);
  };

  return (
    <m.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Add button to bottom left corner */}
      {!showImage && (
        <m.button
          className="image-button"
          onClick={handleButtonClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 200 }}
        >
          Press to see the peak of masculinity
        </m.button>
      )}
      {showImage && (
        <m.img
          className="image"
          src={bigBoy}
          alt="My Image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration:  8}}
          onAnimationComplete={() => setShowImage(false)}
        />
      )}
      <div className="workouts">
        <WorkoutForm />
        <AnimatePresence>
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default Home;
