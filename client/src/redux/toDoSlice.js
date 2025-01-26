import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const toDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, isCompleted: false });
    },
    editToDo: (state, action) => {
      const { id, text } = action.payload;
      const toDo = state.find((item) => item.id === id);
      if (toDo) {
        toDo.text = text;
      }
    },
    deleteToDo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const toDo = state.find((item) => item.id === action.payload);
     if (toDo) {
       toDo.isCompleted = !toDo.isCompleted;
     }
    },
  },
});

export const { addToDo, editToDo, deleteToDo, toggleTodo } = toDoSlice.actions;

export default toDoSlice.reducer
