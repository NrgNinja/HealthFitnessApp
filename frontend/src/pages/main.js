import React from 'react';
import Activitybox from '../components/Activitybox';
import Foodlist from '../components/Foodlist';
import Nutrition from '../components/Nutrition';
import '../App.css';

const Home = () =>
{
  return (
    <div className="App">
        <Nutrition></Nutrition>
        <Activitybox></Activitybox>
        <Foodlist></Foodlist>
    </div>
  );
}

export default Home;