import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducer'

const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});

export default store;