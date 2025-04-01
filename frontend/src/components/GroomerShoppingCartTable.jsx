import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";

function GroomerShoppingCartTable() {
  const [cartItems, setCartItems] = useState([]);
  const groomerId = localStorage.getItem("id");
  let token = localStorage.getItem("groomer_access_token"); // Using let to update after refresh
  const refreshTokenValue = localStorage.getItem("groomer_refresh_token");

  console.log("Groomer ID:", groomerId);
  console.log("Token:", token);

  // 🔹 Function to refresh token
  const refreshToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/groomerrefresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshTokenValue}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to refresh token, logging out...");
        localStorage.removeItem("groomer_access_token");
        localStorage.removeItem("groomer_refresh_token");
        return false;
      }

      const data = await response.json();
      localStorage.setItem("groomer_access_token", data.groomer_access_token);
      token = data.groomer_access_token; // Update token for immediate use
      console.log("Token refreshed!");
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  // 🔹 Function to fetch cart items (wrapped in useCallback)
  const fetchCartItems = useCallback(async () => {
    if (!groomerId || !token) {
      console.error("Groomer ID or Token is missing");
      return;
    }
    try {
      let response = await fetch(`http://127.0.0.1:5000/groomershoppingcart/${groomerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) { // If token is expired, try refreshing
        console.warn("Token expired, attempting to refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          response = await fetch(`http://127.0.0.1:5000/groomershoppingcart/${groomerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch groomer cart: ${errorText}`);
      }

      const data = await response.json();
      console.log("Groomer Cart Data:", data);
      if (!Array.isArray(data.cart)) {
        console.error("Unexpected data format:", data);
        return;
      }
      if (!data.cart) {
        console.error("Error: 'cart' property missing in response", data);
        return;
      }
      setCartItems([...data.cart]); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching shopping cart items:", error);
    }
  }, [groomerId, token]); // ✅ Dependencies added

  // 🔹 useEffect now includes fetchCartItems
  useEffect(() => {
    if (groomerId && token) {
      fetchCartItems();
    }
  }, [groomerId, token, fetchCartItems]); // ✅ Fixed dependency issue

  // 🔹 Function to delete an item
  const handleDeleteItem = async (jobId) => {
    try {
      let response = await fetch(`http://127.0.0.1:5000/groomershoppingcart/${groomerId}/${jobId}`, {
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
          response = await fetch(`http://127.0.0.1:5000/groomershoppingcart/${groomerId}/${jobId}`, {
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
        throw new Error(`Failed to delete item: ${errorText}`);
      }

      setCartItems(prevItems => prevItems.filter(item => item.id !== jobId));
      console.log(cartItems);
      alert("Deleted item from groomer shopping cart");
    } catch (error) {
      console.error("Error deleting item from shopping cart:", error);
    }
  };

  return (
    <div className="shopping-cart-page">
      <h2>Groomer Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={item.id || index} className = "shopping-cart-items"> {/* Use index as a fallback */}
              <p>Title: {item.title}</p>
              <p>Description: {item.description}</p>
              <p>Cost: ${item.cost}</p>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroomerShoppingCartTable;
