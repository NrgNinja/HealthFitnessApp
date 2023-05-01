import { createContext, useContext } from 'react';

const foodContext = createContext();

export function useFoodContext() {
  return useContext(foodContext);
}

export default foodContext;
