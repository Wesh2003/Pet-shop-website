import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TasksTable from '../components/TasksTable';

function MainPage({ isAuthenticated ,userId}) {
  return (
    <div className='mainpage'>
      <NavBar isAuthenticated={isAuthenticated}  />
      <TasksTable userId={userId}/>
      <Footer />
    </div>
  );
}

export default MainPage;