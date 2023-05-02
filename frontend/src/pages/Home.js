import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { motion as m } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import bigBoy from '../pizap.jpg';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredWorkouts = workouts
    ? workouts.filter(
        workout =>
          workout.title &&
          workout.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : workouts;

  return (
    <m.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >

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
        <div className="search-container">
        <input className="search-container"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          placeholder="Search workouts..."
        />
      </div>
        <AnimatePresence>
        {filteredWorkouts &&
            filteredWorkouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default Home;
