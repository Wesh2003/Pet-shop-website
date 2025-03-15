import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function CheckoutData() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("id");
  let token = localStorage.getItem("access_token");
  const refreshTokenValue = localStorage.getItem("refresh_token");

  console.log("User ID:", userId);
  console.log("Token:", token);

  // 🔹 Function to refresh token
  const refreshToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshTokenValue}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to refresh token, logging out...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return false;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      token = data.access_token;
      console.log("Token refreshed!");
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  // 🔹 Function to fetch cart items (wrapped in useCallback)
  const fetchCartItems = useCallback(async () => {
    if (!userId || !token) {
      console.error("User ID or Token is missing");
      return;
    }
    try {
      let response = await fetch(`http://127.0.0.1:5000/shoppingcart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) { // If token is expired, try refreshing
        console.warn("Token expired, attempting to refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          response = await fetch(`http://127.0.0.1:5000/shoppingcart/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch cart: ${errorText}`);
      }

      const data = await response.json();
      console.log("Cart Data:", data);
      if (!Array.isArray(data.cart)) {
        console.error("Unexpected data format:", data);
        return;
      }
      if (!data.cart) {
        console.error("Error: 'cart' property missing in response", data);
        return;
      }
      setCartItems([...data.cart]);
    } catch (error) {
      console.error("Error fetching shopping cart items:", error);
    }
  }, [userId, token]);

  // 🔹 useEffect now includes fetchCartItems
  useEffect(() => {
    if (userId && token) {
      fetchCartItems();
    }
  }, [userId, token, fetchCartItems]);

  // 🔹 Function to calculate total cost
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + (item.cost || 0), 0);
  };

  return (
    <div className="shopping-cart-page">
      <h2>Checkout Items</h2>
      {cartItems.length === 0 ? (
        <p>There are no items to checkout.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.id || index}> {/* Use index as a fallback */}
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Cost: ${item.cost}</p>
              </li>
            ))}
          </ul>
          <h3>Total Cost: ${calculateTotalCost().toFixed(2)}</h3> {/* Display total cost */}
        </>
      )}
      <button className="entry-login-btn">
        <Link to="/payment" className="link">Pay</Link>
      </button>
    </div>
  );
}

export default CheckoutData;
