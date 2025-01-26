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
     const index = state.findIndex((todo) => todo.id === action.payload);
     if (index !== -1) {
       state.splice(index, 1); // Mutate the state directly,second index is delete count
     }
    },
    toggleTodo: (state, action) => {
      const toDo = state.find((item) => item.id === action.payload);
     if (toDo) {
       toDo.isCompleted = !toDo.isCompleted;
     }
    },
  },
});

const user = {
  users:[]
}


const userManagement = createSlice({
  name: 'userManagement',
  initialState:user,
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
      });
    },
    updateUser: (state, action) => {
      const user = state.users.find((item) => item.id === action.payload.id);
      if (user) {
        user.name = action.payload.name;
        user.email = action.payload.email;
      }
    },
    deleteUser: (state, action) => {
    state.users = state.users.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userManagement.actions
export const userManagementReducer = userManagement.reducer;

export const { addToDo, editToDo, deleteToDo, toggleTodo, } = toDoSlice.actions;

export default toDoSlice.reducer
