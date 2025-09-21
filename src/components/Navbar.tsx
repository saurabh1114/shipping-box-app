import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/navBar.scss';

const Navbar: React.FC = () => {
  return (
<nav className="navbar">
  <h1>
    <span className="logo">📦</span> Shipping Box Calculator
  </h1>

  <div className="nav-links">
    <NavLink to="/add" className={({isActive}) => isActive ? 'active' : ''}>
      Add Box
    </NavLink>

    <NavLink to="/list" className={({isActive}) => isActive ? 'active' : ''}>
      Box List
    </NavLink>
  </div>
</nav>

  );
};

export default Navbar;
