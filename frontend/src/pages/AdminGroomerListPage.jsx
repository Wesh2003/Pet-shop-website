import React, { useState, useEffect, useCallback } from 'react';
import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/Footer";

function AdminGroomerListPage() {
  const [groomerItems, setGroomerItems] = useState([]);
  const AdminId = localStorage.getItem("AdminId") || null; // ✅ Ensures null if missing
  let token = localStorage.getItem("admin_access_token"); // Using let to update after refresh
  const refreshTokenValue = localStorage.getItem("admin_refresh_token");

  console.log("Admin ID:", AdminId);
  console.log("Token:", token);

  // 🔹 Function to refresh token
  const refreshToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/adminrefresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshTokenValue}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to refresh token, logging out...");
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        return false;
      }

      const data = await response.json();
      localStorage.setItem("admin_access_token", data.admin_access_token);
      token = data.admin_access_token; // Update token for immediate use
      console.log("Token refreshed!");
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  // 🔹 Function to fetch cart items (wrapped in useCallback)
  const fetchGroomerItems = useCallback(async () => {
    if (!AdminId || !token) {
      console.error("Admin ID or Token is missing");
      return;
    }
    try {
      let response = await fetch(`http://127.0.0.1:5000/groomers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 401) { // If token is expired, try refreshing
        console.warn("Token expired, attempting to refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          response = await fetch(`http://127.0.0.1:5000/groomers`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch groomers: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Groomer Data:", data);
  
      if (!Array.isArray(data)) { // ✅ Check if 'data' itself is an array
        console.error("Unexpected data format:", data);
        return;
      }
  
      setGroomerItems(data); // ✅ Directly set 'data' as it is already an array
    } catch (error) {
      console.error("Error fetching groomers:", error);
    }
  }, [AdminId, token]); // ✅ Dependencies added
  // ✅ Dependencies added

  // 🔹 useEffect now includes fetchCartItems
  useEffect(() => {
    if (AdminId && token) {
      fetchGroomerItems();
    }
  }, [AdminId, token, fetchGroomerItems]); // ✅ Fixed dependency issue

  // 🔹 Function to delete an item
  const handleDeleteItem = async (GroomerId) => {
    try {
      let response = await fetch(`http://127.0.0.1:5000/groomers/${GroomerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) { // Handle expired token
        console.warn("Token expired, attempting to refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          response = await fetch(`http://127.0.0.1:5000/groomers/${GroomerId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete user: ${errorText}`);
      }

      setGroomerItems(prevItems => prevItems.filter(item => item.id !== GroomerId));
      console.log(groomerItems);
      alert("Deleted groomer from user list");
    } catch (error) {
      console.error("Error deleting groomer from groomer list:", error);
    }
  };

  return (
    <div className="shopping-cart-page">
      <AdminNavBar/>
      <h2>All groomers in the system</h2>
      {groomerItems.length === 0 ? (
        <p>There are no groomers in the system.</p>
      ) : (
        <ul>
          {groomerItems.map((item, index) => (
            <li key={item.id || index}> {/* Use index as a fallback */}
              <p>First Name: {item.first_name}</p>
              <p>Last Name: {item.last_name}</p>
              <p>Email: {item.email}</p>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Footer/>
    </div>
  );
}

export default AdminGroomerListPage;
