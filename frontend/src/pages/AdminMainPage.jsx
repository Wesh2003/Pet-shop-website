import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function AdminMainPage({ isAuthenticated = false, AdminId = null }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    location: "",
    cost: "",
  });

  const navigate = useNavigate();

  // 🔹 Handle Change for User/Groomer Form
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🔹 Handle Change for Task Form
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData({
      ...taskFormData,
      [name]: value,
    });
  };

  // 🔹 Handle User Registration
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User added successfully!");
        navigate("/adminhome");
      } else {
        const errorData = await response.json();
        alert(`User registration failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("User registration error: " + error.message);
    }
  };

  // 🔹 Handle Groomer Registration
  const handleGroomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/groomerregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Groomer added successfully!");
        navigate("/adminhome");
      } else {
        const errorData = await response.json();
        alert(`Groomer registration failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("Groomer registration error: " + error.message);
    }
  };

  // 🔹 Handle Task Creation
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskFormData),
      });

      if (response.ok) {
        alert("Task created successfully!");
        navigate("/adminhome");
      } else {
        const errorData = await response.json();
        alert(`Task creation failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("Task creation error: " + error.message);
    }
  };

  return (
    <div className="mainpage">
      <AdminNavBar isAuthenticated={isAuthenticated} />

      {/* Register New User */}
      <h2 className="sign-heading">Register New User</h2>
      <form onSubmit={handleUserSubmit} className = "signup-form">
        <div>
          <label className="signup-labels" htmlFor="first_name">First Name:</label>
          <input className="signup-inputs" type="text" name="first_name" value={formData.first_name} onChange={handleUserChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="last_name">Last Name:</label>
          <input className="signup-inputs" type="text" name="last_name" value={formData.last_name} onChange={handleUserChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="email">Email:</label>
          <input className="signup-inputs" type="email" name="email" value={formData.email} onChange={handleUserChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="password">Password:</label>
          <input className="signup-inputs" type="password" name="password" value={formData.password} onChange={handleUserChange} required />
        </div>
        <button className="sign-button" type="submit">Register New User</button>
      </form>

      <br />
      <br />

      {/* Register New Groomer */}
      <h2 className="sign-heading">Register New Groomer</h2>
      <form onSubmit={handleGroomerSubmit} className = "signup-form">
        <div>
          <label className="signup-labels" htmlFor="first_name">First Name:</label>
          <input className="signup-inputs" type="text" name="first_name" value={formData.first_name} onChange={handleUserChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="last_name">Last Name:</label>
          <input className="signup-inputs" type="text" name="last_name" value={formData.last_name} onChange={handleUserChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="email">Email:</label>
          <input className="signup-inputs" type="email" name="email" value={formData.email} onChange={handleUserChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="password">Password:</label>
          <input className="signup-inputs" type="password" name="password" value={formData.password} onChange={handleUserChange} required />
        </div>
        <button className="sign-button" type="submit">Register New Groomer</button>
      </form>

      <br />
      <br />

      {/* Create New Task */}
      <h2 className="sign-heading">Create New Task</h2>
      <form onSubmit={handleTaskSubmit} className = "signup-form">
        <div>
          <label className="signup-labels" htmlFor="title">Title:</label>
          <input className="signup-inputs" type="text" name="title" value={taskFormData.title} onChange={handleTaskChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="description">Description:</label>
          <input className="signup-inputs" type="text" name="description" value={taskFormData.description} onChange={handleTaskChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="dlocation">Location:</label>
          <input className="signup-inputs" type="text" name="location" value={taskFormData.location} onChange={handleTaskChange} required />
        </div>
        <div>
          <label className="signup-labels" htmlFor="cost">Cost:</label>
          <input className="signup-inputs" type="number" name="cost" value={taskFormData.cost} onChange={handleTaskChange} required />
        </div>
        <button className="sign-button" type="submit">Create New Task</button>
      </form>

      <Footer />
    </div>
  );
}

export default AdminMainPage;
