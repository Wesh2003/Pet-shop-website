// NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faRegularUser, faUserCircle as faSolidUser } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser as faRegularUser, faUserCircle as faSolidUser } from '@fortawesome/free-regular-svg-icons';

function GroomerNavBar({ isAuthenticated }) {
  return (
    <div className='navbar'>
      <NavLink to="/groomerhome" className='navbarss'>
        <h4>Home</h4>
      </NavLink>
      <NavLink to="/groomershoppingcart" className='navbarss'>
        <h4>Shopping Cart</h4>
      </NavLink>
      <NavLink to="/">
          <FontAwesomeIcon className='user-icon' icon={faSolidUser} />
      </NavLink>
      {/* <NavLink to="/">
          <FontAwesomeIcon className='user-icon' icon={faRegularUser} />
      </NavLink> */}
      {/* {isAuthenticated ? (
        <NavLink to="/adminprofile">
          <FontAwesomeIcon className='user-icon' icon={faSolidUser} />
        </NavLink>
      ) : (
        <NavLink to="/adminlogin">
          <FontAwesomeIcon className='user-icon' icon={faRegularUser} />
        </NavLink>
      )} */}
    </div>
  );
}

export default GroomerNavBar;