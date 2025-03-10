
// Login component 
import React from 'react';
import Login from '../components/Login';

function LoginPage({setIsAuthenticated, setUserId}) {
    return (
      <div>
          <Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId}/>
      </div>
    )
  }
  
  export default LoginPage
  
  