


// Nav Bar component 
// SHopping Cart Table component 
// Foot

import React from 'react';
import GroomerNavBar from '../components/GroomerNavBar';
import Footer from '../components/Footer';
import GroomerShoppingCartTable from  '../components/GroomerShoppingCartTable';


function GroomerShoppingCartPage({groomerId}) {
  return (
    <div>
        <GroomerNavBar/>
        <GroomerShoppingCartTable />
        <Footer/>
    </div>
  )
}

export default GroomerShoppingCartPage