import React, { useState } from 'react'
import {
  addToDo,
  editToDo,
  deleteToDo,
  toggleTodo,
} from '../redux/toDoSlice.js';
import { useDispatch, useSelector } from 'react-redux'


const Redux = () => {
  const [currentToDo, setCurrentToDo] = useState('')
  const [editId,setEditId]=useState(null)
  const dispatch = useDispatch();
  const toDos = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault()
     if (!currentToDo.trim()) {
       return alert('Enter a todo!');
     }

    if (editId) {
      dispatch(editToDo({ id: editId, text: currentToDo }));
      setEditId(null);
    } else {
       dispatch(addToDo(currentToDo));
    }
    setCurrentToDo('')
  }


  const handleEdit = (id, text) => {
    setEditId(id);
    setCurrentToDo(text)
  };



console.log(toDos,"hii");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          <input
            type='text'
            name='name'
            placeholder='Enter your ToDo'
            value={currentToDo}
            onChange={(e) => setCurrentToDo(e.target.value)}
          />
        </label>
        <button type='submit'>{editId?"Update":"Add"}</button>
      </form>
      {toDos&&toDos.length > 0 ? (
        <div>
          {toDos.map((item) => {
            return (
              <ul key={item?.id}>
                <li
                  style={{
                    textDecoration: `${
                      item.isCompleted ? 'line-through' : 'none'
                    }`,
                  }}
                >
                  {item?.text}
                  <input
                    type='checkbox'
                    value={item?.isCompleted}
                    onChange={() => dispatch(toggleTodo(item.id))}
                  />
                  <button onClick={() => handleEdit(item?.id, item?.text)}>
                    Edit
                  </button>
                  <button onClick={() => dispatch(deleteToDo(item?.id))}>
                    Delete
                  </button>
                </li>
              </ul>
            );

          })}
        </div>
      ) : (
        <div>
          <h1>No Todos found</h1>
        </div>
      )}
    </div>
  );
}

export default Redux
