// Groomer Login Page
import React from 'react';
import GroomerLogin from '../components/GroomerLogin';

function GroomerLoginPage({setIsAuthenticated, setGroomerId}) {
    return (
      <div>
          <GroomerLogin setIsAuthenticated={setIsAuthenticated} setGroomerId={setGroomerId}/>
      </div>
    )
  }
  
  export default GroomerLoginPage