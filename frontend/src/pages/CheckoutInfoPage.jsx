import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CheckoutForm from  '../components/CheckoutForm';


function CheckoutInfoPage({userId}) {
  return (
    <div>
        <NavBar/>
        <CheckoutForm userId={userId} />
        <Footer/>
    </div>
  )
}

export default CheckoutInfoPage


// Nav Bar component 
// Checkout Form component 
// Footer component 