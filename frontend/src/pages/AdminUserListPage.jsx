import React, { useState, useEffect, useCallback } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import Footer from '../components/Footer';

function AdminUserListPage() {
  const [userItems, setUserItems] = useState([]);
  const AdminId = localStorage.getItem("AdminId");
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
  const fetchUserItems = useCallback(async () => {
    if (!AdminId || !token) {
      console.error("Admin ID or Token is missing");
      return;
    }
    try {
      let response = await fetch(`http://127.0.0.1:5000/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 401) { // Handle expired token
        console.warn("Token expired, attempting to refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          response = await fetch(`http://127.0.0.1:5000/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch user items: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("User Data:", data);
  
      if (!Array.isArray(data)) { // ✅ Check if 'data' itself is an array
        console.error("Unexpected data format:", data);
        return;
      }
  
      setUserItems(data); // ✅ Directly set 'data' as it is already an array
    } catch (error) {
      console.error("Error fetching user items:", error);
    }
  }, [AdminId, token]);
  
  // 🔹 useEffect now includes fetchCartItems
  useEffect(() => {
    if (AdminId && token) {
      fetchUserItems();
    }
  }, [AdminId, token, fetchUserItems]); // ✅ Fixed dependency issue

  // 🔹 Function to delete an item
  const handleDeleteItem = async (UserId) => {
    try {
      let response = await fetch(`http://127.0.0.1:5000/users/${UserId}`, {
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
          response = await fetch(`http://127.0.0.1:5000/users/${UserId}`, {
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

      setUserItems(prevItems => prevItems.filter(item => item.id !== UserId));
      console.log(userItems);
      alert("Deleted user from user list");
    } catch (error) {
      console.error("Error deleting user from user list:", error);
    }
  };

  return (
    <div className="admin-task-list-page">
      <AdminNavBar />
      <h2>All users in the system</h2>
      {userItems.length === 0 ? (
        <p>There are no users in the system.</p>
      ) : (
        <ul>
          {userItems.map((item, index) => (
            <li key={item.id || index} className = "shopping-cart-items"> {/* Use index as a fallback */}
              <p>First Name: {item.first_name}</p>
              <p>Last Name: {item.last_name}</p>
              <p>Email: {item.email}</p>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
}

export default AdminUserListPage;
