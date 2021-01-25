import React, { useState, useEffect } from "react";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import logo from '../styles/logo-min.png';
import {Button} from './Button'
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <nav className='navbar'>
        <div className="navbar-container">
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} alt="#" className="logo" />Social Cooking
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/all-users'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                All Users
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/all-recipes'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                All Recipes
              </Link>
            </li>

            {context.isLoggedIn && (
              <React.Fragment>
                <li className="nav-item">
                  <Link 
                    to="/recipes/create"
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-plus"></i> Recipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/profile"
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    {context.user && context.user.pseudo}
                  </Link>
                </li>
                <li className="nav-item">
                  <p onClick={handleLogout} className='nav-links'>Logout</p>
                </li>
              </React.Fragment>
            )}
            {!context.isLoggedIn && (
              <React.Fragment> 
                <li className="nav-item"> 
                  <Link 
                    to="/signin"
                    className="nav-links btn-links signin"
                    onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/signup" 
                    className="nav-links btn-links signup" 
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </React.Fragment>
            )}

            
          </ul>
          
          </div>
      </nav>
  );
};

export default withUser(NavMain);
