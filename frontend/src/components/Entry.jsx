import React from 'react'
// import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


function Entry() {
    
  return (
    <div className = 'entry-page'>
        <img className = 'entry-image' src='https://cdn.mos.cms.futurecdn.net/ASHH5bDmsp6wnK6mEfZdcU.jpg' alt='Customer care'/>
        <div className = 'entry-text'>
            <h1>Pet Service Website</h1>
            <br></br>
            <h3>
            Discover the convenience of hiring pet services of all kind using an online platform!
            </h3>
            <br></br>
            <p>
            If you're a pet owner, join our website and reach a wider array of services by creating or logging in to your own account!
            </p>
            <br></br>
            <button className='entry-login-btn'><Link to={`/login`} className="link">Login as a User</Link></button>
            <br></br>
            <br></br>
            <em>Don't have an account ? <span ><Link to={`/register`} className="span-link">Sign up as a User</Link></span> </em>
            <br></br>
            <button className='entry-login-btn'><Link to={`/adminlogin`} className="link">Login as an Admin</Link></button>
            <br></br>
            <br></br>
            <em>Don't have an account ? <span ><Link to={`/adminregister`} className="span-link">Sign up as an Admin</Link></span> </em>
            <br></br>
            <button className='entry-login-btn'><Link to={`/groomerlogin`} className="link">Login as a Groomer</Link></button>
            <br></br>
            <br></br>
            <em>Don't have an account ? <span ><Link to={`/groomerregister`} className="span-link">Sign up as a Groomer</Link></span> </em>
        </div>

    </div>
  )
}

export default Entry