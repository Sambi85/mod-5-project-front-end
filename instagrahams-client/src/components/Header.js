import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search.js'

const Header = () => {
  return (
    <div className="navbar">
       
       <div className="title"> 
           <h1>Instagrahams</h1>
        </div>
        
        <div className="search">
            <Search/>
        </div>

          <div className="links">
            <div>
              <NavLink to="/">Home</NavLink>
            </div>
            <div>
              {/* <NavLink to="/dm">Direct Messages</NavLink> */}
            </div>
            <div>
              <NavLink to="/nav">Navigation</NavLink>
            </div>
            <div>
              <NavLink to="/profile">Profile</NavLink>
            </div>
            <div>
              <NavLink to="/settings">Settings</NavLink>
            </div>
          </div>
    </div>
  );
};

export default Header;