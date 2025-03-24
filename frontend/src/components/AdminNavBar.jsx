// NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faRegularUser, faUserCircle as faSolidUser } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser as faRegularUser, faUserCircle as faSolidUser } from '@fortawesome/free-regular-svg-icons';

function AdminNavBar({ isAuthenticated }) {
  return (
    <div className='navbar'>
      <NavLink to="/adminhome" className='navbarss'>
        <h4>Home</h4>
      </NavLink>
      <NavLink to="/admintasks" className='navbarss'>
        <h4>Tasks</h4>
      </NavLink>
      <NavLink to="/admingroomers" className='navbarss'>
        <h4>Groomers</h4>
      </NavLink>
      <NavLink to="/adminusers" className='navbarss'>
        <h4>Users</h4>
      </NavLink>
      <NavLink to="/">
          <FontAwesomeIcon className='user-icon' icon={faSolidUser} />
      </NavLink>
      
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

export default AdminNavBar;