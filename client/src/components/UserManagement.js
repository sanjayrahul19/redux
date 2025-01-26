import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, updateUser } from '../redux/toDoSlice.js';

const UserManagement = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null)
  const { users } = useSelector((state) => state.userManagement);
  const dispatch=useDispatch()

  const handleChange = (e) => {
    const {name,value}=e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]:value
      }
    })
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setFormData({ name: item.name ,email:item.email });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
dispatch(
  updateUser({ id: editId, name: formData.name, email: formData.email }),
);
    } else {
      dispatch(addUser({ name: formData.name,email: formData.email}));
    }
    setFormData({ name: '', email: '' });
  }
console.log(users)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>
            <input
              type='text'
              name='name'
              id='name'
              onChange={handleChange}
              value={formData.name}
            />
          </label>
        </div>
        <div>
          <label htmlFor='email'>
            <input
              type='text'
              name='email'
              id='email'
              onChange={handleChange}
              value={formData.email}
            />
          </label>
        </div>
        <div>
          <button type='submit'>
            {editId?"Update":"Add"}
          </button>
        </div>
      </form>
      <h1>Users</h1>
      {users && users.length > 0 ? <div>
        {users.map((item) => {
          return (
            <div key={item.id}>
              <h2>Name:{item.name}</h2>
              <h2>Email:{item.email}</h2>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => dispatch(deleteUser({ id:item.id }))}>
                Delete
              </button>
            </div>
          );
        })}
      </div> : <div>
        <h1>No Users Found</h1>
      </div>}
    </div>
  );
}

export default UserManagement
