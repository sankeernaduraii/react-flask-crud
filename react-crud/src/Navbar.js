import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
  return (
    <div className='nav-parent'>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/AddStudent'>ADD STUDENT</Link></li>
          <li><Link to='/department'>DEPARTMENT</Link></li>
          <li><Link to='/year'>YEAR</Link></li>
          <li><Link to='/yearAndDept'>YEAR AND DEPT</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
