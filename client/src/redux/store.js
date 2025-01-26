import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from "./toDoSlice.js"

export const store = configureStore({
  reducer: {
    todos: toDoReducer,
  },
});
