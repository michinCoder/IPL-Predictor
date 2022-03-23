import React, {useContext, useEffect, useState} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link } from 'react-router-dom';

import { UserContext } from "../context/UserContext";

import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Header() {

  const context = useContext(UserContext);
  const [users, SetUsers] = useState([]);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const players = [];
      const data2 = data.docs.map((doc) => {
        players.push(doc.data());
      });

      SetUsers(players);     
    };

    getUsers();
  }, []);

    return (
        <div>
        <Navbar className="border-bottom p-3 px-5 nav" bg="white" expand="lg">
        <Link to="/" className="nav-link me-4">  <Navbar.Brand className="logo">IPL Predictor</Navbar.Brand></Link>  
        {context.user?.email ? <span>{context.user.email}</span>: ''}
        <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav className="ms-auto">
        
        
          {context.user ?  
          <>
          {users.map(value =>{
          if(value.isAdmin == true && context.user.email == value.email){
            return(
              <Link to="/admin"><button type="button" class="btn btn-warning me-3">Admin</button></Link>
              );
          }
          })}
          {/* {isAdmin? "helo":"muskan"}
          {console.log(isAdmin)} */}

          <Link to="/vote"><button type="button" class="btn btn-success me-3">Vote</button></Link>
          <Link  onClick={()=>{context.setUser(null)}} className="nav-link me-4" to="/">Logout</Link>
          
          </>
           : (
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
