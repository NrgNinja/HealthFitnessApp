// import React from 'react';

// import PageTitle from '../components/PageTitle';
// import LoggedInName from '../components/LoggedInName';
// import CardUI from '../components/CardUI';

// const CardPage = () =>
// {
//     return(
//         <div>
//             <PageTitle />
//             <LoggedInName />
//             <CardUI />
//         </div>
//     );
// } I gotta be retarded.

// export default CardPage;
import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { motion as m } from "framer-motion";

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const AddWorkout = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <m.div className="home"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{duration: 1, ease: "easeOut"}}>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </m.div>
  )
}

export default AddWorkout;