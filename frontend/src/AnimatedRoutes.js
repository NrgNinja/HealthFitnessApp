import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { AnimatePresence } from 'framer-motion'

// tristan was here

// pages & components
import Home from './pages/main'
import AddWorkout from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

// key={location.pathname} location={location}
function AnimatedRoutes() {
  const { user } = useAuthContext();
  const { location } = useLocation();
  return (
          <AnimatePresence >
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/addExercise" 
              element={user ? <AddWorkout /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
          </AnimatePresence>
  );
}


export default AnimatedRoutes;