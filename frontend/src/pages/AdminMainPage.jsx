import AdminNavBar from '../components/AdminNavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function AdminMainPage({ isAuthenticated ,AdminId}) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        description: '',
        cost: '',
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        setTaskFormData({
            ...taskFormData,
            [name]: value
          });
      };
    
      const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            alert("User added successfully!");
            navigate('/adminhome');
          } else {
            const errorData = await response.json();
            console.error('Signup failed:', errorData.error || 'Unknown error');
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
      };
      const handleGroomerSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://127.0.0.1:5000/groomerregister', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            alert("Groomer added successfully!");
            navigate('/adminhome');
          } else {
            const errorData = await response.json();
            console.error('Signup failed:', errorData.error || 'Unknown error');
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
      };
      const handleTaskSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://127.0.0.1:5000/jobs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskFormData)
          });
          if (response.ok) {
            alert("Task created successfully!");
            navigate('/adminhome');
          } else {
            const errorData = await response.json();
            console.error('Signup failed:', errorData.error || 'Unknown error');
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
      };
  return (
    <div className='mainpage'>
      <AdminNavBar isAuthenticated={isAuthenticated}  />
      <h2 className='sign-heading'>Register New User</h2>
      <form onSubmit={handleUserSubmit}>
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
        <button className='sign-button' type='submit'>Register New User</button>
      </form>
      <br></br>
      <br></br>
      <h2 className='sign-heading'>Register New Groomer</h2>
      <form onSubmit={handleGroomerSubmit}>
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
        <button className='sign-button' type='submit'>Register New User</button>
      </form>
      <br></br>
      <br></br>
      <h2 className='sign-heading'>Create New Task</h2>
      <form onSubmit={handleTaskSubmit}>
        <div>
          <label className='signup-labels' htmlFor='title'>Title:</label>
          <input className='signup-inputs' type='text' id='title' name='title' value={taskFormData.title} onChange={handleChange} required />
        </div>
        <div>
          <label className='signup-labels' htmlFor='description'>Description:</label>
          <input className='signup-inputs' type='text' id='description' name='description' value={taskFormData.description} onChange={handleChange} required />
        </div>
        <div>
          <label className='signup-labels' htmlFor='cost'>Cost:</label>
          <input className='signup-inputs' type='number' id='cost' name='cost' value={taskFormData.cost} onChange={handleChange} required />
        </div>
        <button className='sign-button' type='submit'>Create New Task</button>
      </form>
      <Footer />
    </div>
  );
}

export default AdminMainPage;