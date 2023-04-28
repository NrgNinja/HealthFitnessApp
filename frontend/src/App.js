import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { AnimatePresence, motion } from 'framer-motion'

// tristan was here

// pages & components
import AnimatedRoutes from './AnimatedRoutes'
import Navbar from './components/Navbar'

// key={location.pathname} location={location}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;