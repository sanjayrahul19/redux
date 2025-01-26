import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password:""
  })

  const [error,setError]=useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]:value
      };
    })
  }

  const validate = () => {
    const error = {};
    if (!formData.name.trim()) {
      error.name = 'Name is required';
    } else if (formData.name.length < 3) {
      error.name = 'Name should be atleast 3 characters long';
    }

    const emailRegx='^[^@]+@[^@]+\.[^@]+$'
    if (!formData.email.trim()) {
      error.email = 'Email is required';
    } else if (!emailRegx.match(formData.email)) {
      error.email = 'Enter a valid email address';
    }

    if (!formData.password.trim()) {
      error.password = 'password is required';
    } else if (formData.password.length < 5) {
      error.password = 'Email should be atleast 5 characters long';
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      setError({});
      console.log('Submitted successfully');
    }
  }

  console.log(formData)

  console.log(error);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>
            Name
            <input
              type='text'
              name='name'
              placeholder='Enter your name'
              id='name'
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
        </div>
        <div>
          <label htmlFor='email'>
            Email
            <input
              type='text'
              name='email'
              placeholder='Enter your email'
              id='email'
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
        </div>
        <div>
          <label htmlFor='password'>
            Password
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              id='password'
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form
