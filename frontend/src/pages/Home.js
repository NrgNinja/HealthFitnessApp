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
// }

// export default CardPage;
import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { motion as m } from "framer-motion"
import { AnimatePresence } from "framer-motion";

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
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
    transition={{ duration: 2 }}>
      <div className="workouts">
        <AnimatePresence>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
          
        ))}
        </AnimatePresence>
      </div>
      <WorkoutForm />
    </m.div>
  )
}

export default Home