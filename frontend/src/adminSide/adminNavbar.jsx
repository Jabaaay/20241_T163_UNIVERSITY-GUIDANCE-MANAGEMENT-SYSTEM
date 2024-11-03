// Import any necessary assets and styles
import React from 'react';
import logo from '../assets/1.png';
import { useNavigate } from 'react-router-dom';

function NavBar() {

  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="logo">
        <button className='user' onClick={() => handleNavigation('/adminProfile')}>A</button>
      </div>

    </nav>
  );
}

export default NavBar;
