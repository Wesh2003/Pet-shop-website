import React from 'react';
import GroomerNavBar from '../components/GroomerNavBar';
import Footer from '../components/Footer';
import UserPurchasedTasksTable from '../components/UserPurchasedTasksTable';

function GroomerMainPage({ isAuthenticated ,groomerId}) {
  return (
    <div className='mainpage'>
      <GroomerNavBar isAuthenticated={isAuthenticated}  />
      <UserPurchasedTasksTable groomerId={groomerId}/>
      <Footer />
    </div>
  );
}

export default GroomerMainPage;