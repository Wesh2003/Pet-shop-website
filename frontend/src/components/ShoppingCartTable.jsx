import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from "react-router-dom";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetch(`/shoppingcart/${userId}`)
      .then(response => response.json())
      .then(data => {
        setCartItems(data.cart);
        console.log(data) // Assuming 'cart' is the key containing your array of items
      })
      .catch(error => {
        console.error('Error fetching shopping cart items:', error);
      });
  }, [userId]); // Make sure to include userId as a dependency of useEffect

  const handleDeleteItem = (jobId) => {
    fetch(`/shoppingcarts/${jobId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Assuming deletion was successful, remove the item from cartItems
            setCartItems(prevItems => prevItems.filter(item => item.id !== jobId));
        } else {
            throw new Error('Failed to delete item from shopping cart');
        }
    })
    .catch(error => {
        console.error('Error deleting item from shopping cart:', error);
    });
};

// return (
//     <div>
//         <h2>Shopping Cart</h2>
//         <ul>
//             {cartItems.map(item => (
//                 <li key={item.product_id}>
//                     <img src={item.image_url} alt={item.name} style={{ width: '100px', height: '100px' }} />
//                     <p>Name: {item.name}</p>
//                     <p>Price: ${item.price}</p>
//                     <button onClick={() => handleDeleteItem(item.product_id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     </div>
// );

  return (
    <div className = 'shopping-cart-page'>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {/* <img src={item.image_url} alt={item.name} style={{ width: '100px', height: '100px' }} /> */}
            <p>Title: {item.title}</p>
            <p>Description: {item.description}</p>
            <p>Cost: ${item.cost}</p>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className='entry-login-btn'><Link to={`/checkout`} className="link">Proceed to Checkout</Link></button>
    </div>
  );
}

export default ShoppingCart;