import { createContext } from 'react';

export const RepsContext = createContext({
  reps: [],
  setReps: () => {},
});
