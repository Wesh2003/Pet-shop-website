


// Nav Bar component 
// SHopping Cart Table component 
// Foot

import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShoppingCartTable from  '../components/ShoppingCartTable';


function ShoppingCartPage({userId}) {
  return (
    <div>
        <NavBar/>
        <ShoppingCartTable />
        <Footer/>
    </div>
  )
}

export default ShoppingCartPage