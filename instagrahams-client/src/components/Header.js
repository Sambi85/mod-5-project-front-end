import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search.js'

const Header = () => {
  return (
    <nav className="header-div">        
            <div className="search-div">
              <Search/>
            </div>
            <div className="instagrahams"> 
              <img className="logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="" width="75px" />
            </div>
            <div className="icons-div">
              <NavLink to="/" style={{"padding":"5px"}}><img src="images/Home.png" width="25px" /></NavLink>
              <NavLink to="/nav" style={{"padding":"5px"}}><img src="images/Navigate.png" width="25px" /></NavLink>
              <NavLink to="/profile" style={{"padding":"5px"}}><img src="images/Profile.png" width="25px" /></NavLink>
              <NavLink to="/settings" style={{"padding":"5px"}}><img src="images/Settings.png" width="25px" /></NavLink>
              {/* <NavLink to="/dm">Direct Messages</NavLink> */}
            </div>
    </nav>
  );
};

export default Header;