import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchComp from './SearchComp.js';
import { Header, Input, Menu  } from 'semantic-ui-react';
import Logo from '../logo.png'

class HeaderComp extends React.Component {

  render () {
  return (
             
    <>
    <div className="header-div">
        <Menu>
        
            <img className="logo " src={Logo} alt="instagrahams" width="120px"/>
          
          <Menu.Item position='center'>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item position='right'>
            <NavLink to="/home" style={{"padding":"5px"}}><img src="images/Home.png" width="25px" /></NavLink>
            <NavLink to="/nav" style={{"padding":"5px"}}><img src="images/Navigate.png" width="25px" /></NavLink>
            <NavLink to="/profile/" style={{"padding":"5px"}}><img src="images/Profile.png" width="25px" /></NavLink>
            <NavLink to="/settings" style={{"padding":"5px"}}><img src="images/Settings.png" width="25px" /></NavLink>
            <NavLink to='/' style={{"padding":"5px"}}><img src="images/Logoff.png" width="25px" onClick={this.props.resetHandler} /></NavLink>
            </Menu.Item>
      </Menu>
    </div>
    </>

    );
  };
};

export default HeaderComp;