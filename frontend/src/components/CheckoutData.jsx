import React, { useState, useEffect, useCallback } from "react";

function CheckoutData() {
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem("id");
    const [token, setToken] = useState(localStorage.getItem("access_token"));
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
            setToken(data.access_token);
            console.log("Token refreshed!");
            return true;
        } catch (error) {
            console.error("Error refreshing token:", error);
            return false;
        }
    };

    // 🔹 Fetch cart items
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

            if (response.status === 401) { // If token expired, try refreshing
                console.warn("Token expired, attempting to refresh...");
                const refreshed = await refreshToken();
                if (refreshed) {
                    response = await fetch(`http://127.0.0.1:5000/shoppingcart/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

            setCartItems([...data.cart]);
        } catch (error) {
            console.error("Error fetching shopping cart items:", error);
        }
    }, [userId, token]);

    // 🔹 useEffect to fetch cart items on mount
    useEffect(() => {
        if (userId && token) {
            fetchCartItems();
        }
    }, [userId, token, fetchCartItems]);

    // 🔹 Function to calculate total cost
    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + (item.cost || 0), 0);
    };

    // 🔹 Function to handle checkout (submitting all items)
    async function handleCheckout() {
        if (!userId || !token) {
            console.error("User ID or Token is missing!");
            return;
        }

        try {
            for (const item of cartItems) {
                const itemData = {
                    title: item.title,
                    description: item.description,
                    cost: item.cost
                };

                // Send item to user purchased table
                let response = await fetch("http://127.0.0.1:5000/userpurchasedtask", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(itemData)
                });

                if (!response.ok) throw new Error(`Failed to add ${item.title} to user purchased tasks`);

                // Send item to receipt
                response = await fetch("http://127.0.0.1:5000/receipt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(itemData)
                });

                if (!response.ok) throw new Error(`Failed to add ${item.title} to receipts`);
            }

            setCartItems([]); // Clear cart after successful checkout
            alert("Checkout successful!");

        } catch (error) {
            console.error("Error during checkout:", error);
        }
    }

    return (
        <div className="checkout-cart-page">
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
                    <button className="btn btn-success" onClick={handleCheckout}>
                        Submit All to Receipt & Purchased Tasks
                    </button>
                </>
            )}
        </div>
    );
}

export default CheckoutData;
