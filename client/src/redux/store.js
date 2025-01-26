import { configureStore } from '@reduxjs/toolkit';
import toDoReducer, { userManagementReducer } from "./toDoSlice.js"

export const store = configureStore({
  reducer: {
    todos: toDoReducer,
    userManagement:userManagementReducer
  },
});
