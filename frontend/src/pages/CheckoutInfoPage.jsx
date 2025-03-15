import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CheckoutData from  '../components/CheckoutData';


function CheckoutInfoPage({userId}) {
  return (
    <div>
        <NavBar/>
        <CheckoutData userId={userId} />
        <Footer/>
    </div>
  )
}

export default CheckoutInfoPage


// Nav Bar component 
// Checkout Form component 
// Footer component 