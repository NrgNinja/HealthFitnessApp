import React from 'react';
import Activitybox from '../components/Activitybox';
import Foodlist from '../components/Foodlist';
import Nutrition from '../components/Nutrition';
import '../App.css';
import { motion as m } from "framer-motion";


const Home = () =>
{
  return (
    <m.div className="App"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{duration: 1, ease: "easeOut"}}>
        <Nutrition></Nutrition>
        <Activitybox></Activitybox>
        <Foodlist></Foodlist>
    </m.div>
  );
}

export default Home;