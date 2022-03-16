import React, {useContext} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link } from 'react-router-dom';

import { UserContext } from "../context/UserContext";


function Header() {
  const context = useContext(UserContext);

    return (
        <div>
        <Navbar className="border-bottom p-3 px-5 nav" bg="white" expand="lg">
        <Link to="/" className="nav-link me-4">  <Navbar.Brand className="logo">IPL Predictor</Navbar.Brand></Link>  
        {context.user?.email ? <span>{context.user.email}</span>: ''}
        <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav className="ms-auto">
          {context.user ?  <Link  onClick={()=>{context.setUser(null)}} className="nav-link me-4" to="/">Logout</Link> : (
            <>
            <Link className="nav-link me-4" to="/login">Login</Link>
            <Link className="nav-link me-4" to="/register">Register</Link>
            </>
          )}
           
          </Nav>
        </Navbar.Collapse>
        
    </Navbar>

        </div>
    )
}

export default Header
