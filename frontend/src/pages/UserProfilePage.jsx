


// Nav Bar
// User Table component 


import React from 'react';
import NavBar from '../components/NavBar';
import UserProfile from  '../components/UserProfile';


function UserProfilePage({userId}) {
  return (
    <div>
        <NavBar/>
        <UserProfile userId={userId}/>
    
    </div>
  )
}

export default UserProfilePage