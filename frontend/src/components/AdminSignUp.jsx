import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/adminregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Admin registered successfully!");
        navigate('/adminlogin');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className='signup-form'>
      <h2 className='sign-heading'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='signup-labels' htmlFor='first_name'>First Name:</label>
          <input className='signup-inputs' type='text' id='first_name' name='first_name' value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
          <label className='signup-labels' htmlFor='last_name'>Last Name:</label>
          <input className='signup-inputs' type='text' id='last_name' name='last_name' value={formData.last_name} onChange={handleChange} required />
        </div>
        <div>
          <label className='signup-labels' htmlFor='email'>Email:</label>
          <input className='signup-inputs' type='email' id='email' name='email' value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className='signup-labels' htmlFor='password'>Password:</label>
          <input className='signup-inputs' type='password' id='password' name='password' value={formData.password} onChange={handleChange} required />
        </div>
        <button className='sign-button' type='submit'>Sign Up as a New Admin</button>
      </form>
    </div>
  );
}

export default AdminSignUp;
