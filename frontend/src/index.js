import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import { FoodProvider } from './context/FoodContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <FoodProvider>
          <App />
        </FoodProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
